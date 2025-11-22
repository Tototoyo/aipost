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
        <div>
            <label className="block text-center text-sm font-medium text-gray-400 mb-2">
                {t('imageStyleLabel')}
            </label>
            <div className="grid grid-cols-2 gap-2 rounded-lg bg-brand-medium p-1">
                {STYLES.map(({ name, key, icon }) => (
                    <button
                        key={name}
                        onClick={() => onStyleChange(name)}
                        className={`
                            flex items-center justify-center gap-2 w-full px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-orange
                            ${selectedStyle === name
                                ? 'bg-gradient-to-r from-brand-orange to-brand-green text-white shadow'
                                : 'bg-brand-medium text-gray-300 hover:bg-gray-700/50'
                            }
                        `}
                        aria-pressed={selectedStyle === name}
                    >
                        {icon}
                        <span>{t(key)}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ImageStyleSelector;
