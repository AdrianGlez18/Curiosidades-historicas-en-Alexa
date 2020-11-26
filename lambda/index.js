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
        let ch_leng = handlerInput.requestEnvelope.request.locale
        if (ch_leng === 'en-US') {
            lang = 'en'
        } else {
            lang = 'es'
        }
        const speakOutput = lang_text[lang].wel;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
        
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
        const speechText = getRandomItem(lang_text[lang].curiosity);

        return handlerInput.responseBuilder
            .speak(speechText + getRandomItem(lang_text[lang].questions))
            .reprompt(getRandomItem(lang_text[lang].questions))
            .getResponse();
    }
    
};

let lang = 'es'

const lang_text = {
    'es' : {
        'wel' : 'Bienvenido a curiosidades históricas. ¿Qué te gustaría escuchar?',
        'peticion' : 'Puedes pedirme curiosidades historicas. En que puedo ayudarte?',
        'not_understood' : "No entendí bien que querías decir con eso. ¿Quieres otra curiosidad o no?",
        'bye_msg' : 'Gracias por utilizar datos curiosos aleatorios! Espero que vuelvas pronto.!',
        'questions' : [
            "¿Quieres escuchar una curiosidad más?",
            "¿Quieres otra?",
            "¿Te apetece oir otra?",
            "¿Una curiosidad más?",
            " ¿Una más?",
            " ¿quieres escuchar otra?"
            ],
        'curiosity' : [
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
    },
    'en' : {
        'wel' : 'Welcome to historical curiosities, what would you like to hear?',
        'peticion' : 'You can ask me about historical curiosities, How can i help you?',
        'not_understood' : "Sorry, i didnt get that, would you like to hear another curiosity?",
        'bye_msg' : 'Thank you for using historical curiosities, see you soon',
        'questions' : [
            "Would you like to hear one more curiosity?",
            "Another one?",
            "Would you like to hear another one?",
            "Another curiosity?",
            " One more?",
            " Do you want to her another one?"
            ],
        'curiosity' : [
            "The longest war in history was between the Netherlands and the Isles of Scilly and lasted for 335 years, from 1651 to 1986. There were no casualties.",
            "Investigators believe that the horrific expressions on the famous Guanajuato mummies are the result of the victims being buried alive.",
            "Albert Einstein may have been president of Israel in 1952, but the German physicist refused.",
            "Cleopatra was not Egyptian, she was actually Greek, a descendant of Alexander the Great's Macedonian general Ptolemy.",
            "Navigation was the most common form of transportation in Ancient Mesopotamia, but since it was very difficult to navigate against the current, they found a method to make it easier to return. These were \"disposable\" wooden boats, which also carried a donkey. Upon reaching their destination, they sold the wood and when they were ready to return, they did so using the donkey as a means of transport.",
            "In Ancient Rome, the most terrible crime that could be committed was to kill your father, and the punishment was quite gruesome. The murderer was put in a sack and thrown into the water to drown with a snake, rooster and dog.",
            "Gorgias of Epirus was a philosopher of the first current of sophists of Ancient Greece. He is also known as the first nihilist in history. It is said that he lived to be 108 years old. That last detail is important, since Gorgias of Epirus was born in the coffin of his mother, who was about to be buried. Luckily his cry was heard and he was taken out.",
            "Since the 12th century, a competition known as the Race of the Candles has been held in the Italian city of Gubbio. Teams of villagers must carry a saint, divided into three groups: San Ubaldo (patron of the city), San Antonio and San Jorge. Strangely, in its more than 8 centuries of existence, every year the race is won by those who carry San Ubaldo, becoming the longest running competition-fraud in history.",
            "In the 1700s, Parisian women wore very particular hats when going out in bad weather. These hats had built-in lightning rods, an example of meteorological fashion.",
            "During the first dynasty of Ancient Egypt, when a king died, a group of his relatives, servants and animals walked to the tomb and not to give the last farewell. These people were buried next to the dead king, with the idea that they would serve him in the afterlife."
            ]
    }
}

function getRandomItem(array) {
    return array[Math.floor(Math.random()*array.length)]
}

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = lang_text[lang].peticion;

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
        const speakOutput = lang_text[lang].not_understood;
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
        const speakOutput =lang_text[lang].bye_msg;

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