/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import React, { useState, useEffect } from "react";

const App = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("INR");
  const [amount, setAmount] = useState(1);
  const [forexData, setForexData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    fetchForexData();
  }, [baseCurrency, targetCurrency]); // Fetch data when base or target currency changes

  const fetchForexData = async () => {
    setLoading(true);

    try {
      const apiKey = "4e4e5385edbd3739417a3d6d64ab484c"; // API key
      const response = await fetch(
        `https://api.forexrateapi.com/v1/latest?base=${baseCurrency}&currencies=${targetCurrency}`,
        {
          headers: {
            "X-Api-Key": apiKey,
          },
        }
      );
      const data = await response.json();
      setForexData(data.rates);
    } catch (error) {
      console.error("Error fetching forex data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (forexData) {
      const rate = forexData[targetCurrency];
      setConvertedAmount((amount * rate).toFixed(2));
    }
  }, [amount, forexData, targetCurrency]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchForexData();
  };

  return (
    <div className="forex-container">
      <h1>Forex Converter</h1>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label>
            Amount in:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <select
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="INR">INR</option>
              <option value="JPY">JPY</option>
              {/* Add more currencies as needed */}
            </select>
          </label>
        </div>
        <div className="input">
          <label>
            Convert to:
            <select
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="JPY">JPY</option>
              {/* Add more currencies as needed */}
            </select>
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Convert"}
        </button>
      </form>
      {convertedAmount !== null && (
        <div>
          <p>
            Converted Amount:{" "}
            <strong>
              {convertedAmount} {targetCurrency}
            </strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
