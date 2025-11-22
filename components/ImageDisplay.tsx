
import React from 'react';
import { ImageIcon, WandIcon, SpinnerIcon } from './icons';
import { useI18n } from '../contexts/I18nContext';

interface ImageDisplayProps {
    isLoading: boolean;
    imageUrl: string | null;
    isEnhancing: boolean;
    isEnhanced: boolean;
    onEnhance: () => void;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ isLoading, imageUrl, isEnhancing, isEnhanced, onEnhance }) => {
    const { t } = useI18n();

    return (
        <div className="relative w-full aspect-square bg-surfaceHighlight border border-border rounded-2xl overflow-hidden flex items-center justify-center shadow-md group">
            {isLoading && (
                <div className="w-full h-full bg-surfaceHighlight animate-pulse-slow flex items-center justify-center">
                    <div className="flex flex-col items-center text-primary/50">
                         <SpinnerIcon />
                    </div>
                </div>
            )}
            {!isLoading && imageUrl && (
                <>
                    <img src={imageUrl} alt="Generated social media post" className={`w-full h-full object-cover transition-opacity duration-500 ${isEnhancing ? 'opacity-50 blur-sm' : 'opacity-100'}`} />
                    
                    {isEnhancing && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
                            <SpinnerIcon />
                            <p className="text-white mt-3 font-semibold tracking-wide">{t('enhancing')}</p>
                        </div>
                    )}
                    
                    {!isEnhancing && (
                         <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                                onClick={onEnhance}
                                disabled={isEnhanced || isLoading}
                                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg shadow-lg transition-all duration-300 backdrop-blur-md border
                                    ${isEnhanced
                                        ? 'bg-green-500/90 border-green-500 text-white cursor-default'
                                        : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                                    }
                                `}
                                aria-label={isEnhanced ? t('enhancedAriaLabel') : t('enhanceAriaLabel')}
                            >
                                <WandIcon />
                                <span>{isEnhanced ? t('enhanced') : t('enhanceQuality')}</span>
                            </button>
                        </div>
                    )}
                </>
            )}
            {!isLoading && !imageUrl && (
                 <div className="flex flex-col items-center text-center p-8">
                    <div className="w-20 h-20 bg-surface border border-border rounded-full flex items-center justify-center text-text-muted mb-4">
                         <ImageIcon />
                    </div>
                    <p className="text-text-muted font-medium">{t('imageWillAppear')}</p>
                </div>
            )}
        </div>
    );
};

export default ImageDisplay;
