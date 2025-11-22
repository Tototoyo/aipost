
import React from 'react';
import { CameraIcon, ShapesIcon, LayoutIcon, PenIcon } from './icons';
import { useI18n } from '../contexts/I18nContext';

interface ImageStyleSelectorProps {
    selectedStyle: string;
    onStyleChange: (style: string) => void;
}

const STYLES = [
    { name: 'Photorealistic', key: 'photorealistic' as const, icon: <CameraIcon /> },
    { name: 'Vibrant Abstract', key: 'vibrantAbstract' as const, icon: <ShapesIcon /> },
    { name: 'Elegant Flat Lay', key: 'elegantFlatLay' as const, icon: <LayoutIcon /> },
    { name: 'Minimalist Art', key: 'minimalistArt' as const, icon: <PenIcon /> },
];

const ImageStyleSelector: React.FC<ImageStyleSelectorProps> = ({ selectedStyle, onStyleChange }) => {
    const { t } = useI18n();
    return (
        <div className="w-full">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-3 ml-1">
                {t('imageStyleLabel')}
            </label>
            <div className="grid grid-cols-2 gap-3">
                {STYLES.map(({ name, key, icon }) => (
                    <button
                        key={name}
                        onClick={() => onStyleChange(name)}
                        className={`
                            flex flex-col items-center justify-center gap-2 p-4 rounded-xl transition-all duration-200 border
                            ${selectedStyle === name
                                ? 'bg-primary/10 text-primary border-primary'
                                : 'bg-surfaceHighlight text-text-muted border-transparent hover:bg-surfaceHighlight/80'
                            }
                        `}
                        aria-pressed={selectedStyle === name}
                    >
                        <div className={selectedStyle === name ? 'text-primary' : 'text-gray-500'}>
                             {icon}
                        </div>
                        <span className="text-xs font-medium">{t(key)}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ImageStyleSelector;
