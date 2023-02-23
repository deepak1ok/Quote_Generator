const qouteContainer = document.getElementById('quote-container');
const qouteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const tweetBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];


function loading() {
    loader.hidden = false;
    qouteContainer.hidden = true;
}

function complete() {
    qouteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote);

    if (!quote.author) {
        authorText.textContent = 'unknown';
    } else {
        authorText.textContent = quote.author;
    }

    if (quote.text.length > 60) {
        qouteText.classList.add('long-quote');
    } else {
        qouteText.classList.remove('long-quote');
    }
    qouteText.textContent = quote.text;
    complete();
}

//  Get Quote from Api
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // console.log(apiQuotes);
        newQuote();
    } catch (error) {
        // catch the error
    }
}

function tweetQuote() {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${qouteText.textContent} - ${authorText.textContent}`;
    window.open(tweetUrl, '_blank')
}
newQuoteBtn.addEventListener('click', getQuotes);
tweetBtn.addEventListener('click', tweetQuote);

getQuotes();