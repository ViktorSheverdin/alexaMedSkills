'use strict';

const Alexa = require('alexa-sdk');
const constants = require('../data/constants');
const GAME_STATES = constants.GAME_STATES
const MEMORY_PHRASE = constants.MEMORY_PHRASE

const handleUserPhrase = require('../functions/handleUserPhrase').handleUserPhrase;

const memoryStatehandlers = Alexa.CreateStateHandler(GAME_STATES.MEMORY, {
    'MemPhrase': function () {
        handleUserPhrase.call(this, false);
    },
    'anotherTest': function(){
        this.emit(":ask", "Please repeat the phrase again; " + this.attributes.repromptText);
    },
    'endTest': function(){
        this.handler.state = GAME_STATES.MEMORY;
        this.emit(":tell", "Your score is " + this.attributes.score + " out of 15.");
        this.emit(':responseReady');
        this.emitWithState('AMAZON.StopIntent');
    },
    'Unhandled': function () {
        this.response.speak("Unrecognized input, please say the phrase.");
        this.emit(':responseReady');
    }
});


module.exports = {
    memoryStatehandlers
}