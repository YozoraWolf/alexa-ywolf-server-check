const Alexa = require('ask-sdk-core');
const { getServer, updateServer } = require("@src/sv_utils");
const ServerStatus = require('@enums/ServerStatus');


const UpdateServerIntent = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'UpdateServerIntent';
  },
  async handle(handlerInput) {
    const sv = getServer(handlerInput);
    

    if(!sv) {
      return handlerInput.responseBuilder
        .speak('I could not find the server you are looking for, please try again later.')
        .withShouldEndSession(true)
        .getResponse();
    }

    const resp = await updateServer(sv);

    const speechText = `The ${sv.name} server: ${resp === ServerStatus.UPDATING ? 'Updating...' : 'Could not be updated'}.`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(true)
      .getResponse();
  }
};

module.exports = {
    UpdateServerIntent
};