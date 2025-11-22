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
        <header className="relative">
            {/* --- Navigation Bar --- */}
            <nav className="flex items-center justify-between py-4">
                {/* Logo */}
                <a href="#" className="flex items-center gap-2 text-xl font-bold text-brand-light">
                    <SparklesIcon/>
                    <span>AI Post Gen</span>
                </a>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-gray-300 hover:text-brand-orange transition-colors">Features</a>
                    <a href="#community" className="text-gray-300 hover:text-brand-orange transition-colors">Community</a>
                </div>

                {/* Desktop Auth & Language Buttons */}
                <div className="hidden md:flex items-center gap-2">
                    {user ? (
                        <>
                            <span className="text-sm text-gray-400 hidden lg:block">{user.email}</span>
                            <button onClick={logout} className="flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-orange bg-brand-medium text-gray-300 hover:bg-gray-700/50" aria-label="Logout">
                                <ArrowLeftOnRectangleIcon />
                                <span className="hidden lg:inline">{t('logout')}</span>
                            </button>
                        </>
                    ) : (
                        <button onClick={onLoginClick} className="flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-orange bg-gradient-to-r from-brand-orange to-brand-green text-white hover:opacity-90" aria-label="Login or Sign Up">
                            <UserCircleIcon />
                            <span>{t('loginSignup')}</span>
                        </button>
                    )}
                    <button onClick={toggleLanguage} className="flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-orange bg-brand-medium text-gray-300 hover:bg-gray-700/50" aria-label="Toggle language">
                        <GlobeAltIcon />
                        <span className="hidden lg:inline">{t('language')}</span>
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white" aria-label="Open menu">
                        {isMenuOpen ? <XMarkIcon /> : <MenuIcon />}
                    </button>
                </div>
            </nav>
            
            {/* --- Mobile Menu --- */}
            {isMenuOpen && (
                <div className="md:hidden bg-brand-medium rounded-lg shadow-xl p-4 mt-2 space-y-4">
                    <a href="#features" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 hover:text-brand-orange transition-colors py-2 text-center">Features</a>
                    <a href="#community" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 hover:text-brand-orange transition-colors py-2 text-center">Community</a>
                    <div className="border-t border-gray-700 pt-4 flex flex-col gap-3">
                         {user ? (
                            <>
                                <p className="text-sm text-center text-gray-400">{user.email}</p>
                                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="flex w-full justify-center items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg bg-brand-medium text-gray-300 hover:bg-gray-700/50">
                                    <ArrowLeftOnRectangleIcon />
                                    <span>{t('logout')}</span>
                                </button>
                            </>
                        ) : (
                            <button onClick={() => { onLoginClick(); setIsMenuOpen(false); }} className="flex w-full justify-center items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-brand-orange to-brand-green text-white">
                                <UserCircleIcon />
                                <span>{t('loginSignup')}</span>
                            </button>
                        )}
                        <button onClick={toggleLanguage} className="flex w-full justify-center items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg bg-brand-medium text-gray-300 hover:bg-gray-700/50">
                            <GlobeAltIcon />
                            <span>{t('language')}</span>
                        </button>
                    </div>
                </div>
            )}

            {/* --- Hero Section --- */}
            <div className="text-center pt-12 sm:pt-16">
                 <h1 className="text-4xl sm:text-5xl font-bold text-brand-light">
                    {t('appTitle')}
                </h1>
                <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">
                    {t('appSubtitle')}
                </p>
            </div>
        </header>
    );
};

export default Header;
