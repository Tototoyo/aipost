
import React from 'react';
import { useI18n } from '../contexts/I18nContext';

interface SubjectInputProps {
    subject: string;
    onSubjectChange: (subject: string) => void;
}

const SubjectInput: React.FC<SubjectInputProps> = ({ subject, onSubjectChange }) => {
    const { t } = useI18n();
    return (
        <div className="w-full">
            <label htmlFor="subject-info" className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2 ml-1">
                {t('subjectTitle')}
            </label>
            <input
                id="subject-info"
                type="text"
                value={subject}
                onChange={(e) => onSubjectChange(e.target.value)}
                className="w-full bg-surfaceHighlight border border-border rounded-xl px-4 py-3 text-base text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
                placeholder={t('subjectPlaceholder')}
                aria-label="Post subject input"
                required
            />
            <p className="text-xs text-text-muted mt-2 ml-1">
                {t('subjectDescription')}
            </p>
        </div>
    );
};

export default SubjectInput;
