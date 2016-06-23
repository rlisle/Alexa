/**
 * alexaFordDemo
 *
 */

/**
 * Update skillName and invocationName to match the values
 * that you specify in the Alexa Skill Kit.
 * These are only used in responses from Alexa.
 */
var skillName = "Hello World"
var invocationName = "hello world";

/**
 * App ID for the skill
 * Update and use this if/when you publish your skill publicly.
 * It's ok to leave this undefined until then.
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 * FordDemo is a child of AlexaSkill.
 */
var AlexaSkill = require('./AlexaSkill');
var HelloWorldSkill = function () {
  AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
HelloWorldSkill.prototype = Object.create(AlexaSkill.prototype);
HelloWorldSkill.prototype.constructor = HelloWorldSkill;

HelloWorldSkill.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
  console.log(invocationName + "onSessionStarted requestId: " + sessionStartedRequest.requestId
         + ", sessionId: " + session.sessionId);

     // any session initialization logic goes here
};

HelloWorldSkill.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
  console.log(invocationName + " onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
  var speechOutput = "Hello, world!"
  var repromptText = "Is anyone there? I said hello, world!";
  response.ask(speechOutput, repromptText);
};

HelloWorldSkill.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
  console.log(skillName + " onSessionEnded requestId: " + sessionEndedRequest.requestId
           + ", sessionId: " + session.sessionId);

  // any cleanup logic goes here
};

HelloWorldSkill.prototype.intentHandlers = {

  "HelloIntent": function (intent, session, response) {
      var speechOutput = "Hello, world!"
      var repromptText = "Is anyone there? I said hello, world!";
      response.ask(speechOutput, repromptText);
  },

  "GoodByeIntent": function (intent, session, response) {
      var speechOutput = "Good-bye, World!"
      response.say(speechOutput);
  },

  "AMAZON.HelpIntent": function (intent, session, response) {
    response.ask("You can say hello or good-bye");
  }
}


// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
  var helloWorldSkill = new HelloWorldSkill();
  helloWorldSkill.execute(event, context);
};
