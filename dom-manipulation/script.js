let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "Learning never exhausts the mind.", category: "Education" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" }
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

function displayRandomQuote() {
  if (quotes.length === 0) return;
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteDisplay.textContent = `"${quotes[randomIndex].text}" — ${quotes[randomIndex].category}`;

  sessionStorage.setItem("lastQuote", quoteDisplay.textContent);
}

function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) return;

  quotes.push({ text, category });
  localStorage.setItem("quotes", JSON.stringify(quotes));

  populateCategories();
  filterQuotes();

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const categories = [...new Set(quotes.map(q => q.category))];

  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  const savedFilter = localStorage.getItem("selectedCategory");
  if (savedFilter) categoryFilter.value = savedFilter;
}

function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selected);

  const filtered = selected === "all"
    ? quotes
    : quotes.filter(q => q.category === selected);

  quoteDisplay.innerHTML = "";
  filtered.forEach(q => {
    const p = document.createElement("p");
    p.textContent = `"${q.text}" — ${q.category}`;
    quoteDisplay.appendChild(p);
  });
}

newQuoteBtn.addEventListener("click", displayRandomQuote);

populateCategories();
filterQuotes();

const lastQuote = sessionStorage.getItem("lastQuote");
if (lastQuote) quoteDisplay.textContent = lastQuote;
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";
async function fetchServerQuotes() {
  try {
    const response = await fetch(SERVER_URL);
    const data = await response.json();

    const serverQuotes = data.slice(0, 5).map(item => ({
      text: item.title,
      category: "server"
    }));

    resolveConflicts(serverQuotes);
  } catch (error) {
    console.error("Server fetch failed", error);
  }
}

function resolveConflicts(serverQuotes) {
  quotes = serverQuotes;
  saveQuotes();
  displayRandomQuote();

  const status = document.getElementById("syncStatus");
  status.textContent = "Quotes synced from server. Server data applied.";
}

document.getElementById("syncNow").addEventListener("click", () => {
  fetchServerQuotes();
});

setInterval(fetchServerQuotes, 30000);
