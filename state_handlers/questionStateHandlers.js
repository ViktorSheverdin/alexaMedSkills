'use strict';

const Alexa = require('alexa-sdk');
const constants = require('../data/constants');
const question = require('../data/question');
const GAME_STATES = constants.GAME_STATES
const ANSWER_COUNT = constants.ANSWER_COUNT

const questionStateHandlers = Alexa.CreateStateHandler(GAME_STATES.QUESTION, {
    'QuestionIntent': function () {
        const availableQuestions = Object.keys(question.QUESTIONS_EN_US.concussion.questionsAndAnswers).join(', <break time="1s"/>');
        const speechOutput = 'You can ask about the following concussion topics and I will try my best to answer them: ' + availableQuestions;
        this.handler.state = GAME_STATES.QUESTION

        this.emit(':ask', speechOutput);
    },
    'UserNameIntent': function () {
        if(this.event.request.intent.slots.Username.value in question.QUESTIONS_EN_US.concussion.questionsAndAnswers) {
            const availableQuestions = Object.keys(question.QUESTIONS_EN_US.concussion.questionsAndAnswers).join(', <break time="1s"/>');
            const repromtText = 'Do you have any other questions for me? You can ask me about the following topic: ' + availableQuestions;
            this.emit(':ask', question.QUESTIONS_EN_US.concussion.questionsAndAnswers[this.event.request.intent.slots.Username.value] + ' ' + repromtText);
            this.emitWithState('QuestionIntent')
        } else {
            const availableQuestions = Object.keys(question.QUESTIONS_EN_US.concussion.questionsAndAnswers).join(', <break time="1s"/>');
            this.emit(':ask', 'That is not an available topic, please select a valid one from the following list: ' + availableQuestions);
            this.emitWithState('QuestionIntent')
        }
        
    },
    'QAIntent': function () {
        if(this.event.request.intent.slots.QATopic.value in question.QUESTIONS_EN_US.concussion.questionsAndAnswers) {
            this.response.speak(question.QUESTIONS_EN_US.concussion.questionsAndAnswers[this.event.request.intent.slots.QATopic.value])
            this.emitWithState('QuestionIntent')
        } else {
            this.emitWithState('AMAZON.RepeatIntent')
        }
        
    },
    'AMAZON.StartOverIntent': function () {
        this.emitWithState('QuestionIntent', false);
    },
    'AMAZON.RepeatIntent': function () {
        const availableQuestions = Object.keys(question.QUESTIONS_EN_US.concussion.questionsAndAnswers).join(', <break time="1s"/>');
        const speechOutput = 'You can ask about the following concussion topics and I will try my best to answer them: ' + availableQuestions;
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        this.handler.state = GAME_STATES.HELP;
        this.emitWithState('helpTheUser', false);
    },
    'AMAZON.StopIntent': function () {
        const speechOutput = 'Alright. Do you have any other topic in mind for today? You can shoose concusion test or ask questions about concussion';
        
        this.handler.state = GAME_STATES.TOPIC;
        this.emit(":ask", speechOutput);
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
    'AMAZON.NoIntent': function() {
        const speechOutput = 'Alright. What other topic interests you today? You can shoose concusion test or ask questions about concussion';
        
        this.handler.state = GAME_STATES.TOPIC;
        this.emit(":ask", speechOutput);
    }
});


module.exports = {
    questionStateHandlers
}