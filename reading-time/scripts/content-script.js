const article = document.querySelector("article");

// document.querySelect can return null if nothing matches
if (article) {
    const text = article.textContent
    const wordMatchRegex = /[^\s]+/g // Word match Regular expression

    // Opt 1:
    // const words = text.matchAll(wordMatchRegex); // all word matches
    // const wordCount = [...words].length
    
    // Opt 2: 
    const words = text.match(wordMatchRegex); // all word matches
    const wordCount = words.length

    // Reading speed est
    const readingTime = Math.round(wordCount/200)

    const badge = document.createElement("p")
    badge.classList.add("color-secondary-text", "type--caption")
    badge.textContent = `⏱️ ${readingTime} min read for a dimwit`;

    // Support for API reference docs
    // const docs = article.querySelector("h1");
    // Support for article docs with date
    // const date = article.querySelector("time")?.parentNode;

    article.insertAdjacentElement("afterbegin", badge);
}