/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Bienvenido a curiosidades históricas. ¿Qué te gustaría escuchar?';
        return GetNewFactIntentHandler.handle(handlerInput);
    }
};

const GetNewFactIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent'
            || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NextIntent'
            || Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetNewFactIntent')
    },
    handle(handlerInput) {
        const speechText = getRandomItem(CURIOSIDADES);

        return handlerInput.responseBuilder
            .speak(speechText + getRandomItem(PREGUNTAS))
            .reprompt(getRandomItem(PREGUNTAS))
            .getResponse();
    }
    
};

const CURIOSIDADES = [
    "La guerra más larga de la historia fue entre los Países Bajos y las islas de Scilly que duró 335 años, desde 1651 hasta 1986. No hubo víctimas",
    "Los investigadores creen que las expresiones terribles de las famosas momias de Guanajuato son el resultado de que las víctimas fueron enterradas vivas.",
    "Albert Einstein pudo haber sido presidente de Israel en 1952, pero el físico alemán se negó.",
    "Cleopatra no era egipcia, en realidad era griega, descendiente del general macedonio Ptolomeo de Alejandro Magno.",
    "La navegación era la forma de transporte más común en Antigua Mesopotamia, pero como era muy difícil navegar contra la corriente, encontraron un método para que regresar fuera más sencillo. Se trataba de botes de madera «desechables», que además llevaban un burro. Al llegar a destino, vendían la madera y al estar listos para regresar, lo hacían utilizando el burro como medio de transporte.",
    "En la Antigua Roma, el crimen más terrible que se podía cometer era matar a tu padre, y el castigo era bastante espantoso. El asesino era puesto dentro de un saco y lanzado al agua para ahogarse junto a una víbora, gallo y perro.",
    "Gorgias de Epirus fue un filosofo de la primera corriente de sofistas de la Antigua Grecia. También se le conoce como el primer nihilista de la historia. Se dice que vivió hasta los 108 años de edad. Ese último detalle es importante, ya que Gorgias de Epirus nació en el ataúd de su madre, que estaba por ser sepultada. Por suerte se escuchó su llanto y lo sacaron.",
    "Desde elsiglo XII se realiza en la ciudad italiana de Gubbio una competencia conocida como Carrera de los cirios. Equipos de aldeanos, deben cargar a un santo, divididos en tres grupos: San Ubaldo (patrono de la ciudad), San Antonio y San Jorge. Extrañamente, en sus más de 8 siglos de existencia, todos los años la carrera la gana quienes cargan a San Ubaldo, constituyéndose en la competencia-fraude más longeva de la historia.",
    "En el año 1700, las mujeres parisinas utilizaban unos sombreros muy particulares al salir a la calle cuando había mal clima. Estos sombreros tenían incorporados pararrayos, un ejemplo de la moda metereológica.",
    "Durante la primera dinastía del Antiguo Egipto, cuando moría un rey, un grupo de sus familiares, sirvientes y animales caminaban hacia el sepulcro y no para dar la última despedida. Estas personas eran sepultadas junto al rey muerto, con la idea de que le sirvan en la otra vida."
    ]
    
const PREGUNTAS = [
    "¿Quieres escuchar una curiosidad más?",
    "¿Quieres otra?",
    "¿Te apetece oir otra?",
    "¿Una curiosidad más?",
    " ¿Una más?",
    " ¿quieres escuchar otra?"
    ]

function getRandomItem(array) {
    return array[Math.floor(Math.random()*array.length)]
}

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Puedes pedirme curiosidades historicas. En que puedo ayudarte?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const ExceptionIntentHandler = {
    canHandle(handlerInput) {
        return true;
    },
    handle(handlerInput){
        const speakOutput = "No entendí bien que querías decir con eso. ¿Quieres otra curiosidad o no?";
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Gracias por utilizar datos curiosos aleatorios! Espero que vuelvas pronto.!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
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
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
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
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        GetNewFactIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        ExceptionIntentHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();