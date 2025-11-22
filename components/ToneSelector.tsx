import React from 'react';
import { BookOpenIcon, LightbulbIcon, MegaphoneIcon } from './icons';
import { useI18n } from '../contexts/I18nContext';

interface ToneSelectorProps {
    selectedTone: string;
    onToneChange: (tone: string) => void;
}

const TONES = [
    { name: 'Informative', key: 'informative' as const, icon: <BookOpenIcon /> },
    { name: 'Marketing', key: 'marketing' as const, icon: <MegaphoneIcon /> },
    { name: 'Creative', key: 'creative' as const, icon: <LightbulbIcon /> },
];

const ToneSelector: React.FC<ToneSelectorProps> = ({ selectedTone, onToneChange }) => {
    const { t } = useI18n();

    return (
        <div>
            <label className="block text-center text-sm font-medium text-gray-400 mb-2">
                {t('postToneLabel')}
            </label>
            <div className="grid grid-cols-3 gap-2 rounded-lg bg-brand-medium p-1">
                {TONES.map(({ name, key, icon }) => (
                    <button
                        key={name}
                        onClick={() => onToneChange(name)}
                        className={`
                            flex items-center justify-center gap-2 w-full px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-orange
                            ${selectedTone === name
                                ? 'bg-gradient-to-r from-brand-orange to-brand-green text-white shadow'
                                : 'bg-brand-medium text-gray-300 hover:bg-gray-700/50'
                            }
                        `}
                        aria-pressed={selectedTone === name}
                    >
                        {icon}
                        <span className="hidden sm:inline">{t(key)}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ToneSelector;
