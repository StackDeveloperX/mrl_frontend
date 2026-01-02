"use client";
import { createContext, useEffect, useState } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { getTokens } from "@/lib/apiClient";
import axios from "axios";

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const token = getTokens().access;
  const [client, setClient] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const listClients = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/clients`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClient(response.data.data);
     // console.log("client response", response.data.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listClients();
  }, []);

  return (
    <CustomerContext.Provider value={{ client, error, loading, listClients }}>
      {children}
    </CustomerContext.Provider>
  );
};
