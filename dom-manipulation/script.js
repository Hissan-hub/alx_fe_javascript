let quotes = [
  { text: "Success is not final, failure is not fatal.", category: "Success" }
];

function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteDisplay.textContent = `${quotes[randomIndex].text} — ${quotes[randomIndex].category}`;
}

function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (newText === "" || newCategory === "") {
    alert("Please enter both a quote and a category.");
    return;
  }

  quotes.push({ text: newText, category: newCategory });

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.textContent = `New quote added!`;

  textInput.value = "";
  categoryInput.value = "";
}

document.getElementById("newQuote").addEventListener("click", showRandomQuote);
