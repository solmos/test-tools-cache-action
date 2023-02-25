const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const exec = require('@actions/exec')

async function run() {
  try {
    await setupExercism();
  } catch (error) {
    core.setFailed(`Action failed with error ${error}`);
  }
}

export async function setupExercism() {
  let toolPath = tc.find('exercism', '3.1.0');

  if (toolPath) {
    core.debug(`Tool found in cache ${toolPath}`);
  } else {
    try {
      await getExercism();
    } catch (error) {
      core.debug(`${error}`);
    }
  }

  configureExercism();
}

async function getExercism() {
  const downloadUrl = 'https://github.com/exercism/cli/releases/download/v3.1.0/exercism-3.1.0-linux-x86_64.tar.gz';
  const downloadPath = await tc.downloadTool(downloadUrl);
  const extractedPath = await tc.extractTar(downloadPath);

  const cachedPath = await tc.cacheDir(extractedPath, 'exercism', '3.1.0');
  core.addPath(cachedPath);

  const allVersions = tc.findAllVersions('exercism');
  console.log(`Versions of exercism available: ${allVersions}`);

}

async function configureExercism() {
  const token = core.getInput('token');
  const configCommand = 'exercism configure --token=' + token
  exec.exec(configCommand)
}

run();
