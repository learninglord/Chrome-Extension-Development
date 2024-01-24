chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed")
    chrome.action.setBadgeText({text : "ON"})
})

const mangaRegex = /manga|manhua/i

chrome.webNavigation.onCompleted.addListener(function (details) {
    // Run your script here on any new page
    console.log("New page loaded: ", details.url);
  
    if (mangaRegex.test(details.url)) {
        console.log("Zooming")
        chrome.tabs.setZoom(details.tabId, 1.5)
    }
    // Example: Display an alert on the new page
    // chrome.tabs.executeScript(details.tabId, {
    //   code: 'alert("Hello from the extension!");'
    // });
  });

  
chrome.action.onClicked.addListener(async (tab) => {
    console.log("Opening OnClick listener")

    if (mangaRegex.test(tab.url)) {
        console.log("Matched manga regex")
        const prevState = await chrome.action.getBadgeText({tabId: tab.id})
        const nextState = prevState === "OFF" ? "ON" : "OFF"

        console.log('Extension : setting badge to ' + nextState);
        await chrome.action.setBadgeText({text: nextState, tabId: tab.id})

        if (nextState === "ON") {
            // console.log("Inserting CSS")
            // chrome.scripting.insertCSS({
            //     files: ["popup/manga.css"],
            //     target: {tabId: tab.id}
            // })
            console.log("Zooming")
            chrome.tabs.setZoom(tab.id, 1.5)
        } else {
            // console.log("Removing CSS")
            // chrome.scripting.removeCSS({
            //     files: ["popup/manga.css"],
            //     target: {tabId: tab.id}
            // })
            console.log("Un Zooming")
            chrome.tabs.setZoom(tab.id, 1)
        }
        console.log("Zoom factor : " + chrome.tabs.getZoom(tab.id))
    }

    console.log("Closing OnClick listener")
})