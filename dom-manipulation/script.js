let quotes = [
  { text: "Success is not final, failure is not fatal.", category: "Inspiration },
  { text: "The only limit to our realization tomorrow is our doubts today.", category: "Motivation" },
  { text: "Believe you can and you're halfway there.", category: "Confidence" }
];

function displayRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  quoteDisplay.textContent = `"${randomQuote.text}" — ${randomQuote.category}`;
}

function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (newText === "" || newCategory === "") {
    alert("Please fill in both fields");
    return;
  }

  quotes.push({ text: newText, category: newCategory });

  textInput.value = "";
  categoryInput.value = "";

  displayRandomQuote();
}

document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

