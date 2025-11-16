import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LegalPageLayoutProps {
    title: string;
    children: React.ReactNode;
    onLoginClick: () => void;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, onLoginClick, children }) => {
    return (
        <div className="min-h-screen bg-brand-dark text-brand-light font-sans flex flex-col">
            <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
                <Header onLoginClick={onLoginClick} />
                <main className="my-8">
                    <div className="bg-brand-medium p-6 sm:p-10 rounded-xl shadow-lg border border-gray-700">
                        <a href="/#/" className="text-brand-orange hover:underline mb-6 block transition-colors">&larr; Back to Generator</a>
                        <h1 className="text-3xl sm:text-4xl font-bold text-brand-light border-b border-gray-600 pb-4 mb-6">{title}</h1>
                        <div className="text-gray-300 leading-relaxed space-y-4">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default LegalPageLayout;
