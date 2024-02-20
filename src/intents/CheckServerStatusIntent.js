const Alexa = require('ask-sdk-core');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const servers = require('../data/servers.json');

// Util

const filterOutGrepLines = (stdout) => {
  return stdout.split('\n').filter(line => 
    !line.includes('grep') && 
    !line.includes('SCREEN') &&
    line.length > 0);
}

const isServerRunning = async (server) => {
  try {
    // Sanatized not needed as we are using a predefined list of servers.
    const { stdout, stderr } = await exec(`ps aux | grep '${server}'`);
    // If there are any lines in the stdout then the server is running, else not.
    return filterOutGrepLines(stdout).length > 0 ? true : false;
  } catch (error) {
    console.error(error);
    return false;
  }
};


const CheckServerStatusIntent = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CheckServerStatusIntent';
  },
  async handle(handlerInput) {


    // TODO: Add slot logic.
    const server = servers[0];
    const isRunning = await isServerRunning(server.proc_name);

    const speechText = `The server is ${isRunning ? 'running' : 'not running'}`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  }
};

module.exports = CheckServerStatusIntent;