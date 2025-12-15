let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "Believe in yourself", category: "Motivation" },
  { text: "Practice makes perfect", category: "Education" },
  { text: "Consistency is key", category: "Success" }
];

let currentCategory = localStorage.getItem("selectedCategory") || "all";

const quoteDisplay = document.getElementById("quoteDisplay");
const categoryFilter = document.getElementById("categoryFilter");
const notification = document.getElementById("notification");

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function showRandomQuote() {
  const filteredQuotes =
    currentCategory === "all"
      ? quotes
      : quotes.filter(q => q.category === currentCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  quoteDisplay.textContent = `"${filteredQuotes[randomIndex].text}" — ${filteredQuotes[randomIndex].category}`;

  sessionStorage.setItem("lastQuote", quoteDisplay.textContent);
}

document.getElementById("newQuote").addEventListener("click", showRandomQuote);

function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please enter both quote and category");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();
  populateCategories();

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  notify("New quote added!");
}

function populateCategories() {
  const categories = [...new Set(quotes.map(q => q.category))];

  categoryFilter.innerHTML =
    '<option value="all">All Categories</option>';

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  categoryFilter.value = currentCategory;
}

function filterQuotes() {
  currentCategory = categoryFilter.value;
  localStorage.setItem("selectedCategory", currentCategory);
  showRandomQuote();
}

function exportToJsonFile() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const importedQuotes = JSON.parse(e.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    notify("Quotes imported successfully!");
  };
  reader.readAsText(event.target.files[0]);
}

const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";

async function fetchQuotesFromServer() {
  const response = await fetch(SERVER_URL);
  const serverData = await response.json();

  quotes = serverData.slice(0, 5).map(post => ({
    text: post.title,
    category: "Server"
  }));

  saveQuotes();
  populateCategories();
  notify("Quotes synced from server");
}

async function syncQuotes() {
  await fetch(SERVER_URL, {
    method: "POST",
    body: JSON.stringify(quotes),
    headers: { "Content-Type": "application/json" }
  });
}

setInterval(fetchQuotesFromServer, 30000);

function notify(message) {
  notification.textContent = message;
  setTimeout(() => (notification.textContent = ""), 3000);
}

populateCategories();
filterQuotes();
