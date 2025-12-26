"use client";

import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { getTokens } from "../lib/apiClient";

export const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const token = getTokens().access;
  const [jobs, setJobs] = useState([]);
  const [loading, setLoadind] = useState(false);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    setError(null);
    setLoadind(true);
    try {
      const response = await axios.get("http://abc.mrl.local/api/v1/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("jobs", response.data.data);
      setJobs(response.data.data);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoadind(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <JobsContext.Provider value={{ jobs, fetchJobs,loading,error }}>
      {children}
    </JobsContext.Provider>
  );
};
