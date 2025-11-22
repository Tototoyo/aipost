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
            className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-orange to-brand-green text-white text-xl font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
        >
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