const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("newQuoteBtn");

function getQuote() {
  quoteText.textContent = "Loading...";
  authorText.textContent = "";

  fetch("quotes.json")
    .then(response => response.json())
    .then(data => {
      const i = Math.floor(Math.random() * data.length);
      quoteText.textContent = `"${data[i].q}"`;
      authorText.textContent = `— ${data[i].a}`;
    })
    .catch(error => {
      quoteText.textContent = "Sorry, couldn't load quote.";
      console.error("Fetch error:", error);
    });
}

newQuoteBtn.addEventListener("click", getQuote);
getQuote();
