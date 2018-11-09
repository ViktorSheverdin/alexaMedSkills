'use strict';

const Alexa = require('alexa-sdk');
const constants = require('../data/constants');
const GAME_STATES = constants.GAME_STATES

const nameHandlers = Alexa.CreateStateHandler("_NAMEMODE", {
    'UserNameIntent': function () {
        // handleUserGuess.call(this, false);
        const inputUserName = this.event.request.intent.slots.Username.value;
        let speechOutput = '';
    
        speechOutput = "Hello " + inputUserName + ' what topic interests you today? You can shoose concusion test or ask questions about concussion';
        
        this.handler.state = GAME_STATES.TOPIC;
        this.emit(":ask", speechOutput);
        
    },
    'AnswerIntent': function() {
        const inputUserName = this.event.request.intent.slots.Answer.value;
        let speechOutput = '';
    
        speechOutput = "Hello " + inputUserName + ' what topic interests you today? You can shoose concusion test or ask questions about concussion';
        
        this.handler.state = GAME_STATES.TOPIC;
        this.emit(":ask", speechOutput);
    },
    'AMAZON.StartOverIntent': function () {
        this.handler.state = GAME_STATES.START;
        this.emitWithState('StartAssessment', false);
    },
    'AMAZON.RepeatIntent': function () {
        this.response.speak('I didn\'t quite catch that. Can you tell me your name again?');
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        this.handler.state = GAME_STATES.HELP;
        this.emitWithState('helpTheUser', false);
    },
    'AMAZON.StopIntent': function () {
        this.handler.state = GAME_STATES.HELP;
        const speechOutput = this.t('STOP_MESSAGE');
        this.response.speak(speechOutput).listen(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(this.t('CANCEL_MESSAGE'));
        this.emit(':responseReady');
    },
    'Unhandled': function () {
        const speechOutput = 'I encountered a problem, could you please repeat?';
        this.response.speak(speechOutput).listen(speechOutput);
        this.emit(':responseReady');
    },
    'SessionEndedRequest': function () {
        console.log(`Session ended in trivia state: ${this.event.request.reason}`);
    },
});

module.exports = {
    nameHandlers
}