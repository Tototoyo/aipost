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
        <div className="bg-brand-medium p-6 rounded-xl shadow-lg h-full flex flex-col justify-between">
            <div>
                <h3 className="text-xl font-bold text-center mb-2 text-brand-light flex items-center justify-center gap-2">
                    <LightBulbIcon />
                    <span>{t('postIdeaGeneratorTitle')}</span>
                </h3>
                <p className="text-sm text-gray-400 text-center mb-4">
                    {t('postIdeaGeneratorDescription')}
                </p>
                {isLoading && (
                     <div className="flex justify-center items-center h-24">
                        <SpinnerIcon />
                    </div>
                )}
                {!isLoading && idea && (
                    <div className="bg-brand-dark p-4 rounded-lg text-center my-4">
                        <p className="text-gray-300">{idea}</p>
                    </div>
                )}
                 {!isLoading && error && (
                    <div className="bg-red-900/50 text-red-300 p-3 rounded-lg text-center my-4 text-sm flex items-center justify-center gap-2">
                       <ErrorIcon /> {error}
                    </div>
                )}
            </div>
            <button
                onClick={handleGenerateIdea}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 mt-4 px-4 py-2 bg-gray-700 text-gray-300 text-sm font-semibold rounded-lg hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50"
            >
                 {isLoading ? t('generatingIdea') : t('generateNewIdea')}
            </button>
        </div>
    );
};

export default PostIdeaGenerator;
