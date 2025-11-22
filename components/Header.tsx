
import React, { useState } from 'react';
import { useI18n } from '../contexts/I18nContext';
import { useAuth } from '../contexts/AuthContext';
import { GlobeAltIcon, ArrowLeftOnRectangleIcon, UserCircleIcon, MenuIcon, XMarkIcon, SparklesIcon } from './icons';

interface HeaderProps {
    onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
    const { t, language, setLanguage } = useI18n();
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleLanguage = () => {
        setLanguage(language === 'ar' ? 'en' : 'ar');
    };
    
    return (
        <header className="relative w-full z-40">
            <nav className="flex items-center justify-between py-6">
                {/* Logo */}
                <a href="#" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <SparklesIcon />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">AI Post Gen</span>
                </a>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">Features</a>
                    <a href="#community" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">Community</a>
                </div>

                {/* Desktop Auth & Language Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <button 
                        onClick={toggleLanguage} 
                        className="text-text-muted hover:text-white transition-colors"
                        aria-label="Toggle language"
                    >
                        <GlobeAltIcon />
                    </button>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-text-muted hidden lg:block">{user.email}</span>
                            <button 
                                onClick={logout} 
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-muted hover:text-white border border-border rounded-lg hover:bg-surfaceHighlight transition-all"
                            >
                                <span>{t('logout')}</span>
                            </button>
                        </div>
                    ) : (
                        <button 
                            onClick={onLoginClick} 
                            className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-surfaceHighlight hover:bg-border border border-border rounded-lg transition-all shadow-sm"
                        >
                            <span>{t('loginSignup')}</span>
                        </button>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-text-muted hover:text-white p-2" aria-label="Open menu">
                        {isMenuOpen ? <XMarkIcon /> : <MenuIcon />}
                    </button>
                </div>
            </nav>
            
            {/* --- Mobile Menu --- */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-surface border border-border rounded-2xl shadow-2xl p-6 z-50 space-y-6 animate-fade-in">
                    <div className="flex flex-col gap-4">
                        <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-text-muted hover:text-primary">Features</a>
                        <a href="#community" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-text-muted hover:text-primary">Community</a>
                    </div>
                    <div className="border-t border-border pt-6 space-y-4">
                         {user ? (
                            <>
                                <p className="text-sm text-text-muted">{user.email}</p>
                                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl bg-surfaceHighlight hover:bg-border text-white transition-all">
                                    <ArrowLeftOnRectangleIcon />
                                    <span>{t('logout')}</span>
                                </button>
                            </>
                        ) : (
                            <button onClick={() => { onLoginClick(); setIsMenuOpen(false); }} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl bg-primary hover:bg-primary-hover text-white transition-all">
                                <UserCircleIcon />
                                <span>{t('loginSignup')}</span>
                            </button>
                        )}
                        <button onClick={toggleLanguage} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl bg-surfaceHighlight hover:bg-border text-text-muted transition-all">
                            <GlobeAltIcon />
                            <span>{t('language')}</span>
                        </button>
                    </div>
                </div>
            )}

            {/* --- Hero Section --- */}
            <div className="text-center py-12 sm:py-16 max-w-3xl mx-auto">
                 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
                    {t('appTitle')}
                </h1>
                <p className="mt-6 text-lg text-text-muted leading-relaxed">
                    {t('appSubtitle')}
                </p>
            </div>
        </header>
    );
};

export default Header;
