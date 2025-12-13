let quotes = [
  { text: "Learning never exhausts the mind.", category: "Education" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" }
];

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById('quoteDisplay').textContent =
    `"${quote.text}" — ${quote.category}`;

  sessionStorage.setItem('lastQuote', JSON.stringify(quote));
}

function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');

  if (!textInput.value || !categoryInput.value) {
    alert('Please fill in both fields');
    return;
  }

  quotes.push({
    text: textInput.value,
    category: categoryInput.value
  });

  saveQuotes();

  textInput.value = '';
  categoryInput.value = '';
}

function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const importedQuotes = JSON.parse(e.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert('Quotes imported successfully!');
  };
  reader.readAsText(event.target.files[0]);
}

loadQuotes();

document
  .getElementById('newQuote')
  .addEventListener('click', displayRandomQuote);
