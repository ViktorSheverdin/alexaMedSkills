# General
Backend: Node.js v 8.10 </br>
Backend location: AWS Lambda </br>
Frontend (Intent Schema): JSON </br>
Invocation: concussion doctor </br>
# Handlers
## Adding new handlers:
When you are creating a new handler, the handler should be stored in "state_handlers" directory.
To use a new handler, import it to the “index.js” file. Note: handlers name and file name should be the same.
To start a handler, you need to change GAME_STATES mode. GAME_STATES modes are located in “~/data/constants.js”.
Amazon Alexa requires default Built-In Intents to work properly. This is the list of required Intents: 
- AMAZON.StartOverIntent
- AMAZON.RepeatIntent
- AMAZON.HelpIntent
- AMAZON.StopIntent
- AMAZON.CancelIntent
- AMAZON.RepeatIntent
- AMAZON.YesIntent
- AMAZON.NoIntent
- AMAZON.MoreIntent
- AMAZON.NavigateHomeIntent
- AMAZON.NavigateSettingsIntent
- AMAZON.NextIntent
- AMAZON.PageUpIntent
- AMAZON.PageDownIntent
- AMAZON.PreviousIntent
- AMAZON.ScrollRightIntent
- AMAZON.ScrollDownIntent
- AMAZON.ScrollLeftIntent
- AMAZON.ScrollUpIntent
You also need to request “alexa-sdk”.
## Slot Type
Slots are variables in uttereances that requires a custom intent in order to use them.
ex) The answer is {Answer}.  In this case the slot is Answer.
Slot types define how data is recognized and handled.
This is the list of required slot types:
- SkillModule : Gets the topic/handlers and start it
- ConcussionTopic : Decides which concussion modules to run
- AMAZON.NUMBER : Gets the user's phone number
- AMAZON.SearchQuery : Determines whether the user is saying the phrase in right order or not
- AMAZON.US_FIRST_NAME : Gets the first name of a user
## Current handlers:
- assessStateHandler
    - Description: Change the GAME_MODE to START, which enables the startStateHandler
    - Intent: AssessIntent
    - Sample Utterances: is started by *concussionTopicHandlers*
    - Slot Type: None
- concussionTopicHandlers
    - Description: Checks user input and starts either memory test, or concussion questions (need to be developed), or SCAT5 questions
    - Intent: ConcussionTopicSelectionIntent
    - Sample Utterances:
        - Uh {UserConcussionTopic}
        - {UserConcussionTopic} please
        - {UserConcussionTopic}
    - Slot Type: ConcussionTopic
        - Requires:
            - Test
            - Assessment
            - Question
- endAssessmentHandler
    - Description: This handler is activated at the end of assesment, when user answers last question. It creates an object,
    that will be sent to the dynamoDB. It also creates the output for SMS and triggers function *sendSMS*.
    - Intent: EndAssessment
    - Sample Utterance: is started by **
- helpStateHandlers
    - Description: Is started when a user needs helps. The *DOCTOR* intent is called by *handleUserGuess* when the score for 6 questions is 6
    - Intent:
        - helpTheUser
        - DOCTOR
    - Sample Utterances: *helpTheUser* is called from any point during the session. *DOCTOR* is called by *handleUserGuess*
    - Slot Type: None
- memoryStartStatehandlers
    - Description: Starts memory test assessment
    - Intent: beginAssessment
    - Sample Utterances: is started by *concussionTopicHandlers*
    - Slot Type: None
- memoryStatehandlers
    - Description: Handles user's input and either provides with another test or ends testing
    - Intent:
        - MemPhrase
        - anotherTest
        - endTest
        - Unhandled
    - Sample Utterances: The phrase is {Phrase}
    - Slot Type: AMAZON.SearchQuery
- nameHandlers
    - Description: Ask user for his/her name, and greets the user
    - Intent: UserNameIntent
    - Sample Utterances:
        - I am {Username}
        - My name is {Username}
        - {Username}
    - Slot Type: AMAZON.US_FIRST_NAME
- startStateHandlers
    - Description: Starts trivia questions 
    - Intent: StartAssessment
    - Sample Utterances: is started by *assessStateHandlers*
    - Slot Type: None
- topicHandlers
    - Description: Ask user to choose a topic (currently concussion)
    - Intent: TopicIntent
    - Sample Utterances:
        - I want {UserTopic}
        - {UserTopic} please
        - I want to do {UserTopic}
        - {UserTopic}
    - Slot Type:
        - SkillModule
            - concussion
- triviaStateHandlers
    - Description: Checks if user's answers are correct for Alexa questions during trivia 
    - Intent:
        - AnswerIntent
        - DontKnowIntent
    - Sample Utterances:
        - AnserIntent:
            - the answer is {Answer}
            - my answer is {Answer}
            - is it {Answer}
            - {Answer} is my answer
        - DontKnowIntent:
            - i don't know
            - don't know
            - i don't know that one
            - dunno
            - skip
    - Slot Type: None
# Functions
## Current functions files:
### handleUserGuess:
Used in *triviaStateHandler* to checks if user answer is valid: answer is not Null, answer is an integer, that is bigger or equal to 0 and smaller or equal to six. Then it checks if trivia questions are keep going. If score for first six questions is 6, Alexa will tell user to immediately go to the doctor. If it a last question, GAME_STATE mode will be changed.
- *isAnswerSlotValid*
    - Params:
        - intent : JSON
        - followupPhase : boolean
    - Returns: boolean
    - Description: Checks if the user input is not Null and returns boolean
- *handleUserGuess*
    - Params:
        - userGoBack : this
        - followupResponse : boolean
    - Returns: None
    - Description: If answer is valid, it checks the current question. If it is less then 22, it prepares data for the next question. 
### handleUserPhrase
Used in *memoryStatehandlers*.
It checks whether the user speaks the phrase in the same order as Alexa told to the user. Alexa will ask the phrase three times and the user has to say in the same manner. Based on what the user says, Alexa will mark the user's state out of 15.
- *handleUserPhrase*
    - Params:
        - userGaveUp: this
    - Description: It chooses which phrase to use for the user's test and marks the score based on the user's response.
### sendSMS
Used in *helpStateHandlers*
It sends SMS to a user’s phone with the score by using AWS SNS.
The function is invoked by *endAssessmentHandler* and passes standardized output for a user. The output includes final score, answers of the last two questions, date and time stamps.
- *sendSMS*
    - Params:
        - phone_number : this
        - sms_body : number(phone)
        - finalScore : speechoutput
    - Returns: None
    - Description: It gets the user's phone number and final score of the test; send it to the user's phone via text message.
