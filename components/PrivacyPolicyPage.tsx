import React from 'react';
import LegalPageLayout from './LegalPageLayout';
import { useI18n } from '../contexts/I18nContext';

interface PageProps {
    onLoginClick: () => void;
}

const PrivacyPolicyPage: React.FC<PageProps> = ({ onLoginClick }) => {
    const { t } = useI18n();
    return (
        <LegalPageLayout title={t('privacyPageTitle')} onLoginClick={onLoginClick}>
            <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>
                AI Post Generator ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 pb-2 border-b border-gray-600">1. Information We Collect</h2>
            <p>We may collect information about you in a variety of ways. The information we may collect includes:</p>
            <ul className="list-disc pl-8 my-4 space-y-2">
                <li><strong>Personal Data:</strong> Personally identifiable information, such as your email address, that you voluntarily give to us when you register for an account.</li>
                <li><strong>Generated Content:</strong> All text prompts, generated captions, and generated images created through your use of the service. If you choose to share a post to our Community Showcase, that content will be stored and displayed publicly.</li>
                <li><strong>Usage Data:</strong> We may automatically collect information about your device and how you use the application, such as your IP address, browser type, and operating system.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 pb-2 border-b border-gray-600">2. How We Use Your Information</h2>
            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:</p>
            <ul className="list-disc pl-8 my-4 space-y-2">
                <li>Create and manage your account.</li>
                <li>Provide, operate, and maintain our services.</li>
                <li>Improve, personalize, and expand our services.</li>
                <li>Process your transactions and send you related information.</li>
                <li>Communicate with you, either directly or through one of our partners, for customer service, to provide you with updates and other information relating to the application.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 pb-2 border-b border-gray-600">3. Disclosure of Your Information</h2>
            <p>We do not share your personal information with third parties except as described in this Privacy Policy. We may share information with third-party vendors and service providers that perform services for us, such as:</p>
            <ul className="list-disc pl-8 my-4 space-y-2">
                <li><strong>Authentication & Database:</strong> We use Supabase to manage user accounts and store data. Their privacy policy can be found on their website.</li>
                <li><strong>AI Model Providers:</strong> We use AI models to generate content. Prompts you provide are sent to these services to generate results. We do not send your personal information like your email to these providers.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 pb-2 border-b border-gray-600">4. Data Storage and Cookies</h2>
            <p>
                To provide a seamless experience, we use your browser's local storage to keep you logged into your account. This technology is essential for the site's functionality. We do not use tracking cookies for advertising purposes. By using our Service, you consent to the use of local storage for authentication.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 pb-2 border-b border-gray-600">5. Security of Your Information</h2>
            <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 pb-2 border-b border-gray-600">6. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 pb-2 border-b border-gray-600">7. Contact Us</h2>
            <p>
                If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:privacy@aipostgen.example.com" className="text-brand-orange hover:underline">privacy@aipostgen.example.com</a>.
            </p>
        </LegalPageLayout>
    );
};

export default PrivacyPolicyPage;