'use strict';

const Alexa = require('alexa-sdk');
const constants = require('../data/constants');
const GAME_STATES = constants.GAME_STATES

const startStateHandlers = Alexa.CreateStateHandler(GAME_STATES.START, {
    'StartAssessment': function (newGame) {
        let speechOutput = newGame ? this.t('NEW_ASSESSMENT_MESSAGE', this.t('SKILL_NAME')) + this.t('WELCOME_MESSAGE', this.t('NUMBER_OF_QUESTIONS').toString()) : '';
        // Select GAME_LENGTH questions for the game
        const gameQuestions = this.t('QUESTIONS');
        const currentQuestionIndex = 0;
        const spokenQuestion = gameQuestions[0];
        console.log(gameQuestions)
        let repromptText = this.t('TELL_QUESTION_MESSAGE', '1', spokenQuestion);
        speechOutput += repromptText;
        Object.assign(this.attributes, {
            'speechOutput': repromptText,
            'repromptText': repromptText,
            'currentQuestionIndex': currentQuestionIndex,
            'questions': gameQuestions,
            'score': 0,
            'scores': []
        });
        // Set the current state to trivia mode. The skill will now use handlers defined in triviaStateHandlers
        this.handler.state = GAME_STATES.TRIVIA;
        this.response.speak(speechOutput).listen(repromptText);
        this.response.cardRenderer(this.t('TRIVIA_NAME'), repromptText);
        this.emit(':responseReady');
    },
});


module.exports = {
    startStateHandlers
}