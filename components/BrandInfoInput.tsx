
import React from 'react';
import { useI18n } from '../contexts/I18nContext';

interface BrandInfoInputProps {
    brandInfo: string;
    onBrandInfoChange: (info: string) => void;
}

const BrandInfoInput: React.FC<BrandInfoInputProps> = ({ brandInfo, onBrandInfoChange }) => {
    const { t } = useI18n();
    return (
        <div className="w-full">
             <label htmlFor="brand-info" className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2 ml-1">
                {t('brandInfoTitle')}
            </label>
            <textarea
                id="brand-info"
                value={brandInfo}
                onChange={(e) => onBrandInfoChange(e.target.value)}
                rows={3}
                className="w-full bg-surfaceHighlight border border-border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 resize-none"
                placeholder={t('brandInfoPlaceholder')}
                aria-label="Brand information input"
            />
             <p className="text-xs text-text-muted mt-2 ml-1">
                {t('brandInfoDescription')}
            </p>
        </div>
    );
};

export default BrandInfoInput;
