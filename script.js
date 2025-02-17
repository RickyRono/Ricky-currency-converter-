// API Key from ExchangeRate-API (Sign up at https://www.exchangerate-api.com/ to get your key)
const API_KEY = 'fa4d5f927e24bf316a5d4615'; // Replace with your API key
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

// DOM Elements
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from');
const toCurrency = document.getElementById('to');
const convertBtn = document.getElementById('convert-btn');
const resultText = document.getElementById('result-text');

let currencies = [];

// Fetch Currencies
async function fetchCurrencies() {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    currencies = Object.keys(data.conversion_rates);
    populateDropdowns();
  } catch (error) {
    console.error('Error fetching currencies:', error);
  }
}

// Populate Dropdowns
function populateDropdowns() {
  currencies.forEach(currency => {
    const option1 = document.createElement('option');
    option1.value = currency;
    option1.textContent = currency;
    fromCurrency.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = currency;
    option2.textContent = currency;
    toCurrency.appendChild(option2);
  });

  // Set default values
  fromCurrency.value = 'USD';
  toCurrency.value = 'EUR';
}

// Convert Currency
async function convertCurrency() {
  const amount = amountInput.value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || isNaN(amount)) {
    alert('Please enter a valid amount.');
    return;
  }

  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}/${amount}`);
    const data = await response.json();
    const result = data.conversion_result.toFixed(2);
    resultText.textContent = `Result: ${amount} ${from} = ${result} ${to}`;
  } catch (error) {
    console.error('Error converting currency:', error);
  }
}

// Event Listeners
convertBtn.addEventListener('click', convertCurrency);

// Initialize
fetchCurrencies();