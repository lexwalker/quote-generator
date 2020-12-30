const quoteContainer = document.getElementById("quoteContainer");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("newQuote");
const loader = document.getElementById("loader");

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote From API
async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=ru&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // If Author is blank, add 'Unknown'
    data.quoteAuthor === ""
      ? (quoteAuthor.innerHTML = "Unknown")
      : (quoteAuthor.innerHTML = data.quoteAuthor);
    // Reduce font size for long quotes
    data.quoteText.length > 100
      ? quoteText.classList.add("long-quote")
      : quoteText.classList.remove("long-quote");
    quoteText.innerHTML = data.quoteText;
  } catch (err) {
    getQuote();
  }
  // Stop Loader
  hideLoadingSpinner();
}

function postingQuote() {
  const quote = quoteText.innerHTML;
  const author = quoteAuthor.innerHTML;
  const urlShare = location.href;
  const vkUrl = `https://vk.com/share.php?url=${urlShare}&comment="${quote} - ${author}"`;
  // Open window for posting
  if (vkUrl) {
    // Set Window size
    var width = 800,
      height = 500;
    // Center window
    var left = (window.screen.width - width) / 2;
    var top = (window.screen.height - height) / 2;
    // Open window
    socialWindow = window.open(
      vkUrl,
      "share_window",
      "height=" + height + ",width=" + width + ",top=" + top + ",left=" + left
    );
    // Set Focus on this window
    socialWindow.focus();
  }
}

// Event Listeners
twitterBtn.addEventListener("click", postingQuote);
newQuoteBtn.addEventListener("click", getQuote);

// On Load
getQuote();
