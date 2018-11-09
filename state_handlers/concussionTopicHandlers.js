'use strict';

const Alexa = require('alexa-sdk');
const constants = require('../data/constants');
const GAME_STATES = constants.GAME_STATES

const concussionTopicHandlers = Alexa.CreateStateHandler("CONCUSSION_MODE", {
    'ConcussionTopicSelectionIntent': function () {
        const concussionModule = this.event.request.intent.slots.UserConcussionTopic.value;
        
        if(concussionModule === "assessment"){
            this.handler.state = GAME_STATES.ASSESS;
            this.emitWithState('AssessIntent');
        } else if(concussionModule === "question"){
            this.handler.state = GAME_STATES.QUESTION;
            this.emitWithState('QuestionIntent');
        } else if(concussionModule === "test"){
            this.handler.state = GAME_STATES.MEMSTART;
            this.emitWithState('beginAssessment');
        }
        
        this.handler.state = GAME_STATES.TOPIC;
        this.emit(":ask", 'That is not a recognized topic, please say a supported medical topic');

    },
    'Unhandled': function () {
        this.handler.state = "CONCUSSION_MODE";
        this.emit(":ask", "That is not an available module, please say a valid module ");
        
    }
});

module.exports = {
    concussionTopicHandlers
}