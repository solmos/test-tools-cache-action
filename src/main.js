const core = require('@actions/core');
const tc = require('@actions/tool-cache');

async function run() {
  try {
    await getNode12();
  } catch (error) {
    core.setFailed(`Action failed with error ${error}`);
  }
}

async function getNode12() {
  const downloadUrl = 'https://nodejs.org/dist/v12.7.0/node-v12.7.0-linux-x64.tar.gz';
  // const tempDir = process.env['RUNNER_TEMP'];

  try {
    console.log('Download node12 tar');
    const downloadPath = await tc.downloadTool(downloadUrl);
  } catch (error) {
    throw new Error(`Failed to download Node12: ${error}`);
  }

  const extractedPath = await tc.extractTar(downloadPath);

  const cachedPath = await tc.cacheDir(extractedPath, 'node', '12.7.0');
  core.addPath(cachedPath);
}

run();
