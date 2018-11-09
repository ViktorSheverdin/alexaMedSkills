'use strict';

const Alexa = require('alexa-sdk');
const constants = require('../data/constants');
const GAME_STATES = constants.GAME_STATES;
const MEMORY_PHRASE = constants.MEMORY_PHRASE;

const memoryStartStatehandlers = Alexa.CreateStateHandler(GAME_STATES.MEMSTART, {
    'beginAssessment': function(){
        const message= "I will read you a list of words and when I am done, repeat back as many words as you can remember in any order. Please begin your response with: The phrase is. Let's begin. ";
        
        
        const selectedPhraseIndex = parseInt(Math.floor(Math.random() * MEMORY_PHRASE.length), 10);
        
        const phraseMessage = MEMORY_PHRASE[selectedPhraseIndex].join(' <break time="3s" />');
        
        Object.assign(this.attributes, {
            'speechOutput': message,
            'repromptText': phraseMessage,
            'currentQuestionIndex': 0,
            'questions': this.attributes["questions"],
            'score': 0,
            'phraseIndex': selectedPhraseIndex,
        });
    
        this.handler.state = GAME_STATES.MEMORY
       
        this.emit(":ask", message + phraseMessage);
    }
});


module.exports = {
    memoryStartStatehandlers
}