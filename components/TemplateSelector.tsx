import React from 'react';
import { POST_TEMPLATES } from '../constants';
import { useI18n } from '../contexts/I18nContext';

interface TemplateSelectorProps {
    selectedTemplate: string;
    onTemplateChange: (template: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedTemplate, onTemplateChange }) => {
    const { t, language } = useI18n();
    return (
        <div>
            <label className="block text-center text-sm font-medium text-gray-400 mb-2">
                {t('templateSelectorLabel')}
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 rounded-lg bg-brand-dark p-1">
                {POST_TEMPLATES.map(({ name, label }) => (
                    <button
                        key={name}
                        onClick={() => onTemplateChange(name)}
                        className={`
                            flex items-center justify-center text-center w-full px-2 py-2 text-xs font-semibold rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-orange
                            ${selectedTemplate === name
                                ? 'bg-gradient-to-r from-brand-orange to-brand-green text-white shadow'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }
                        `}
                        aria-pressed={selectedTemplate === name}
                    >
                        <span>{label[language]}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TemplateSelector;
