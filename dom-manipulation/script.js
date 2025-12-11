let quotes = [
  { text: "Success is not final, failure is not fatal.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "The purpose of our lives is to be happy.", category: "Happiness" }
];

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `
    <p><strong>Quote:</strong> ${quote.text}</p>
    <p><strong>Category:</strong> ${quote.category}</p>
  `;
}

function addQuote() {
  const text = document.getElementById("newQuoteText").value;
  const category = document.getElementById("newQuoteCategory").value;

  if (text === "" || category === "") {
    alert("Please fill in both fields");
    return;
  }

  quotes.push({ text, category });

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("Quote added successfully!");
}

document.getElementById("newQuote").addEventListener("click", showRandomQuote);
