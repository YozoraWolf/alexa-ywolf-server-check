const Alexa = require('ask-sdk-core');

// Amazon's Built-in Intents

const LaunchRequest = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = `Welcome to wolf's server check skill!`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt("What would you like to check?")
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const SessionEndedRequest = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const HelpIntent = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'This is a simple skill that checks the server status.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Ok, got it. Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const UnhandledIntent = {
    canHandle() {
        return true;
    },
    handle(handlerInput) {
        const speakOutput = `Sorry, couldn't proccess that!`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

module.exports = { 
    LaunchRequest,
    HelloWorldIntentHandler,
    SessionEndedRequest,
    HelpIntent,
    CancelAndStopIntentHandler,
    UnhandledIntent
};