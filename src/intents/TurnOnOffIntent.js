const Alexa = require('ask-sdk-core');
const { getServer, startServer, stopServer } = require("@src/sv_utils");
const ServerStatus = require('@enums/ServerStatus');


const TurnOnServerIntent = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TurnOnServerIntent';
  },
  async handle(handlerInput) {
    const sv = getServer(handlerInput);
    

    if(!sv) {
      return handlerInput.responseBuilder
        .speak('I could not find the server you are looking for, please try again later.')
        .withShouldEndSession(true)
        .getResponse();
    }

    const resp = await startServer(sv);

    const speechText = `The ${sv.name} server: ${resp === ServerStatus.RUNNING ? 'Now running' : 'Could not start'}.`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(true)
      .getResponse();
  }
};

const TurnOffServerIntent = {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TurnOffServerIntent';
    },
    async handle(handlerInput) {
        const sv = getServer(handlerInput);

        if(!sv) {
        return handlerInput.responseBuilder
            .speak('I could not find the server you are looking for, please try again later.')
            .withShouldEndSession(true)
            .getResponse();
        }

        const resp = await stopServer(sv);

        // Format response
        let speechText = `The ${sv.name} server: ${resp === ServerStatus.OFF ? 'Now Off' : 'Could not be stopped'}.`;
        
        // Re-format if server is already off
        speechText = `${resp === ServerStatus.IS_OFF ? `The ${sv.name} server is already off.` : speechText}`;

        return handlerInput.responseBuilder
        .speak(speechText)
        .withShouldEndSession(true)
        .getResponse();
    }
};

module.exports = {
    TurnOnServerIntent,
    TurnOffServerIntent
};