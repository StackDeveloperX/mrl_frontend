"use client";

import { getTokens } from "@/lib/apiClient";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const QuotesContext = createContext();

export const QuotesProvider = ({ children }) => {
  const token = getTokens().access;
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchQuotes = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.get("http://abc.mrl.local/api/v1/quotes", {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      });
      console.log("quotes", response.data);

      setQuotes(response.data.data);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <QuotesContext.Provider value={{ quotes, fetchQuotes, loading, error }}>
      {children}
    </QuotesContext.Provider>
  );
};
