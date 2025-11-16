import React from 'react';
import LegalPageLayout from './LegalPageLayout';
import { useI18n } from '../contexts/I18nContext';

interface PageProps {
    onLoginClick: () => void;
}

const ContactPage: React.FC<PageProps> = ({ onLoginClick }) => {
    const { t } = useI18n();
    return (
        <LegalPageLayout title={t('contactUsTitle')} onLoginClick={onLoginClick}>
            <p>
                {t('contactUsIntro')}
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 pb-2 border-b border-gray-600">{t('emailSupportTitle')}</h2>
            <p>
                {t('generalInquiriesText')}
                <a href="mailto:contact@aipostgen.example.com" className="text-brand-orange hover:underline">contact@aipostgen.example.com</a>.
            </p>
            <p>
                {t('technicalSupportText')}
                <a href="mailto:support@aipostgen.example.com" className="text-brand-orange hover:underline">support@aipostgen.example.com</a>.
            </p>
            <p className="mt-4">
                {t('responseAimText')}
            </p>
        </LegalPageLayout>
    );
};

export default ContactPage;