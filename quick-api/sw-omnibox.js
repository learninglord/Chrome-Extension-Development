console.log("Opened sw-omnibox.js")


// Default API suggestions
chrome.runtime.onInstalled.addListener(({ reason }) => {
    console.log("reason : " + reason)
    if (reason === 'install') {
        console.log("OnInstall adding Api Suggestions")
        chrome.storage.local.set({
            apiSuggestions: ['tabs', 'storage', 'scripting']
        })
    }
    console.log("Not adding apiSuggestions, reason : " + reason)
})


const URL_CHROME_EXTENSIONS_DOC = 'https://developer.chrome.com/docs/extensions/reference/';
const NUMBER_OF_PREVIOUS_SEARCHES = 4;

chrome.omnibox.onInputChanged.addListener(async(input, suggest) => {
    await chrome.omnibox.setDefaultSuggestion({
        description: "Enter Chrome API or choose from past searches" 
    })

    const { apiSuggestions } = await chrome.storage.local.get('apiSuggestions')
    console.log("Input change handler, apiSuggestions : " + apiSuggestions)

    const suggestions = apiSuggestions.map((api) => {
        return {content: api, description:`Open chrom.${api} API`}
    })
    suggest(suggestions)
})

// Open reference API
chrome.omnibox.onInputEntered.addListener((input) => {
    chrome.tabs.create({url : URL_CHROME_EXTENSIONS_DOC + input})
    updateHistory(input)
})

async function updateHistory(input) {
    const { apiSuggestions } = await chrome.storage.local.get('apiSuggestions');
    console.log("Update history handler, current apiSuggestions : " + apiSuggestions)
    apiSuggestions.unshift(input);
    apiSuggestions.splice(NUMBER_OF_PREVIOUS_SEARCHES);

    console.log("Update history handler, new apiSuggestions : " + apiSuggestions)
    return chrome.storage.local.set({ apiSuggestions });
}