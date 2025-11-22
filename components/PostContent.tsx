
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { CopyIcon, CheckIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';
import { useI18n } from '../contexts/I18nContext';

interface PostContentProps {
    isLoading: boolean;
    captions: string[] | null;
    hashtags: string | null;
}

const PostContent: React.FC<PostContentProps> = ({ isLoading, captions, hashtags }) => {
    const { t, language } = useI18n();
    const [isCopied, setIsCopied] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentCaption = captions ? captions[currentIndex] : null;
    const fullText = (currentCaption && hashtags) ? `${currentCaption}\n\n${hashtags}` : '';
    const totalCaptions = captions ? captions.length : 0;

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
    };

    const handleNext = () => {
        if (totalCaptions > 0) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCaptions);
        }
    };

    const handlePrev = () => {
        if (totalCaptions > 0) {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + totalCaptions) % totalCaptions);
        }
    };


    useEffect(() => {
        if (isCopied) {
            const timer = setTimeout(() => setIsCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isCopied]);


    useEffect(() => {
        // Reset state when new content is generated
        setIsCopied(false);
        setCurrentIndex(0);
    }, [captions, hashtags]);


    return (
        <div className="bg-brand-medium p-6 rounded-xl shadow-lg h-full flex flex-col">
            {isLoading && (
                <div className="space-y-4">
                    <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded w-full mt-6 animate-pulse"></div>
                </div>
            )}
            {!isLoading && captions && captions.length > 0 && hashtags && (
                <div className="flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4 gap-2">
                         <h2 className="text-2xl font-bold text-brand-light">{t('postSuggestions')}</h2>
                         <div className="flex gap-2 flex-shrink-0">
                            <button 
                                onClick={() => handleCopy(fullText)}
                                className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors duration-200 bg-gray-700 hover:bg-gray-600 text-brand-light disabled:opacity-50"
                                disabled={!fullText}
                            >
                                {isCopied ? <CheckIcon /> : <CopyIcon />}
                                {isCopied ? t('copied') : t('copy')}
                            </button>
                         </div>
                    </div>
                    
                    <div className="relative flex-grow mb-4 min-h-[100px]">
                        <p className="text-gray-300 whitespace-pre-wrap">{currentCaption}</p>
                    </div>

                    {totalCaptions > 1 && (
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <button onClick={handlePrev} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors text-gray-300 hover:text-white" aria-label={t('previousSuggestion')}>
                                {language === 'ar' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </button>
                            <span className="font-mono text-sm text-gray-400 select-none">{currentIndex + 1} / {totalCaptions}</span>
                            <button onClick={handleNext} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors text-gray-300 hover:text-white" aria-label={t('nextSuggestion')}>
                                {language === 'ar' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </button>
                        </div>
                    )}

                    <p className="text-brand-orange mt-auto text-sm font-medium break-words pt-4 border-t border-gray-700/50">{hashtags}</p>
                </div>
            )}
            {!isLoading && (!captions || captions.length === 0) && (
                <div className="text-center text-gray-500 flex-grow flex flex-col justify-center items-center">
                    <h2 className="text-2xl font-bold text-gray-400 mb-2">{t('postContentTitle')}</h2>
                    <p>{t('postContentPlaceholder')}</p>
                </div>
            )}
        </div>
    );
};

export default PostContent;
