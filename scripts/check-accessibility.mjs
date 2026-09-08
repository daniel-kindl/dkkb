import { existsSync, readFileSync } from 'node:fs';
import { spawn } from 'node:child_process';

const previewHost = '127.0.0.1';
const previewPort = 4321;
const previewOrigin = `http://${previewHost}:${previewPort}`;
const scannerPackage = '@axe-core/cli@4.13.0';
const wcagTags = 'wcag2a,wcag21a,wcag22a,wcag2aa,wcag21aa,wcag22aa';
const representativeRoutes = [
  '',
  'glossary/',
  'references/knowledge-graph/',
  'patterns/strategy/',
];

function command(name)
{
    return process.platform === 'win32' ? `${name}.cmd` : name;
}

function readBasePath()
{
    const config = JSON.parse(readFileSync('config/site.json', 'utf8'));
    const rawBase = typeof config.base === 'string' ? config.base.trim() : '';

    if (!rawBase || rawBase === '/')
    {
        return '/';
    }

    return `/${rawBase.replace(/^\/+|\/+$/g, '')}/`;
}

function buildUrls(basePath)
{
    return representativeRoutes.map((route) => new URL(`${basePath}${route}`, previewOrigin).href);
}

function wait(milliseconds)
{
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function waitForPreview(url, child)
{
    const deadline = Date.now() + 20_000;

    while (Date.now() < deadline)
    {
        if (child.exitCode !== null)
        {
            throw new Error(`Astro preview exited before it became ready (exit ${child.exitCode}).`);
        }

        try
        {
            const response = await fetch(url);

            if (response.ok)
            {
                return;
            }
        }
        catch
        {
            // The preview server may still be starting.
        }

        await wait(250);
    }

    throw new Error(`Astro preview did not become ready at ${url} within 20 seconds.`);
}

function runProcess(executable, args)
{
    return new Promise((resolve, reject) =>
    {
        const child = spawn(executable, args, {
            stdio: 'inherit',
            env: process.env,
        });

        child.once('error', reject);
        child.once('exit', (code, signal) =>
        {
            if (signal)
            {
                reject(new Error(`${executable} terminated by signal ${signal}.`));
                return;
            }

            if (code !== 0)
            {
                reject(new Error(`${executable} exited with code ${code}.`));
                return;
            }

            resolve();
        });
    });
}

async function runAxe(urls, themeName, chromeOptions)
{
    console.log(`\nAccessibility scan: ${themeName}`);

    await runProcess(command('npx'), [
        '--yes',
        scannerPackage,
        ...urls,
        '--tags',
        wcagTags,
        '--exit',
        '--load-delay',
        '500',
        '--timeout',
        '60',
        '--chrome-options',
        chromeOptions.join(','),
    ]);
}

async function main()
{
    if (!existsSync('dist'))
    {
        throw new Error(
            'Accessibility audit requires a built site. Run "pnpm build" first or use "pnpm check:accessibility".',
        );
    }

    const basePath = readBasePath();
    const urls = buildUrls(basePath);
    const preview = spawn(command('pnpm'), [
        'exec',
        'astro',
        'preview',
        '--host',
        previewHost,
        '--port',
        String(previewPort),
    ], {
        stdio: 'inherit',
        env: process.env,
    });

    const stopPreview = () =>
    {
        if (preview.exitCode === null)
        {
            preview.kill('SIGTERM');
        }
    };

    process.once('SIGINT', stopPreview);
    process.once('SIGTERM', stopPreview);

    try
    {
        await waitForPreview(urls[0], preview);
        await runAxe(urls, 'default theme', ['no-sandbox', 'disable-dev-shm-usage']);
        await runAxe(urls, 'forced dark rendering', [
            'no-sandbox',
            'disable-dev-shm-usage',
            'force-dark-mode',
        ]);
    }
    finally
    {
        process.removeListener('SIGINT', stopPreview);
        process.removeListener('SIGTERM', stopPreview);
        stopPreview();
    }
}

main().catch((error) =>
{
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
});
