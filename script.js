
const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader")
const clickSound = new Audio('sound/button-202966.mp3')

// show loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true
    
}

// hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
    
}

let apiQuotes = [];
// show loading

// show new quote
function newQuote(){

    loading();

    // pick a rondom quote
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    // if author dident unknown
    if(!quote.author){
        authorText.textContent = "unknown"

    }else{
        authorText.textContent = quote.author;
    }

    // quote lenght
    if(quote.content.length > 100){
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote')
    }
    // set the quote, hide the loader
    quoteText.textContent = quote.content;
    complete()
}

// get quotes from api
async function getQuotes() {
    loading()
    const apiUrl = 'https://api.quotable.io/quotes?limit=30';
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        apiQuotes = data.results;
        // console.log(apiQuotes.results[10].content);
        // console.log(apiQuotes.results[10].author);
        newQuote();
    }catch(error){
        console.error('error fetching quotes:', error);
        quoteText.textContent = "sorry, failed to load quotes. please try again.";
        authorText.textContent = "";
        complete();
        // catch error here
    }
    
}

// to post
function postQuote() {
    const postUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(postUrl, '_blank')   
}

// event listeners
twitterBtn.addEventListener("click", postQuote)
// clicksound
newQuoteBtn.addEventListener("click", ()=>{
    playClickSound()
    newQuote();
})
// error handling
clickSound.addEventListener('error', function () {
    console.warn('could not load sound file');
    
});
function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(error =>{
        console.warn('could not play sound:', error)
    });
    
}
// to copy
function copyQuote() {
    navigator.clipboard.writeText(`${quoteText.textContent}- ${authorText.textContent}`)
    alert("copy success")
    
}

getQuotes();


