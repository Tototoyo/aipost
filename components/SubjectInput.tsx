import React from 'react';
import { useI18n } from '../contexts/I18nContext';

interface SubjectInputProps {
    subject: string;
    onSubjectChange: (subject: string) => void;
}

const SubjectInput: React.FC<SubjectInputProps> = ({ subject, onSubjectChange }) => {
    const { t } = useI18n();
    return (
        <div className="bg-brand-medium p-4 rounded-xl shadow-lg border border-gray-700">
            <label htmlFor="subject-info" className="block text-sm font-medium text-gray-300 mb-2 text-center">
                {t('subjectTitle')}
            </label>
            <p className="text-xs text-center text-gray-500 mb-3">
                {t('subjectDescription')}
            </p>
            <input
                id="subject-info"
                type="text"
                value={subject}
                onChange={(e) => onSubjectChange(e.target.value)}
                className="w-full bg-brand-dark border border-gray-600 rounded-lg p-3 text-sm text-gray-300 focus:ring-brand-orange focus:border-brand-orange transition duration-200"
                placeholder={t('subjectPlaceholder')}
                aria-label="Post subject input"
                required
            />
        </div>
    );
};

export default SubjectInput;
