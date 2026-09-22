import { verifyDeployment } from './lib/verify-deployment.mjs';

const result = await verifyDeployment({
  deploymentUrl: process.env.DEPLOYMENT_URL,
  expectedRelease: process.env.DKKB_RELEASE || null,
  expectedCommit: process.env.DKKB_COMMIT || null,
});

for (const route of result.verified) {
  console.log(`verified ${route}`);
}
