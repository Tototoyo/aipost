import React, { useState, useCallback } from 'react';
import { generateReplies } from '../services/geminiService';
import type { SocialMediaPost } from '../types';
import { ChatBubbleLeftRightIcon, SpinnerIcon, ErrorIcon, CheckIcon, CopyIcon } from './icons';
import { useI18n } from '../contexts/I18nContext';

interface AICommentReplyGeneratorProps {
    post: SocialMediaPost;
}

const AICommentReplyGenerator: React.FC<AICommentReplyGeneratorProps> = ({ post }) => {
    const { t, language } = useI18n();
    const [replies, setReplies] = useState<string[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleGenerateReplies = useCallback(async () => {
        if (!post.captions || post.captions.length === 0) return;
        
        setIsLoading(true);
        setError(null);
        setReplies(null);

        try {
            const firstCaption = post.captions[0];
            const generatedReplies = await generateReplies(firstCaption, language);
            setReplies(generatedReplies);
        } catch (err) {
            setError(err instanceof Error ? err.message : t('failedToGenerateReplies'));
        } finally {
            setIsLoading(false);
        }
    }, [post.captions, language, t]);

    const handleCopy = (reply: string, index: number) => {
        navigator.clipboard.writeText(reply);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };


    return (
        <div className="bg-brand-medium p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-center mb-2 text-brand-light flex items-center justify-center gap-2">
                <ChatBubbleLeftRightIcon />
                <span>{t('commentReplyGeneratorTitle')}</span>
            </h3>
            <p className="text-sm text-gray-400 text-center mb-4">
                {t('commentReplyGeneratorDescription')}
            </p>
            
            {isLoading && (
                <div className="flex justify-center items-center h-24">
                    <SpinnerIcon />
                </div>
            )}

            {!isLoading && error && (
                <div className="bg-red-900/50 text-red-300 p-3 rounded-lg text-center my-4 text-sm flex items-center justify-center gap-2">
                    <ErrorIcon /> {error}
                </div>
            )}

            {!isLoading && replies && (
                <div className="space-y-3 my-4">
                    {replies.map((reply, index) => (
                         <div key={index} className="bg-brand-dark p-3 rounded-lg flex justify-between items-center gap-2">
                            <p className="text-gray-300 text-sm flex-grow">{reply}</p>
                            <button
                                onClick={() => handleCopy(reply, index)}
                                className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors flex-shrink-0"
                                aria-label="Copy reply"
                            >
                                {copiedIndex === index ? <CheckIcon /> : <CopyIcon />}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <button
                onClick={handleGenerateReplies}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-md font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
            >
                {isLoading ? (
                    <>
                        <SpinnerIcon />
                        {t('generating')}
                    </>
                ) : (
                    t('generate3Replies')
                )}
            </button>
        </div>
    );
};

export default AICommentReplyGenerator;
