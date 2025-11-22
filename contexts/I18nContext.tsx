import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { translations } from '../translations';

export type Language = 'ar' | 'en';

type TranslationKey = keyof typeof translations;

interface I18nContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');

    const t = useMemo(() => {
        return (key: TranslationKey) => {
            return translations[key]?.[language] ?? key;
        };
    }, [language]);

    const value = { language, setLanguage, t };

    return (
        <I18nContext.Provider value={value}>
            {children}
        </I18nContext.Provider>
    );
};

export const useI18n = () => {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
};
