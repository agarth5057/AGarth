var https = require('http');
//TODO 
var uri = ""; // the external IP including port number - remember you will need to port forward to your directv receiver's port 8080
var mac_addr = ""; //your client mac address without hyphens and ALL CAPS

//EVERYTHING BELOW THIS LINE NEEDS NO CHANGES TO WORK
var assemble = "";
var endpoint = "";
var channel = "";
var command = "";
var path = "";
exports.handler = (event, context) => {
    try {
        assemble = "";
        endpoint = "";
        channel = "";
        command = "";
        path = "";
        if (event.session.new) {
            // New Session
            console.log("NEW SESSION");
        }
        switch (event.request.type) {
        case "LaunchRequest":
            // Launch Request
            console.log(`LAUNCH REQUEST`);
            context.succeed(generateResponse(buildSpeechletResponse("Ask me to do something with your tv, such as changing the channel, record a show, power on or off, or choose a network to watch.", true), {}));
            break;
        case "IntentRequest":
            if (event.request.intent.slots.zoneId) detectZone(event.request.intent.slots.zoneId.value);
            if (event.request.intent.slots.ChannelNumber) channel = event.request.intent.slots.ChannelNumber.value;
            if (event.request.intent.slots.command) command = event.request.intent.slots.command.value;

            // Intent Request
            console.log(`INTENT REQUEST`);
            switch (event.request.intent.name) {
            case "GetCommand":
                switch (command) {
                case "play":
                case "resume":
                    path = '/remote/processKey?key=play';
                    break;
                case "pause":
                case "freeze":
                    path = '/remote/processKey?key=pause';

                    break;
                case "guide":
                    path = '/remote/processKey?key=guide'
                    break;
                case "power":
                case "turn on":
                case "turn off":
                case "power on":
                case "power off":
                    path = '/remote/processKey?key=power';
                    break;
                case "format":
                    path = '/remote/processKey?key=format';
                    break;
                case "rewind":
                    path = '/remote/processKey?key=rew';
                    break;
                case "replay":
                    path = '/remote/processKey?key=replay';
                    break;
                case "stop":
                    path = '/remote/processKey?key=stop';
                    break;
                case "advance":
                    path = '/remote/processKey?key=advance';
                    break;
                case "fast forward":
                    path = '/remote/processKey?key=ffwd';
                    break;
                case "record":
                case "save":
                    path = '/remote/processKey?key=record'
                    break;
                case "active":
                    path = '/remote/processKey?key=active';
                    break;
                case "list":
                case "recorded shows":
                case "DVR":
                    path = '/remote/processKey?key=list';
                    break;
                case "exit":
                case "end":
                case "leave":
                    path = '/remote/processKey?key=exit';
                    break;
                case "back":
                    path = '/remote/processKey?key=back';
                    break;
                case "menu":
                    path = '/remote/processKey?key=menu';
                    break;
                case "delete":
                    path = '/remote/processKey?key=red';
                    break;
                case "info":
                    path = '/remote/processKey?key=info';
                    break;
                case "up":
                    path = '/remote/processKey?key=up';
                    break;
                case "down":
                    path = '/remote/processKey?key=down';
                    break;
                case "left":
                    path = '/remote/processKey?key=left';
                    break;
                case "right":
                    path = '/remote/processKey?key=right';
                    break;
                case "select":
                case "enter":
                    path = '/remote/processKey?key=select';
                    break;
                case "channel up":
                case "page up":
                    path = '/remote/processKey?key=chanup';
                    break;
                case "channel down":
                case "page down":
                    path = '/remote/processKey?key=chandown';
                    break;
                case "previous":
                    path = '/remote/processKey?key=prev';
                    break;
                case "show":
                case "channel":
                    path = '/tv/getTuned';
                    break;
                case "CNN":
                    path = '/tv/tune?major=202';
                    break;
                case "ABC family":
                    path = '/tv/tune?major=311';
                    break;
                case "AMC":
                    path = '/tv/tune?major=254';
                    break;
                case "A&E":
                    path = '/tv/tune?major=265';
                    break;
                case "animal planet":
                    path = '/tv/tune?major=282';
                    break;
                case "BET":
                    path = '/tv/tune?major=329';
                    break;
                case "bravo":
                    path = '/tv/tune?major=237';
                    break;
                case "comedy central":
                    path = '/tv/tune?major=249';
                    break;
                case "C span":
                    path = '/tv/tune?major=250';
                    break;
                case "cartoon network":
                    path = '/tv/tune?major=296';
                    break;
                case "discovery":
                    path = '/tv/tune?major=278';
                    break;
                case "Disney channel":
                    path = '/tv/tune?major=290';
                    break;
                case "Disney junior":
                    path = '/tv/tune?major=289';
                    break;
                case "Disney XD":
                    path = '/tv/tune?major=292';
                    break;
                case "food network":
                    path = '/tv/tune?major=231';
                    break;
                case "fox":
                    path = '/tv/tune?major=360';
                    break;
                case "FX":
                    path = '/tv/tune?major=248';
                    break;
                case "HGTV":
                    path = '/tv/tune?major=229';
                    break;
                case "history channel":
                    path = '/tv/tune?major=269';
                    break;
                case "lifetime":
                    path = '/tv/tune?major=252';
                    break;
                case "MSNBC":
                    path = '/tv/tune?major=356';
                    break;
                case "MTV":
                    path = '/tv/tune?major=331';
                    break;
                case "MTV2":
                    path = '/tv/tune?major=333';
                    break;
                case "national geographic":
                    path = '/tv/tune?major=276';
                    break;
                case "nick junior":
                    path = '/tv/tune?major=301';
                    break;
                case "spike":
                    path = '/tv/tune?major=241';
                    break;
                case "syfy":
                    path = '/tv/tune?major=244';
                    break;
                case "TBS":
                    path = '/tv/tune?major=247';
                    break;
                case "TNT":
                    path = '/tv/tune?major=245';
                    break;
                case "true TV":
                    path = '/tv/tune?major=246';
                    break;
                case "VH1":
                    path = '/tv/tune?major=335';
                    break;
                case "ESPN":
                    path = '/tv/tune?major=206';
                    break;
                case "ESPN2":
                    path = '/tv/tune?major=209';
                    break;
                }
                if (path == "/tv/getTuned") {
                    endpoint = uri + path;

                    if (assemble) endpoint = uri + path + "?" + assemble;
                    console.log(endpoint);
                    var body = "";
                    https.get(endpoint, (response) => {
                        response.on('data', (chunk) => {
                            body += chunk
                        });
                        response.on('end', () => {
                            var data = JSON.parse(body);
                            var title = data.title;
                            var channel = data.major;
                            context.succeed(generateResponse(

                                buildSpeechletResponse(`You are watching ${title} on channel ${channel}`, true), {}));
                        });
                    });
                } else if (path.match(/remote/)) {
                    endpoint = uri + path;

                    if (assemble) endpoint = uri + path + "&" + assemble;
                    console.log(endpoint);
                    var body = "";
                    https.get(endpoint, (response) => {
                        response.on('data', (chunk) => {
                            body += chunk
                        });
                        response.on('end', () => {
                            var data = JSON.parse(body);
                            var title = data.title;
                            var channel = data.major;
                            context.succeed(generateResponse(buildSpeechletResponse(`Okay, ${command}`, true), {}));
                        });
                    });
                } else if (path.match(/tune/)) {
                    endpoint = uri + path;
                    if (assemble) endpoint = uri + path + "&" + assemble;
                    console.log(endpoint);
                    var body = "";
                    https.get(endpoint, (response) => {
                        response.on('data', (chunk) => {
                            body += chunk
                        });
                        response.on('end', () => {
                            var data = JSON.parse(body);
                            context.succeed(generateResponse(buildSpeechletResponse(`Okay, here is ${command}`, true), {}));
                        });
                    });
                } else {
                    console.log("no cases matched");
                    context.succeed(generateResponse(buildSpeechletResponse(`Sorry, I didn't understand`, true), {}));
                }
                break;
            case "GetChannelDirect":
                var channel = event.request.intent.slots.ChannelNumber.value;
                console.log(1);
                var body = "";

                endpoint = uri + "/tv/tune?major=" + channel;
                if (assemble) endpoint = uri + "/tv/tune?major=" + channel + "&" + assemble;
                console.log(endpoint);
                var body = "";
                https.get(endpoint, (response) => {
                    response.on('data', (chunk) => {
                        body += chunk
                    });
                    response.on('end', () => {
                        var data = JSON.parse(body);
                        context.succeed(generateResponse(buildSpeechletResponse(`Okay, here is channel ${channel}`, true), {}));
                    });
                });
                break;
            default:
                throw "Invalid intent";
            }
            break;
        case "SessionEndedRequest":
            // Session Ended Request
            console.log(`SESSION ENDED REQUEST`);
            break;
        default:
            context.fail(`INVALID REQUEST TYPE: ${event.request.type}`);
        }
    } catch (error) {
        context.fail(`Exception: ${error}`)
    }
}




// Helpers
buildSpeechletResponse = (outputText, shouldEndSession) => {
    return {
        outputSpeech: {
            type: "PlainText",
            text: outputText
        },
        shouldEndSession: shouldEndSession
    };
};
generateResponse = (speechletResponse, sessionAttributes) => {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}
detectZone = function (zone) {
    if (zone == "bed room") {
        console.log('bed');
        assemble = "clientAddr=" + mac_addr;
        return;
    }
    if (zone == "living room" || zone == undefined || zone == null) {
        console.log('living');
        assemble = undefined;
        return;
    }
}
