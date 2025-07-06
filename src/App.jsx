import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetch('https://v6.exchangerate-api.com/v6/5c8f8a78dec3dbe5189b783f/latest/USD')
      .then(response => response.json())
      .then(data => {
        setCurrencies(Object.keys(data.conversion_rates));
        setExchangeRate(data.conversion_rates[toCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetch(`https://v6.exchangerate-api.com/v6/5c8f8a78dec3dbe5189b783f/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => setExchangeRate(data.conversion_rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleReset = () => {
    setAmount(1);
    setFromCurrency('USD');
    setToCurrency('EUR');
  };

  return (
    <div className="container">
      <div className="converter-box">
        <h1>Currency Converter</h1>
        <div className="input-group">
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            min="0"
          />
        </div>

        <div className="currency-row">
          <div className="currency-group">
            <label>From:</label>
            <select value={fromCurrency} onChange={handleFromCurrencyChange}>
              {currencies.map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <button className="swap-button" onClick={handleSwapCurrencies}>
            ⇄ Swap
          </button>

          <div className="currency-group">
            <label>To:</label>
            <select value={toCurrency} onChange={handleToCurrencyChange}>
              {currencies.map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="result-group">
          <label>Result:</label>
          <input
            type="number"
            value={(amount * exchangeRate).toFixed(2)}
            readOnly
            className="result-input"
          />
        </div>

        <div className="button-group">
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>

        <div className="rate-info">
          <p>Exchange Rate: 1 {fromCurrency} = {exchangeRate?.toFixed(4)} {toCurrency}</p>
        </div>
      </div>
    </div>
  );
}

export default App;