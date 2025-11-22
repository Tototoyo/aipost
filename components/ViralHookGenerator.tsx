
import React, { useState } from 'react';
import { generateViralHooks } from '../services/geminiService';
import { BoltIcon, SpinnerIcon, ErrorIcon, CopyIcon, CheckIcon } from './icons';
import { useI18n } from '../contexts/I18nContext';
import type { ViralHooks } from '../types';

interface ViralHookGeneratorProps {
    subject: string;
}

const ViralHookGenerator: React.FC<ViralHookGeneratorProps> = ({ subject }) => {
    const { t, language } = useI18n();
    const [hooks, setHooks] = useState<ViralHooks | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [copiedHook, setCopiedHook] = useState<string | null>(null);

    const handleGenerateHooks = async () => {
        if (!subject.trim()) return;
        setIsLoading(true);
        setError(null);
        try {
            const result = await generateViralHooks(subject, language);
            setHooks(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : t('unexpectedError'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedHook(text);
        setTimeout(() => setCopiedHook(null), 2000);
    };

    const renderHookCategory = (titleKey: string, items: string[]) => (
        <div className="bg-brand-dark p-4 rounded-lg mb-3">
            <h4 className="text-brand-orange font-semibold mb-2 text-sm uppercase tracking-wider">{t(titleKey as any)}</h4>
            <ul className="space-y-2">
                {items.map((hook, idx) => (
                    <li key={idx} className="flex justify-between items-start gap-2 group">
                        <span className="text-gray-300 text-sm pt-1">{hook}</span>
                        <button 
                            onClick={() => handleCopy(hook)}
                            className="text-gray-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                            aria-label="Copy hook"
                        >
                            {copiedHook === hook ? <CheckIcon /> : <CopyIcon />}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="bg-brand-medium p-6 rounded-xl shadow-lg h-full flex flex-col">
            <div className="text-center mb-6">
                 <h3 className="text-xl font-bold text-brand-light flex items-center justify-center gap-2">
                    <BoltIcon />
                    <span>{t('viralHooksTitle')}</span>
                </h3>
                <p className="text-sm text-gray-400 mt-2">
                    {t('viralHooksDescription')}
                </p>
            </div>

            {isLoading && (
                <div className="flex justify-center py-8">
                    <SpinnerIcon />
                </div>
            )}

            {error && (
                <div className="bg-red-900/50 text-red-300 p-3 rounded-lg text-center my-4 text-sm flex items-center justify-center gap-2">
                    <ErrorIcon /> {error}
                </div>
            )}

            {!isLoading && hooks && (
                <div className="space-y-2 animate-slide-in-right">
                    {renderHookCategory('curiosityHooks', hooks.curiosity)}
                    {renderHookCategory('controversialHooks', hooks.controversial)}
                    {renderHookCategory('storyHooks', hooks.story)}
                    {renderHookCategory('emotionalHooks', hooks.emotional)}
                    {renderHookCategory('shortHooks', hooks.short)}
                </div>
            )}

            <div className="mt-auto pt-4">
                 <button
                    onClick={handleGenerateHooks}
                    disabled={isLoading || !subject.trim()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
                    title={!subject.trim() ? t('subjectRequired') : ''}
                >
                    {isLoading ? (
                        <>
                            <SpinnerIcon />
                            {t('generatingHooks')}
                        </>
                    ) : (
                        <>
                            <BoltIcon />
                            {t('giveMeHooks')}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ViralHookGenerator;
