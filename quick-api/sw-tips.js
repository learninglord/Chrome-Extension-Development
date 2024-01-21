console.log("sw-tips.js")

const updateTip = async () => {
    // const response = await fetch('https://developer.chrome.com/docs/devtools/tips/*')
    // const tips = await response
    const tips = range(1, 500)
    console.log("Fetched Tips" + tips)

    const random = Math.floor(Math.random() * tips.length)

    console.log("Random tip : " + tips[random])
    return chrome.storage.local.set({
        tip: "Tip : " + tips[random]
    })
}

function range(start, end) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

const ALARM_NAME = 'tip'

// Check if alarm exists to avoid resetting the timer.
// The alarm might be removed when the browser session restarts.
async function createAlarm() {
    const alarm = await chrome.alarms.get(ALARM_NAME)
    if (typeof alarm === undefined) {
        console.log("Creating Alarm tip")
        chrome.alarms.create(ALARM_NAME, {
            delayInMinutes: 1,
            periodInMinutes: 1
        })
    }
    console.log("Updating tip")
    updateTip();
}

createAlarm();

// Update tip once a day
console.log("Adding update tip listener")
chrome.alarms.onAlarm.addListener(updateTip());

// Send tip to content script via messaging
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.greeting === 'tip') {
        console.log("OnMessage : " + message + sender + sendResponse)
        chrome.storage.local.get('tip').then(sendResponse);
        return true;
    }
  });
