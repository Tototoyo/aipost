
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
        <div className="w-full">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-3 ml-1">
                {t('templateSelectorLabel')}
            </label>
            <div className="flex flex-wrap gap-2">
                {POST_TEMPLATES.map(({ name, label }) => (
                    <button
                        key={name}
                        onClick={() => onTemplateChange(name)}
                        className={`
                            px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 border
                            ${selectedTemplate === name
                                ? 'bg-primary text-white border-primary shadow-sm'
                                : 'bg-surfaceHighlight text-text-muted border-border hover:border-gray-500 hover:text-white'
                            }
                        `}
                        aria-pressed={selectedTemplate === name}
                    >
                        {label[language]}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TemplateSelector;
