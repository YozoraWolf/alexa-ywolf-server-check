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


module.exports = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequest,
        HelloWorldIntentHandler,
        CheckServerStatusIntent,
        TurnOnServerIntent,
        TurnOffServerIntent,
        SessionEndedRequest,
        HelpIntent,
        CancelAndStopIntentHandler,
        UnhandledIntent
    )
    .withApiClient(new Alexa.DefaultApiClient())
    .create();