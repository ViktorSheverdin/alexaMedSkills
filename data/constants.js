'use strict';

const questions = require('./question');

module.exports = {
    GAME_STATES: {
        TOPIC: '_TOPICMODE', // Ask which Topic.
        ASSESS: '_ASSESSMODE', // Ask if they want assessment.
        TRIVIA: '_TRIVIAMODE', // Asking trivia questions.
        MEMSTART: '_MEMSTARTMODE', //Memory assessment
        MEMORY: '_MEMORYMODE',
        START: '_STARTMODE', // Entry point, start the game.
        HELP: '_HELPMODE', // The user is asking for help.
        QUESTION: '_QUESTIONMODE'
    },
    ANSWER_COUNT: 6,
    MEMORY_PHRASE: [
        ["finger", "penny", "blanket", "lemon", "insect"],
        ["candle", "paper", "sugar", "sandwich", "wagon"],
        ["baby", "monkey", "perfume", "sunset", "iron"],
        ["elbow", "apple", "carpet", "saddle", "bubble"],
        ["jacket", "arrow", "pepper", "cotton", "movie"],
        ["dollar", "honey", "mirror", "saddle", "anchor"]
    ]
}


