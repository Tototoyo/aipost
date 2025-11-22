
import React from 'react';
import { SparklesIcon, SpinnerIcon } from './icons';
import { useI18n } from '../contexts/I18nContext';

interface GenerateButtonProps {
    isLoading: boolean;
    onClick: () => void;
    disabled?: boolean;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ isLoading, onClick, disabled = false }) => {
    const { t } = useI18n();
    const isButtonDisabled = isLoading || disabled;

    return (
        <button
            onClick={onClick}
            disabled={isButtonDisabled}
            title={disabled && !isLoading ? t('subjectRequired') : ''}
            className="w-full group relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white text-lg font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none overflow-hidden"
        >
             <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full duration-700 transition-transform transform -skew-x-12 -translate-x-full ease-out"></div>
            {isLoading ? (
                <>
                    <SpinnerIcon />
                    {t('generating')}
                </>
            ) : (
                <>
                    <SparklesIcon />
                    {t('generateNewPost')}
                </>
            )}
        </button>
    );
};

export default GenerateButton;
