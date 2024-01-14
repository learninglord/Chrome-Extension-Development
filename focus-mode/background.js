chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
    chrome.action.setBadgeText({text : "OFF"})
})

const extensions = 'https://developer.chrome.com/docs/extensions'
const webstore = 'https://developer.chrome.com/docs/webstore'
const github = 'https://github.com'

chrome.action.onClicked.addListener(async (tab) => {
    console.log('Extension : Starting on click listener');
    if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore) || tab.url.startsWith(github)) {
        const prevState = await chrome.action.getBadgeText({tabId : tab.id})
        const nextState = prevState == 'ON' ? 'OFF' : 'ON'

        console.log('Extension : setting badge to ' + nextState);
        await chrome.action.setBadgeText({text: nextState, tabId: tab.id})

        if (nextState == 'ON') {
            console.log('Extension : inserting CSS');
            await chrome.scripting.insertCSS({
                files: ["popup/focus-mode.css"],
                target: {tabId: tab.id},
            })
        } else {
            console.log('Extension : removing CSS');
            await chrome.scripting.removeCSS({
                files: ["popup/focus-mode.css"],
                target: {tabId: tab.id}
            })
        }
    }
    console.log('Extension : Closing on click listener');
})
