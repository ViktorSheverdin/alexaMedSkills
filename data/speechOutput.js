'use strict';

const questions = require('./question');

module.exports = {
    /**
     * When editing your questions pay attention to your punctuation. Make sure you use question marks or periods.
     * Make sure the first answer is the correct one. Set at least ANSWER_COUNT answers, any extras will be shuffled in.
     */
    'en': {
        'translation': {
            'QUESTIONS': questions['QUESTIONS_EN_US'].concussion.questionList,
            'NUMBER_OF_QUESTIONS': questions['QUESTIONS_EN_US'].concussion.questionList.length,
            'SKILL_NAME': 'SCAT 5 QUESTIONAIRE',
            'HELP_MESSAGE': 'I will ask you %s questions. Respond with the number for answer. ' +
                'For example, say one, two, three, or four. To start a new assessment at any time, say, start assessment. ',
            'REPEAT_QUESTION_MESSAGE': 'To repeat the last question, say, repeat. ',
            'ASK_MESSAGE_START': 'Would you like to start?',
            'HELP_REPROMPT': 'To give an answer to a question, respond with the number of the answer. ',
            'STOP_MESSAGE': 'Would you like to keep going?',
            'CANCEL_MESSAGE': 'Ok, let\'s do this again soon.',
            'NO_MESSAGE': 'Ok, we\'ll do this another time. Goodbye!',
            'TRIVIA_UNHANDLED': 'Try saying a number between 0 and 6',
            'HELP_UNHANDLED': 'Say yes to continue, or no to end the game.',
            'START_UNHANDLED': 'Say start to start a new game.',
            'NEW_ASSESSMENT_MESSAGE': 'Welcome to %s. ',
            'WELCOME_MESSAGE': 'I will ask you %s questions, this will take some time, please stay with me. ' +
            'Please respond to each question with a number between 0 and 6, with 0 being no symptom and 6 being severe symptoms. Let\'s begin. ',
            'QUESTION_PADDING': ['OK! Let\'s move on. ', 'Alright, next question. ', 'I will remember that, here\'s the next one. ', 'We are getting there, next question. '],
            'TELL_QUESTION_MESSAGE': ' Question %s. %s ',
            'ASSESSMENT_OVER_MESSAGE': 'You got %s.',
            'SEE_DOCTOR': 'Based on your responses so far, we recommend you contact your doctor immediately. '
        },
    },
    'en-US': {
        'translation': {
            'QUESTIONS': questions['QUESTIONS_EN_US'].concussion.questionList,
            'SKILL_NAME': 'HealthVoice',
        },
    },
    'en-CA': {
        'translation': {
            'QUESTIONS': questions['QUESTIONS_EN_US'].concussion.questionList,
            'NUMBER_OF_QUESTIONS': questions['QUESTIONS_EN_US'].concussion.questionList.length,
            'SKILL_NAME': 'SCAT 5 QUESTIONAIRE',
            'HELP_MESSAGE': 'I will ask you %s questions. Respond with the number for answer. ' +
                'For example, say one, two, three, or four. To start a new assessment at any time, say, start assessment. ',
            'REPEAT_QUESTION_MESSAGE': 'To repeat the last question, say, repeat. ',
            'ASK_MESSAGE_START': 'Would you like to start?',
            'HELP_REPROMPT': 'To give an answer to a question, respond with the number of the answer. ',
            'STOP_MESSAGE': 'Would you like to keep going?',
            'CANCEL_MESSAGE': 'Ok, let\'s do this again soon.',
            'NO_MESSAGE': 'Ok, we\'ll do this another time. Goodbye!',
            'TRIVIA_UNHANDLED': 'Try saying a number between 0 and 6',
            'HELP_UNHANDLED': 'Say yes to continue, or no to end the game.',
            'START_UNHANDLED': 'Say start to start a new game.',
            'NEW_ASSESSMENT_MESSAGE': 'Welcome to %s. ',
            'WELCOME_MESSAGE': 'I will ask you %s questions, this will take some time, please stay with me. ' +
            'Please respond to each question with a number between 0 and 6, with 0 being no symptom and 6 being severe symptoms. Let\'s begin. ',
            'QUESTION_PADDING': ['OK! Let\'s move on. ', 'Alright, next question. ', 'I will remember that, here\'s the next one. ', 'We are getting there, next question. '],
            'TELL_QUESTION_MESSAGE': ' Question %s. %s ',
            'ASSESSMENT_OVER_MESSAGE': 'You got %s.',
            'SEE_DOCTOR': 'Based on your responses so far, we recommend you contact your doctor immediately. '
        },
    }
};
