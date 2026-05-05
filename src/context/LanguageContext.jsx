import { useState, useMemo } from 'react';
import { LanguageContext } from './createContext';
import en from '../locales/en.json';
import ro from '../locales/ro.json';
import ru from '../locales/ru.json'

const translations = { en, ro, ru };

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState(localStorage.getItem('app_lang') || 'en');

  const value = useMemo(() => ({
    locale,
    toggleLanguage: (lang) => {
      if (translations[lang]) { 
        setLocale(lang);
        localStorage.setItem('app_lang', lang);
      }
    },
    t: (key) => translations[locale][key] || key
  }), [locale]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};