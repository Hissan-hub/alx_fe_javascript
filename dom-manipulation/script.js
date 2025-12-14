let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "Learning never stops", category: "Education" },
  { text: "Code is poetry", category: "Technology" }
];

const API_URL = "https://jsonplaceholder.typicode.com/posts";
const quoteDisplay = document.getElementById("quoteDisplay");
const syncStatus = document.getElementById("syncStatus");

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function displayRandomQuote() {
  if (quotes.length === 0) return;
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteDisplay.textContent = quotes[randomIndex].text;
}

function addQuote() {
  const text = document.getElementById("newQuoteText").value;
  const category = document.getElementById("newQuoteCategory").value;

  if (!text || !category) return alert("Fill in all fields");

  quotes.push({ text, category });
  saveQuotes();
  displayRandomQuote();
}

async function fetchQuotesFromServer() {
  const response = await fetch(API_URL);
  const data = await response.json();

  return data.slice(0, 5).map(item => ({
    text: item.title,
    category: "Server"
  }));
}

async function postQuoteToServer(quote) {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quote)
  });
}

async function syncQuotes() {
  syncStatus.textContent = "Syncing with server...";

  try {
    const serverQuotes = await fetchQuotesFromServer();

    quotes = serverQuotes;
    saveQuotes();

    syncStatus.textContent = "Quotes synced. Server data applied.";
  } catch (error) {
    syncStatus.textContent = "Sync failed.";
  }
}

setInterval(syncQuotes, 30000);


document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
document.getElementById("syncBtn").addEventListener("click", syncQuotes);


displayRandomQuote();
