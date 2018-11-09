'use strict';

const constants = require('../data/constants');
const GAME_STATES = constants.GAME_STATES
const MEMORY_PHRASE = constants.MEMORY_PHRASE


function handleUserPhrase(userGaveUp){
    const userPhraseString = this.event.request.intent.slots.Phrase.value;
    const userPhraseArray = userPhraseString.split(" ");
    const originalPhrase = MEMORY_PHRASE[this.attributes.phraseIndex];
    
    let phraseScore = this.attributes.score;
    let index = 0;
    
    for(index = 0; index < originalPhrase.length; index++){
        if(userPhraseArray.includes(originalPhrase[index])){
            phraseScore++;
        }
    }
    
    let currQuestionIndex = this.attributes.currentQuestionIndex;
    currQuestionIndex += 1;
    
    Object.assign(this.attributes, {
            'speechOutput': this.attributes.speechOutput,
            'repromptText': this.attributes.repromptText,
            'currentQuestionIndex': currQuestionIndex,
            'questions': this.attributes.questions,
            'score': phraseScore,
            'phraseIndex': this.attributes.phraseIndex,
    });
    
    if(currQuestionIndex > 2){
        this.handler.state = GAME_STATES.MEMORY;
        this.emitWithState('endTest');
    } else {
        this.handler.state = GAME_STATES.MEMORY;
        this.emitWithState('anotherTest');
    }
    
    
}

module.exports = {
    handleUserPhrase
}