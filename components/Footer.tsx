
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
        <footer className="border-t border-border bg-surface mt-12">
            <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    
                    <div className="order-2 md:order-1">
                         <p className="text-sm text-text-muted">
                            &copy; 2024 AI Post Generator. All rights reserved.
                        </p>
                    </div>
                   
                    <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 order-1 md:order-2">
                        <a href="/#/about" className="text-sm text-text-muted hover:text-white transition-colors">{t('aboutLink')}</a>
                        <a href="/#/showcase" className="text-sm text-text-muted hover:text-white transition-colors">{t('communityLink')}</a>
                        <a href="/#/contact" className="text-sm text-text-muted hover:text-white transition-colors">{t('contactLink')}</a>
                        <a href="/#/privacy" className="text-sm text-text-muted hover:text-white transition-colors">{t('privacyLink')}</a>
                        <a href="/#/terms" className="text-sm text-text-muted hover:text-white transition-colors">{t('termsLink')}</a>
                    </nav>

                    <div className="flex gap-6 order-3">
                        {socialLinks.map((item) => (
                            <a key={item.name} href={item.href} className="text-text-muted hover:text-primary transition-colors">
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
