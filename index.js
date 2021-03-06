let speechOutput;
let reprompt;
let welcomeOutput = "HI! welcome to capital teller. I can tell you capital of states in india. which state's capital you want to know?";
let welcomeReprompt = "Try saying, what is the capital of Uttarakhand?";
// 2. Skill Code =======================================================================================================
"use strict";
const Alexa = require('alexa-sdk');
const APP_ID = 'App id goes here';  // TODO replace with your app ID (OPTIONAL).
speechOutput = '';
const handlers = {
	'LaunchRequest': function () {
		this.emit(':ask', welcomeOutput, welcomeReprompt);
	},
	'AMAZON.HelpIntent': function () {
		speechOutput = "Try saying, what is the capital of Uttarakhand?";
		reprompt = '"Try saying, what is the capital of West Bengal?"';
		this.emit(':ask', speechOutput, reprompt);
	},
   'AMAZON.CancelIntent': function () {
		speechOutput = 'Alright! come back again for more knowledge.';
		this.emit(':tell', speechOutput);
	},
   'AMAZON.StopIntent': function () {
		speechOutput = 'Alright! come back again for more knowledge.';
		this.emit(':tell', speechOutput);
   },
   'SessionEndedRequest': function () {
		speechOutput = '';
		//this.emit(':saveState', true);//uncomment to save attributes to db on session end
		this.emit(':tell', speechOutput);
   },
	'AMAZON.FallbackIntent': function () {
		speechOutput = '';

		//any intent slot variables are listed here for convenience


		//Your custom intent handling goes here
		speechOutput = 'Sorry! I did not recognise that state name, can you that again?'
		this.emit(":ask", speechOutput, speechOutput);
    },
	'AMAZON.NavigateHomeIntent': function () {
		speechOutput = '';

		//any intent slot variables are listed here for convenience


		//Your custom intent handling goes here
		speechOutput = 'Try saying, what is the capital of Goa?';
		this.emit(":ask", speechOutput, speechOutput);
    },
	//this is costom intent which triggers when someone specify state name
	'capital': function () {
		speechOutput = '';

		//any intent slot variables are listed here for convenience

		let stateSlotRaw = this.event.request.intent.slots.state.value;
		console.log(stateSlotRaw);
		let stateSlot = resolveCanonical(this.event.request.intent.slots.state);
		console.log(stateSlot);
		let states = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu & Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttarakhand', 'Uttar Pradesh', 'West Bengal'];
		let type;
	//this if statement line verify state entity dosent contain any unknown value.	
        if(states.contains(stateSlot)){
            speechOutput = `The capital of ${stateSlot} is ${capital(stateSlot)}. Come back again for more information.`;
            type = ":tell";
        }
        else {
            speechOutput = 'Sorry can you please specify the state name again?';
            type = ":ask";
        }
		//Your custom intent handling goes here
		
		this.emit(type, speechOutput, speechOutput);
    },	
	'Unhandled': function () {
        speechOutput = "The skill didn't quite understand what you wanted.  Do you want to try something else?";
        this.emit(':ask', speechOutput, speechOutput);
    }
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    //alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
	//alexa.dynamoDBTableName = 'DYNAMODB_TABLE_NAME'; //uncomment this line to save attributes to DB
    alexa.execute();
};

//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================

//Function to verify whether given statename is valid and present in state array.(without this function this skill taking 'bye' also as a state)
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
};

//this function return capital of state.
function capital(state){
    let capital;
    if(state === 'Andhra Pradesh'){
        capital = 'Hyderabad';
    }
    else if(state === 'Arunachal Pradesh'){
        capital = 'Itanagar';
    }
    else if(state === 'Assam'){
        capital = 'Dispur';
    }
    else if(state === 'Bihar'){
        capital = 'Patna';
    }
    else if(state === 'Chhattisgarh'){
        capital = 'Raipur';
    }
    else if(state === 'Goa'){
        capital = 'Panaji';
    }
    else if(state === 'Gujarat'){
        capital = 'Gandhinagar';
    }
    else if(state === 'Haryana'){
        capital = 'Chandigarh';
    }
    else if(state === 'Himachal Pradesh('){
        capital = 'Shimla';
    }
    else if(state === 'Jammu & Kashmir'){
        capital = 'Srinagar';
    }
    else if(state === 'Jharkhand'){
        capital = 'Ranchi';
    }
    else if(state === 'Karnataka'){
        capital = 'Bangalore';
    }
    else if(state === 'Kerala'){
        capital = 'Thiruvananthapuram';
    }
    else if(state === 'Madhya Pradesh'){
        capital = 'Bhopal';
    }
    else if(state === 'Maharashtra'){
        capital = 'Mumbai';
    }
    else if(state === 'Manipur'){
        capital = 'Imphal';
    }
    else if(state === 'Meghalaya'){
        capital = 'Shillong';
    }
    else if(state === 'Mizoram'){
        capital = 'Aizawl';
    }
    else if(state === 'Nagaland'){
        capital = 'Kohima';
    }
    else if(state === 'Odisha'){
        capital = 'Bhubaneshwar';
    }
    else if(state === 'Punjab'){
        capital = 'Chandigarh';
    }
    else if(state === 'Rajasthan'){
        capital = 'Jaipur';
    }
    else if(state === 'Sikkim'){
        capital = 'Gangtok';
    }
    else if(state === 'Tamil Nadu'){
        capital = 'Chennai';
    }
    else if(state === 'Telangana'){
        capital = 'Hyderabad';
    }
    else if(state === 'Tripura'){
        capital = 'Agartala';
    }
    else if(state === 'Uttarakhand'){
        capital = 'Dehradun';
    }
    else if(state === 'Uttar Pradesh'){
        capital = 'Lucknow';
    }
    else if(state === 'West Bengal'){
        capital = 'Kolkata';
    }
    return capital;
}

