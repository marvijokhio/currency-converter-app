import './App.css';
import CurrencyInput from './currencyInput';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayRate from './displayRate';

function App() {

  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('EUR');
  const [conversion_rates, setRates] = useState([]);

  useEffect(() => {
    axios.get('https://v6.exchangerate-api.com/v6/ae5a75bf6a9a77d543aa35ff/latest/USD')
      .then(response => {
        setRates(response.data.conversion_rates);
      })
  }, []);


  useEffect(() => {
    if (!!conversion_rates) {
      function init() {
        handleAmount1Change(1);
      }
      init();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversion_rates]);



  function format(number) {
    return number.toFixed(4);
  }

  function handleAmount1Change(amount1) {
    setAmount2(format(amount1 * conversion_rates[currency2] / conversion_rates[currency1]));
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(format(amount1 * conversion_rates[currency2] / conversion_rates[currency1]));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(format(amount2 * conversion_rates[currency1] / conversion_rates[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(format(amount2 * conversion_rates[currency1] / conversion_rates[currency2]));
    setCurrency2(currency2);
  }

  return (
    <div>
      <h1>Currency Converter</h1>
      <CurrencyInput
        onAmountChange={handleAmount1Change}
        onCurrencyChange={handleCurrency1Change}
        currencies={Object.keys(conversion_rates)}
        amount={amount1}
        currency={currency1} />
      <CurrencyInput
        onAmountChange={handleAmount2Change}
        onCurrencyChange={handleCurrency2Change}
        currencies={Object.keys(conversion_rates)}
        amount={amount2}
        currency={currency2} />
        <div>
          <h2>Conversion Rate</h2>
          <DisplayRate conv_rate={"1 USD = "+ conversion_rates[currency2]+" "+ currency2 }/>
        </div>
    </div>)
}

export default App;
