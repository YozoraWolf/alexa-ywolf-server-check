const Alexa = require('ask-sdk-core');
const util = require('util');
const { isServerRunning, getServer } = require("@src/sv_utils");

// Util


const CheckServerStatusIntent = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CheckServerStatusIntent';
  },
  async handle(handlerInput) {

    const sv = getServer(handlerInput);

    if(!sv) {
      return handlerInput.responseBuilder
        .speak('I could not find the server you are looking for, please try again later.')
        .withShouldEndSession(true)
        .getResponse();
    }

    const isRunning = await isServerRunning(sv.proc_name);

    const speechText = `The ${sv.name} server is ${isRunning ? 'running' : 'not running'}`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(true)
      .getResponse();
  }
};

module.exports = CheckServerStatusIntent;