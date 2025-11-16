import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useI18n } from '../contexts/I18nContext';
import { XMarkIcon, SpinnerIcon, ErrorIcon } from './icons';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const { t } = useI18n();
    const { login, signup } = useAuth();
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setError(null);
            setSuccessMessage(null);
            setEmail('');
            setPassword('');
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);
        try {
            if (mode === 'login') {
                await login(email, password);
                setSuccessMessage(t('loginSuccess'));
            } else {
                await signup(email, password);
                setSuccessMessage(t('signupSuccess'));
            }
            setTimeout(() => {
                onClose();
            }, 1000);
        } catch (err) {
            if (err instanceof Error) {
                if (err.message.includes('exists')) {
                    setError(t('userExistsError'));
                } else if (err.message.includes('Invalid')) {
                    setError(t('invalidCredentialsError'));
                } else {
                     setError(t('unexpectedError'));
                }
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div 
                className="relative bg-brand-medium rounded-2xl shadow-2xl w-full max-w-sm m-4 p-8 border border-gray-700"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                    aria-label="Close"
                >
                    <XMarkIcon />
                </button>

                <h2 className="text-2xl font-bold text-center text-brand-light mb-2">
                    {mode === 'login' ? t('loginToAccount') : t('createAnAccount')}
                </h2>

                <div className="flex justify-center mb-6">
                    <div className="bg-brand-dark p-1 rounded-lg flex gap-1">
                        <button
                            onClick={() => setMode('login')}
                            className={`px-4 py-1.5 text-sm font-semibold rounded-md ${mode === 'login' ? 'bg-brand-orange text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                        >
                            {t('login')}
                        </button>
                        <button
                            onClick={() => setMode('signup')}
                            className={`px-4 py-1.5 text-sm font-semibold rounded-md ${mode === 'signup' ? 'bg-brand-orange text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                        >
                            {t('signup')}
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            {t('emailAddress')}
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full bg-brand-dark border border-gray-600 rounded-md shadow-sm py-2 px-3 text-brand-light focus:outline-none focus:ring-brand-orange focus:border-brand-orange"
                        />
                    </div>
                    <div>
                        <label htmlFor="password"className="block text-sm font-medium text-gray-300">
                            {t('password')}
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="mt-1 block w-full bg-brand-dark border border-gray-600 rounded-md shadow-sm py-2 px-3 text-brand-light focus:outline-none focus:ring-brand-orange focus:border-brand-orange"
                        />
                    </div>
                    
                    {error && (
                        <div className="bg-red-900/50 border border-red-700 text-red-300 px-3 py-2 rounded-lg text-sm flex items-center gap-2">
                            <ErrorIcon />
                            <span>{error}</span>
                        </div>
                    )}
                    {successMessage && (
                        <div className="bg-green-900/50 border border-green-700 text-green-300 px-3 py-2 rounded-lg text-sm">
                            {successMessage}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-brand-orange to-brand-green hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-medium focus:ring-brand-orange disabled:opacity-50"
                    >
                        {isLoading ? <SpinnerIcon /> : (mode === 'login' ? t('login') : t('signup'))}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-400">
                    {mode === 'login' ? t('dontHaveAccount') : t('alreadyHaveAccount')}{' '}
                    <button 
                        onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                        className="font-medium text-brand-orange hover:underline"
                    >
                        {mode === 'login' ? t('signup') : t('login')}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthModal;