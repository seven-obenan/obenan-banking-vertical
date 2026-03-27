import React, { createContext, useContext, ReactNode } from "react";

type Language = "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const language: Language = "en";
  const setLanguage = () => {};
  const t = (key: string): string => key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    return { language: "en" as const, setLanguage: () => {}, t: (key: string) => key };
  }
  return context;
};
