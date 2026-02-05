"use client";

import { createContext, useContext, useMemo, useState } from "react";

type LearnContextValue = {
  docTitle?: string;
  docSlug?: string;
  selectionText?: string;
  setDocContext: (next: { docTitle?: string; docSlug?: string }) => void;
  setSelectionText: (text?: string) => void;
};

const LearnContext = createContext<LearnContextValue | null>(null);

export function LearnContextProvider({ children }: { children: React.ReactNode }) {
  const [docTitle, setDocTitle] = useState<string | undefined>(undefined);
  const [docSlug, setDocSlug] = useState<string | undefined>(undefined);
  const [selectionText, setSelectionText] = useState<string | undefined>(undefined);

  const value = useMemo<LearnContextValue>(
    () => ({
      docTitle,
      docSlug,
      selectionText,
      setDocContext: (next) => {
        setDocTitle(next.docTitle);
        setDocSlug(next.docSlug);
      },
      setSelectionText,
    }),
    [docTitle, docSlug, selectionText],
  );

  return <LearnContext.Provider value={value}>{children}</LearnContext.Provider>;
}

export function useLearnContext() {
  const ctx = useContext(LearnContext);
  if (!ctx) {
    throw new Error("useLearnContext must be used within LearnContextProvider");
  }
  return ctx;
}

