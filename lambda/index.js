/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const i18n = require("i18next");
const languageStrings = require("./languageStrings");
const sprintf = require("i18next-sprintf-postprocessor");

const metacritic = require("./metacritic.js");

const interpolateString = function(template, valueMap) {
    return Object.keys(valueMap).reduce((result, key) => {
      const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
      return result.replace(regex, valueMap[key]);
    }, template);
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

        return handlerInput.responseBuilder
            .speak(requestAttributes.t("HELLO_MESSAGE"))
            .reprompt(requestAttributes.t("REPROMPT"))
            .getResponse();
    }
};

const GetGameScoreIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetGameScoreIntent';
    },
    async handle(handlerInput) {
        console.log(handlerInput);

        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

        const request = handlerInput.requestEnvelope.request;
        const intent = request.intent;
    
        console.log(intent.slots.game_name.slotValue);
        const gameName = intent.slots.game_name.value;
    
        const gameData = await metacritic.getGame(gameName);

        const gameScore = gameData.data.results[0].metacritic;
        
        const speakOutput = interpolateString(requestAttributes.t("NORMAL_GAMESCORE_MESSAGE"), { gameName, gameScore });

        let ironicText;

        if (gameScore >= 90) {
            ironicText = interpolateString(requestAttributes.t("IRONIC_HIGH_SCORE_MESSAGE"), { gameName, gameScore });
        } else if (gameScore <= 60) {
            ironicText = interpolateString(requestAttributes.t("IRONIC_LOW_SCORE_MESSAGE"), { gameName, gameScore });
        }

        let outputSpeak = `
            <speak>
            ${speakOutput}
            <break time='2s'/>
            <prosody>${ironicText}</prosody>
            </speak>
        `;

        return handlerInput.responseBuilder
            .speak(outputSpeak)
            .reprompt(requestAttributes.t("REPROMPT"))
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        
        return handlerInput.responseBuilder
            .speak(requestAttributes.t("HELP_MESSAGE"))
            .reprompt(requestAttributes.t("HELP_REPROMPT"))
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.NoIntent");
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

        return handlerInput.responseBuilder
            .speak(requestAttributes.t("STOP_MESSAGE"))
            .withShouldEndSession(true)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

        return handlerInput.responseBuilder
            .speak(requestAttributes.t("FALLBACK_MESSAGE"))
            .reprompt(requestAttributes.t("FALLBACK_REPROMPT"))
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        console.log(`Error stack: ${error.stack}`);
        console.log(handlerInput.requestEnvelope.request.error);

        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

        return handlerInput.responseBuilder
            .speak(requestAttributes.t("ERROR_MESSAGE"))
            .reprompt(requestAttributes.t("ERROR_MESSAGE"))
            .getResponse();
    }
};

const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: "en", // fallback to EN if locale doesn't exist
      resources: languageStrings,
    });

    localizationClient.localize = function () {
      const args = arguments;
      let values = [];

      for (var i = 1; i < args.length; i++) {
        values.push(args[i]);
      }
      const value = i18n.t(args[0], {
        returnObjects: true,
        postProcess: "sprintf",
        sprintf: values,
      });

      if (Array.isArray(value)) {
        return value[Math.floor(Math.random() * value.length)];
      } else {
        return value;
      }
    };

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      // pass on arguments to the localizationClient
      return localizationClient.localize(...args);
    };
  },
};
/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        GetGameScoreIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addRequestInterceptors(LocalizationInterceptor)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sskill/metacritic-rawg')
    .lambda();
