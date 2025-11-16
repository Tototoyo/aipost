import React from 'react';
import LegalPageLayout from './LegalPageLayout';
import { useI18n } from '../contexts/I18nContext';

interface PageProps {
    onLoginClick: () => void;
}

const TermsOfServicePage: React.FC<PageProps> = ({ onLoginClick }) => {
    const { t } = useI18n();
    return (
        <LegalPageLayout title={t('termsPageTitle')} onLoginClick={onLoginClick}>
            <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>
                Please read these Terms of Service ("Terms") carefully before using the AI Post Generator application (the "Service") operated by us. Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 pb-2 border-b border-gray-600">1. Accounts</h2>
            <p>
                When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 pb-2 border-b border-gray-600">2. Content Ownership and Responsibility</h2>
            <p>
                Our Service allows you to generate text and images ("Content"). You are responsible for the input you provide and the subsequent Content you generate. Subject to your compliance with these Terms and the policies of our third-party AI service providers, you own the rights to the Content you create using our Service.
            </p>
            <p>
                You are solely responsible for ensuring that your use of the generated Content is lawful, appropriate, and does not infringe upon any third-party rights (such as copyrights, trademarks, or rights of publicity).
            </p>
            <p>
                By choosing to share your Content to the "Community Showcase", you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, publish, and distribute this specific Content on our platform and in promotional materials for the sole purpose of showcasing the capabilities of our Service.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 pb-2 border-b border-gray-600">3. Acceptable Use</h2>
            <p>You agree not to use the Service to create any Content that is:</p>
            <ul className="list-disc pl-8 my-4 space-y-2">
                <li>Unlawful, harmful, threatening, abusive, defamatory, or otherwise objectionable.</li>
                <li>Infringing on any third party's intellectual property or proprietary rights.</li>
                <li>Misleading, deceptive, or fraudulent.</li>
                <li>Intended to generate spam or unsolicited commercial messages.</li>
            </ul>
            <p>We reserve the right to investigate and terminate accounts that violate these policies.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 pb-2 border-b border-gray-600">4. Termination</h2>
            <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 pb-2 border-b border-gray-600">5. Limitation of Liability</h2>
            <p>
                In no event shall AI Post Generator, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 pb-2 border-b border-gray-600">6. Changes</h2>
            <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 pb-2 border-b border-gray-600">7. Contact Us</h2>
            <p>
                If you have any questions about these Terms, please contact us at: <a href="mailto:salinilitou@gmail.com" className="text-brand-orange hover:underline">salinilitou@gmail.com</a>.
            </p>
        </LegalPageLayout>
    );
};

export default TermsOfServicePage;