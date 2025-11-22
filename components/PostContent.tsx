
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { CopyIcon, CheckIcon, ChevronLeftIcon, ChevronRightIcon, DocumentTextIcon } from './icons';
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
        <div className="bg-surface/50 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-lg h-full flex flex-col min-h-[400px]">
            {isLoading && (
                <div className="space-y-6 animate-pulse">
                    <div className="h-6 bg-surfaceHighlight rounded w-1/3"></div>
                    <div className="space-y-3">
                        <div className="h-4 bg-surfaceHighlight rounded w-full"></div>
                        <div className="h-4 bg-surfaceHighlight rounded w-full"></div>
                        <div className="h-4 bg-surfaceHighlight rounded w-5/6"></div>
                    </div>
                     <div className="h-4 bg-surfaceHighlight rounded w-full mt-8"></div>
                </div>
            )}
            {!isLoading && captions && captions.length > 0 && hashtags && (
                <div className="flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
                         <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            {t('postSuggestions')}
                             <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">{currentIndex + 1}/{totalCaptions}</span>
                         </h2>
                         <div className="flex gap-2">
                            <button 
                                onClick={() => handleCopy(fullText)}
                                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 border
                                    ${isCopied 
                                        ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                                        : 'bg-surfaceHighlight text-text-muted hover:text-white border-border hover:border-gray-500'}
                                `}
                                disabled={!fullText}
                            >
                                {isCopied ? <CheckIcon /> : <CopyIcon />}
                                {isCopied ? t('copied') : t('copy')}
                            </button>
                         </div>
                    </div>
                    
                    <div className="relative flex-grow mb-8">
                        <p className="text-text-main text-lg leading-relaxed whitespace-pre-wrap font-light">{currentCaption}</p>
                    </div>
                    
                    <div className="bg-surfaceHighlight/30 p-4 rounded-xl border border-border mb-6">
                        <p className="text-primary text-sm font-medium break-words leading-relaxed">{hashtags}</p>
                    </div>

                    {totalCaptions > 1 && (
                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                            <button onClick={handlePrev} className="p-3 rounded-full hover:bg-surfaceHighlight text-text-muted hover:text-white transition-colors" aria-label={t('previousSuggestion')}>
                                {language === 'ar' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </button>
                            
                             <div className="flex gap-1.5">
                                {captions.map((_, idx) => (
                                    <div 
                                        key={idx} 
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-primary w-6' : 'bg-border'}`}
                                    ></div>
                                ))}
                            </div>

                            <button onClick={handleNext} className="p-3 rounded-full hover:bg-surfaceHighlight text-text-muted hover:text-white transition-colors" aria-label={t('nextSuggestion')}>
                                {language === 'ar' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </button>
                        </div>
                    )}
                </div>
            )}
            {!isLoading && (!captions || captions.length === 0) && (
                <div className="text-center flex-grow flex flex-col justify-center items-center opacity-50">
                    <DocumentTextIcon />
                    <h2 className="text-xl font-bold text-text-muted mt-4 mb-2">{t('postContentTitle')}</h2>
                    <p className="text-sm text-gray-500 max-w-xs">{t('postContentPlaceholder')}</p>
                </div>
            )}
        </div>
    );
};

export default PostContent;
