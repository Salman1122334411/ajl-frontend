import React, { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext();

const SUPPORTED_CURRENCIES = [
  { code: "USD", symbol: "$" },
  { code: "CHF", symbol: "CHF" },
];

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [rate, setRate] = useState(1); // 1 USD = 1 USD by default
  const [symbol, setSymbol] = useState("$");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Currency changed to:", currency);
    const fetchRate = async () => {
      setLoading(true);
      if (currency === "USD") {
        setRate(1);
        setSymbol("$");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(
          `https://open.er-api.com/v6/latest/USD`
        );
        const data = await res.json();
        console.log("API response:", data);
        if (data && data.result === "success" && data.rates && data.rates["CHF"]) {
          setRate(data.rates["CHF"]);
          setSymbol("CHF");
          console.log("Fetched rate:", data.rates["CHF"]);
        } else {
          throw new Error(data.error || "Invalid API response");
        }
      } catch (e) {
        console.error("Error fetching exchange rate:", e);
        setRate(1);
        setSymbol("$");
      } finally {
        setLoading(false);
      }
    };
    fetchRate();
  }, [currency]);

  useEffect(() => {
    console.log("CurrencyProvider render:", { currency, rate, symbol });
  });

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rate, symbol, loading, SUPPORTED_CURRENCIES }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext); 