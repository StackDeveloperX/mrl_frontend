"use client";
import { JobsProvider } from "./JobsContext";
import { QuotesProvider } from "./QuotesContext";
import { CustomerProvider } from "./CustomerContext";

export default function AppProviders({ children }) {
  return (
    <JobsProvider>
      <QuotesProvider>
        <CustomerProvider>{children}</CustomerProvider>
      </QuotesProvider>
    </JobsProvider>
  );
}
