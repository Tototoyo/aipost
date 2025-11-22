
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
        <div className="w-full">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-3 ml-1">
                {t('postToneLabel')}
            </label>
            <div className="grid grid-cols-3 gap-3">
                {TONES.map(({ name, key, icon }) => (
                    <button
                        key={name}
                        onClick={() => onToneChange(name)}
                        className={`
                            flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition-all duration-200 border
                            ${selectedTone === name
                                ? 'bg-primary/10 text-primary border-primary'
                                : 'bg-surfaceHighlight text-text-muted border-transparent hover:bg-surfaceHighlight/80'
                            }
                        `}
                        aria-pressed={selectedTone === name}
                    >
                         <div className={selectedTone === name ? 'text-primary' : 'text-gray-500'}>
                             {icon}
                        </div>
                        <span className="text-xs font-medium">{t(key)}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ToneSelector;
