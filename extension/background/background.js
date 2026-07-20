console.log("🛡️ Cyvora AI Background Running");

let latestTrackers = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.type === "TRACKERS") {

        latestTrackers = message.trackers;

        console.log("Trackers Detected:", latestTrackers);

    }

});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.type === "GET_TRACKERS") {

        sendResponse({

            trackers: latestTrackers

        });

    }

});