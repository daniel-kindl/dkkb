import fs from 'node:fs';
import path from 'node:path';

export function walk(directory, { ignored } = {}) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (ignored && entry.isDirectory() && ignored.has(entry.name)) return [];
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath, { ignored }) : [fullPath];
  });
}

export function toPosixPath(value) {
  return value.split(path.sep).join('/');
}
