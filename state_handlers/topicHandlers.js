'use strict';

const Alexa = require('alexa-sdk');
const constants = require('../data/constants');
const GAME_STATES = constants.GAME_STATES

const topicHandlers = Alexa.CreateStateHandler(GAME_STATES.TOPIC, {
    'TopicIntent': function () {
        // handleUserGuess.call(this, false);
        const userTopic = this.event.request.intent.slots.UserTopic.value;
        if(userTopic === "concussion"){
            this.handler.state = "CONCUSSION_MODE";
            this.emit(":ask", 'Which concussion module would you like to access today? We have SCAT FIVE model');
        } else {
            this.handler.state = GAME_STATES.TOPIC;
            this.emitWithState('AMAZON.CancelIntent');
        }
    },
    'Unhandled': function () {
        
        this.handler.state = GAME_STATES.TOPIC;
        this.emit(":ask", 'That is not currently available, please ask for a supported medical topic.  For example, ask about concussion');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(this.t('CANCEL_MESSAGE'));
        this.emit(':responseReady');
    },
});


module.exports = {
    topicHandlers
}