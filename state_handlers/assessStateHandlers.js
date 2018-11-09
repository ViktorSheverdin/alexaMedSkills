'use strict';

const Alexa = require('alexa-sdk');
const constants = require('../data/constants');
const GAME_STATES = constants.GAME_STATES
const ANSWER_COUNT = constants.ANSWER_COUNT

const assessStateHandlers = Alexa.CreateStateHandler(GAME_STATES.ASSESS, {
    'AssessIntent': function () {
        // handleUserGuess.call(this, false);
        this.handler.state = GAME_STATES.START;
        this.emitWithState('StartAssessment', true);
    },
    'AMAZON.StartOverIntent': function () {
        this.handler.state = GAME_STATES.START;
        this.emitWithState('StartAssessment', false);
    },
    'AMAZON.RepeatIntent': function () {
        this.response.speak(this.attributes['speechOutput']).listen(this.attributes['repromptText']);
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
        const speechOutput = this.t('TRIVIA_UNHANDLED', ANSWER_COUNT.toString());
        this.response.speak(speechOutput).listen(speechOutput);
        this.emit(':responseReady');
    },
    'SessionEndedRequest': function () {
        console.log(`Session ended in trivia state: ${this.event.request.reason}`);
    },
});


module.exports = {
    assessStateHandlers
}