<script>
  import { onMount } from 'svelte';

  let currencies = { fromCurrency: "USD", toCurrency: "RUB", amount: 0 };
  let exchangeRate = 1;
  $: onCurrency = currencies.fromCurrency

  async function fetchExchangeRate() {
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currencies.fromCurrency}`);
      const data = await response.json();
      exchangeRate = data.rates[currencies.toCurrency] || 1; 
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
    }
  }

  function calculateAmount(event) {
    onCurrency = event.target.name
    currencies.amount = event.target.value;
  }

  $: fromAmount = onCurrency === currencies.toCurrency ? (currencies.amount / exchangeRate).toFixed(3) : currencies.amount;
  $: toAmount = onCurrency === currencies.fromCurrency ? (currencies.amount * exchangeRate).toFixed(3) : currencies.amount;

  onMount(fetchExchangeRate);

  $: {
    if (currencies.fromCurrency || currencies.toCurrency) {
      fetchExchangeRate();
    }
  }
</script>

<div>
  <h1>Конвертер валют</h1>
  <label>Из валюты:
    <select bind:value={currencies.fromCurrency} on:change={fetchExchangeRate}>
      <option value="USD">USD</option>
      <option value="RUB">RUB</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
    </select>
  </label>

  <label>В валюту:
    <select bind:value={currencies.toCurrency} on:change={fetchExchangeRate}>
      <option value="USD">USD</option>
      <option value="RUB">RUB</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
    </select>
  </label>
  <div>
    <label>{currencies.fromCurrency}:
      <input type="number" value={fromAmount} name={currencies.fromCurrency} on:input={calculateAmount}>
    </label>
    <label>{currencies.toCurrency}:
      <input type="number" value={toAmount} name={currencies.toCurrency} on:input={calculateAmount}>
    </label>
  </div>
</div>
