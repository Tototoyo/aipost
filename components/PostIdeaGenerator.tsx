
import React, { useState, useCallback } from 'react';
import { generatePostIdea } from '../services/geminiService';
import { LightBulbIcon, SpinnerIcon, ErrorIcon } from './icons';
import { useI18n } from '../contexts/I18nContext';

const PostIdeaGenerator: React.FC = () => {
    const { t, language } = useI18n();
    const [idea, setIdea] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateIdea = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const newIdea = await generatePostIdea(language);
            setIdea(newIdea);
        } catch (err) {
            setError(err instanceof Error ? err.message : t('failedToGenerateIdea'));
        } finally {
            setIsLoading(false);
        }
    }, [language, t]);

    return (
        <div className="bg-surface/50 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-lg h-full flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500">
                        <LightBulbIcon />
                    </div>
                    <h3 className="text-lg font-bold text-white">
                        {t('postIdeaGeneratorTitle')}
                    </h3>
                </div>
                
                <p className="text-sm text-text-muted mb-6 leading-relaxed">
                    {t('postIdeaGeneratorDescription')}
                </p>
                
                {isLoading && (
                     <div className="flex justify-center items-center py-8 text-primary">
                        <SpinnerIcon />
                    </div>
                )}
                
                {!isLoading && idea && (
                    <div className="bg-surfaceHighlight border border-border p-5 rounded-xl mb-6 animate-fade-in">
                        <p className="text-gray-200 text-lg font-medium leading-relaxed">"{idea}"</p>
                    </div>
                )}
                
                 {!isLoading && error && (
                    <div className="bg-red-500/10 text-red-400 p-4 rounded-xl mb-6 text-sm flex items-center gap-3">
                       <ErrorIcon /> {error}
                    </div>
                )}
            </div>
            <button
                onClick={handleGenerateIdea}
                disabled={isLoading}
                className="w-full py-3 px-4 bg-surfaceHighlight hover:bg-border text-white text-sm font-semibold rounded-xl transition-colors duration-200 disabled:opacity-50 border border-border"
            >
                 {isLoading ? t('generatingIdea') : t('generateNewIdea')}
            </button>
        </div>
    );
};

export default PostIdeaGenerator;
