'use strict';
/* eslint-disable  func-names */
/* eslint-disable  dot-notation */
/* eslint-disable  new-cap */
/* eslint quote-props: ['error', 'consistent']*/


// Modules:
const Alexa = require('alexa-sdk');


// Constants:
const questions = require('./data/question');
const languageString = require('./data/speechOutput');
const ANSWER_COUNT = 6;

const constants = require ('./data/constants')
const GAME_STATES = constants.GAME_STATES
const APP_ID = undefined; // TODO replace with your app ID (OPTIONAL)


// Functions:
const handleUserGuess = require('./functions/handleUserGuess').handleUserGuess;


// State Handlers:
const nameHandlers = require('./state_handlers/nameHandlers').nameHandlers;
const topicHandlers = require('./state_handlers/topicHandlers').topicHandlers;
const assessStateHandlers = require('./state_handlers/assessStateHandlers').assessStateHandlers;
const concussionTopicHandlers = require('./state_handlers/concussionTopicHandlers').concussionTopicHandlers
const startStateHandlers = require('./state_handlers/startStateHandlers').startStateHandlers;
const triviaStateHandlers = require('./state_handlers/triviaStateHandlers').triviaStateHandlers;
const helpStateHandlers = require('./state_handlers/helpStateHandlers').helpStateHandlers;
const memoryStartStatehandlers = require('./state_handlers/memoryStartStatehandlers').memoryStartStatehandlers;
const memoryStatehandlers = require('./state_handlers/memoryStatehandlers').memoryStatehandlers;
const questionStateHandlers = require('./state_handlers/questionStateHandlers').questionStateHandlers;


// Session Handlers:
const newSessionHandlers = {
    LaunchRequest() {
        this.handler.state = '_NAMEMODE';
        this.emit(":ask", 'Welcome, what is your name?');
    }
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageString;
    alexa.registerHandlers(newSessionHandlers, nameHandlers, topicHandlers, concussionTopicHandlers, assessStateHandlers, startStateHandlers, triviaStateHandlers, helpStateHandlers, memoryStartStatehandlers, memoryStatehandlers, questionStateHandlers);
    alexa.execute();
};