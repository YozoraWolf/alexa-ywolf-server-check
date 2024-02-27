const Alexa = require('ask-sdk-core');
const { LaunchRequest,
        HelloWorldIntentHandler,
        SessionEndedRequest,
        HelpIntent,
        CancelAndStopIntentHandler,
        UnhandledIntent
} = require('@intents/AmazonIntents');
const CheckServerStatusIntent = require('@intents/CheckServerStatusIntent');
const { TurnOnServerIntent, TurnOffServerIntent } = require('@intents/TurnOnOffIntent');
const { UpdateServerIntent } = require('@intents/UpdateServerIntent');

module.exports = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequest,
        HelloWorldIntentHandler,
        CheckServerStatusIntent,
        TurnOnServerIntent,
        TurnOffServerIntent,
        UpdateServerIntent,
        SessionEndedRequest,
        HelpIntent,
        CancelAndStopIntentHandler,
        UnhandledIntent
    )
    .withApiClient(new Alexa.DefaultApiClient())
    .create();