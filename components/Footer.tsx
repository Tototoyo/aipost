
import React from 'react';
import { TwitterIcon, InstagramIcon, FacebookIcon } from './icons';
import { useI18n } from '../contexts/I18nContext';

const Footer: React.FC = () => {
    const { t } = useI18n();
    const socialLinks = [
        { name: 'Twitter', href: '#', icon: TwitterIcon },
        { name: 'Instagram', href: '#', icon: InstagramIcon },
        { name: 'Facebook', href: '#', icon: FacebookIcon },
    ];
    
    return (
        <footer className="bg-brand-medium border-t border-gray-700">
            <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-gray-400 order-3 md:order-1">
                        &copy; 2024 AI Post Generator. All rights reserved.
                    </p>
                    <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 order-2">
                        <a href="/#/about" className="text-sm text-gray-300 hover:text-brand-orange transition-colors">{t('aboutLink')}</a>
                        <a href="/#/showcase" className="text-sm text-gray-300 hover:text-brand-orange transition-colors">{t('communityLink')}</a>
                        <a href="/#/contact" className="text-sm text-gray-300 hover:text-brand-orange transition-colors">{t('contactLink')}</a>
                        <a href="/#/privacy" className="text-sm text-gray-300 hover:text-brand-orange transition-colors">{t('privacyLink')}</a>
                        <a href="/#/terms" className="text-sm text-gray-300 hover:text-brand-orange transition-colors">{t('termsLink')}</a>
                    </nav>
                    <div className="flex gap-4 order-1 md:order-3">
                        {socialLinks.map((item) => (
                            <a key={item.name} href={item.href} className="text-gray-400 hover:text-brand-orange transition-colors">
                                <span className="sr-only">{item.name}</span>
                                <item.icon />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
