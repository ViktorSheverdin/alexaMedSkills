'use strict';

const constants = require('../data/constants');
const ANSWER_COUNT = constants.ANSWER_COUNT
const GAME_STATES = constants.GAME_STATES

function isAnswerSlotValid(intent) {
    const answerSlotFilled = intent && intent.slots && intent.slots.Answer && intent.slots.Answer.value;
    const answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.Answer.value, 10));
    return answerSlotIsInt
        && parseInt(intent.slots.Answer.value, 10) < (ANSWER_COUNT + 1)
        && parseInt(intent.slots.Answer.value, 10) >= 0;
}

function handleUserGuess(userGaveUp) {
    const answerSlotValid = isAnswerSlotValid(this.event.request.intent);
    let speechOutput = '';
    let speechOutputAnalysis = '';
    const gameQuestions = this.attributes.questions;
    let scores = this.attributes.scores;
    let currentScore = parseInt(this.attributes.score, 10);
    let currentQuestionIndex = parseInt(this.attributes.currentQuestionIndex, 10);
    const translatedQuestions = this.t('QUESTIONS');
    

    if (answerSlotValid) {
        currentScore += parseInt(this.event.request.intent.slots.Answer.value, 10);
        scores.push(parseInt(this.event.request.intent.slots.Answer.value, 10));
    } else {
        this.emitWithState('Unhandled');
        return;
    }
    
    if (currentScore/(currentQuestionIndex+1) >= 5 && currentQuestionIndex >=4){
        Object.assign(this.attributes, {
            'currentQuestionIndex': currentQuestionIndex,
            'scores': scores,
        });
        this.handler.state = GAME_STATES.HELP;
        this.emitWithState('DOCTOR')
    }
    
    let questionPadding=this.t('QUESTION_PADDING')[Math.floor(Math.random()*4)];
    
    if(parseInt(this.attributes.currentQuestionIndex) === 10){
        questionPadding='Great job hanging in there, We are half way done. '
    }

    // Check if we can exit the game session after GAME_LENGTH questions (zero-indexed)
    if (this.attributes['currentQuestionIndex'] === this.t('NUMBER_OF_QUESTIONS') - 1) {
        speechOutput = userGaveUp ? '' : questionPadding;
        speechOutput += speechOutputAnalysis + this.t('ASSESSMENT_OVER_MESSAGE', currentScore.toString());

        this.response.speak(speechOutput);
        this.emit(':responseReady');
    } else {
        currentQuestionIndex += 1;
        const spokenQuestion = gameQuestions[currentQuestionIndex];
        const questionIndexForSpeech = currentQuestionIndex + 1;
        let repromptText = this.t('TELL_QUESTION_MESSAGE', questionIndexForSpeech.toString(), spokenQuestion);

        speechOutput += userGaveUp ? '' : questionPadding;
        speechOutput += speechOutputAnalysis + this.t('ASSESSMENT_OVER_MESSAGE', currentScore.toString()) + repromptText;

        Object.assign(this.attributes, {
            'speechOutput': repromptText,
            'repromptText': repromptText,
            'currentQuestionIndex': currentQuestionIndex,
            'questions': gameQuestions,
            'score': currentScore,
            'scores': scores,
        });

        this.response.speak(speechOutput).listen(repromptText);
        this.response.cardRenderer(this.t('SKILL_NAME', repromptText));
        this.emit(':responseReady');
    }
}

module.exports = {
    handleUserGuess
}