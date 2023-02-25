const core = require('@actions/core');
const tc = require('@actions/tool-cache');

async function run() {
  try {
    await getExercism();
  } catch (error) {
    core.setFailed(`Action failed with error ${error}`);
  }
}

async function getExercism() {
  const downloadUrl = 'https://github.com/exercism/cli/releases/download/v3.1.0/exercism-3.1.0-linux-x86_64.tar.gz';
  // const tempDir = process.env['RUNNER_TEMP'];

  // try {
  //   console.log('Download node12 tar');
  //   const downloadPath = await tc.downloadTool(downloadUrl);
  // } catch (error) {
  //   throw new Error(`Failed to download Node12: ${error}`);
  // }

  const downloadPath = await tc.downloadTool(downloadUrl);
  const extractedPath = await tc.extractTar(downloadPath);

  const cachedPath = await tc.cacheDir(extractedPath, 'exercism', '3.1.0');
  core.addPath(cachedPath);

  const allVersions = tc.findAllVersions('exercism');
  console.log(`Versions of exercism available: ${allVersions}`);
}

run();
