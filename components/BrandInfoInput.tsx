import React from 'react';
import { useI18n } from '../contexts/I18nContext';

interface BrandInfoInputProps {
    brandInfo: string;
    onBrandInfoChange: (info: string) => void;
}

const BrandInfoInput: React.FC<BrandInfoInputProps> = ({ brandInfo, onBrandInfoChange }) => {
    const { t } = useI18n();
    return (
        <div className="bg-brand-medium p-4 rounded-xl shadow-lg">
            <label htmlFor="brand-info" className="block text-sm font-medium text-gray-300 mb-2 text-center">
                {t('brandInfoTitle')}
            </label>
            <p className="text-xs text-center text-gray-500 mb-3">
                {t('brandInfoDescription')}
            </p>
            <textarea
                id="brand-info"
                value={brandInfo}
                onChange={(e) => onBrandInfoChange(e.target.value)}
                rows={4}
                className="w-full bg-brand-dark border border-gray-600 rounded-lg p-3 text-sm text-gray-300 focus:ring-brand-orange focus:border-brand-orange transition duration-200"
                placeholder={t('brandInfoPlaceholder')}
                aria-label="Brand information input"
            />
        </div>
    );
};

export default BrandInfoInput;
