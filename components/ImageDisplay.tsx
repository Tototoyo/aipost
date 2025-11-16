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
        <div className="relative bg-brand-medium p-4 rounded-xl shadow-lg aspect-square flex items-center justify-center">
            {isLoading && (
                <div className="w-full h-full bg-gray-700 rounded-lg animate-pulse-slow"></div>
            )}
            {!isLoading && imageUrl && (
                <>
                    <img src={imageUrl} alt="Generated social media post" className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${isEnhancing ? 'opacity-50' : 'opacity-100'}`} />
                    
                    {isEnhancing && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded-lg">
                            <SpinnerIcon />
                            <p className="text-white mt-2 font-semibold">{t('enhancing')}</p>
                        </div>
                    )}
                    
                    {!isEnhancing && (
                         <div className="absolute bottom-4 right-4">
                            <button
                                onClick={onEnhance}
                                disabled={isEnhanced || isLoading}
                                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-orange disabled:opacity-80
                                    ${isEnhanced
                                        ? 'bg-brand-green text-white cursor-default'
                                        : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:scale-105 hover:shadow-lg disabled:cursor-not-allowed'
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
                 <div className="text-center text-gray-500">
                    <ImageIcon />
                    <p className="mt-2">{t('imageWillAppear')}</p>
                </div>
            )}
        </div>
    );
};

export default ImageDisplay;