function resolveCanonical(slot){
	//this function looks at the entity resolution part of request and returns the slot value if a synonyms is provided
	let canonical;
    try{
		canonical = slot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
	}catch(err){
	    console.log(err.message);
	    canonical = slot.value;
	};
	return canonical;
};

function delegateSlotCollection(){
  console.log("in delegateSlotCollection");
  console.log("current dialogState: "+this.event.request.dialogState);
    if (this.event.request.dialogState === "STARTED") {
      console.log("in Beginning");
	  let updatedIntent= null;
	  // updatedIntent=this.event.request.intent;
      //optionally pre-fill slots: update the intent object with slot values for which
      //you have defaults, then return Dialog.Delegate with this updated intent
      // in the updatedIntent property
      //this.emit(":delegate", updatedIntent); //uncomment this is using ASK SDK 1.0.9 or newer
	  
	  //this code is necessary if using ASK SDK versions prior to 1.0.9 
	  if(this.isOverridden()) {
			return;
		}
		this.handler.response = buildSpeechletResponse({
			sessionAttributes: this.attributes,
			directives: getDialogDirectives('Dialog.Delegate', updatedIntent, null),
			shouldEndSession: false
		});
		this.emit(':responseReady', updatedIntent);
		
    } else if (this.event.request.dialogState !== "COMPLETED") {
      console.log("in not completed");
      // return a Dialog.Delegate directive with no updatedIntent property.
      //this.emit(":delegate"); //uncomment this is using ASK SDK 1.0.9 or newer
	  
	  //this code necessary is using ASK SDK versions prior to 1.0.9
		if(this.isOverridden()) {
			return;
		}
		this.handler.response = buildSpeechletResponse({
			sessionAttributes: this.attributes,
			directives: getDialogDirectives('Dialog.Delegate', null, null),
			shouldEndSession: false
		});
		this.emit(':responseReady');
		
    } else {
      console.log("in completed");
      console.log("returning: "+ JSON.stringify(this.event.request.intent));
      // Dialog is now complete and all required slots should be filled,
      // so call your normal intent handler.
      return this.event.request.intent;
    }
}


function randomPhrase(array) {
    // the argument is an array [] of words or phrases
    let i = 0;
    i = Math.floor(Math.random() * array.length);
    return(array[i]);
}
function isSlotValid(request, slotName){
        let slot = request.intent.slots[slotName];
        //console.log("request = "+JSON.stringify(request)); //uncomment if you want to see the request
        let slotValue;

        //if we have a slot, get the text and store it into speechOutput
        if (slot && slot.value) {
            //we have a value in the slot
            slotValue = slot.value.toLowerCase();
            return slotValue;
        } else {
            //we didn't get a value in the slot.
            return false;
        }
}

//These functions are here to allow dialog directives to work with SDK versions prior to 1.0.9
//will be removed once Lambda templates are updated with the latest SDK

function createSpeechObject(optionsParam) {
    if (optionsParam && optionsParam.type === 'SSML') {
        return {
            type: optionsParam.type,
            ssml: optionsParam['speech']
        };
    } else {
        return {
            type: optionsParam.type || 'PlainText',
            text: optionsParam['speech'] || optionsParam
        };
    }
}

function buildSpeechletResponse(options) {
    let alexaResponse = {
        shouldEndSession: options.shouldEndSession
    };

    if (options.output) {
        alexaResponse.outputSpeech = createSpeechObject(options.output);
    }

    if (options.reprompt) {
        alexaResponse.reprompt = {
            outputSpeech: createSpeechObject(options.reprompt)
        };
    }

    if (options.directives) {
        alexaResponse.directives = options.directives;
    }

    if (options.cardTitle && options.cardContent) {
        alexaResponse.card = {
            type: 'Simple',
            title: options.cardTitle,
            content: options.cardContent
        };

        if(options.cardImage && (options.cardImage.smallImageUrl || options.cardImage.largeImageUrl)) {
            alexaResponse.card.type = 'Standard';
            alexaResponse.card['image'] = {};

            delete alexaResponse.card.content;
            alexaResponse.card.text = options.cardContent;

            if(options.cardImage.smallImageUrl) {
                alexaResponse.card.image['smallImageUrl'] = options.cardImage.smallImageUrl;
            }

            if(options.cardImage.largeImageUrl) {
                alexaResponse.card.image['largeImageUrl'] = options.cardImage.largeImageUrl;
            }
        }
    } else if (options.cardType === 'LinkAccount') {
        alexaResponse.card = {
            type: 'LinkAccount'
        };
    } else if (options.cardType === 'AskForPermissionsConsent') {
        alexaResponse.card = {
            type: 'AskForPermissionsConsent',
            permissions: options.permissions
        };
    }

    let returnResult = {
        version: '1.0',
        response: alexaResponse
    };

    if (options.sessionAttributes) {
        returnResult.sessionAttributes = options.sessionAttributes;
    }
    return returnResult;
}

function getDialogDirectives(dialogType, updatedIntent, slotName) {
    let directive = {
        type: dialogType
    };

    if (dialogType === 'Dialog.ElicitSlot') {
        directive.slotToElicit = slotName;
    } else if (dialogType === 'Dialog.ConfirmSlot') {
        directive.slotToConfirm = slotName;
    }

    if (updatedIntent) {
        directive.updatedIntent = updatedIntent;
    }
    return [directive];
}
