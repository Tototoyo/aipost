
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
        <div className="bg-surface/50 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                         <ChatBubbleLeftRightIcon />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">{t('commentReplyGeneratorTitle')}</h3>
                        <p className="text-xs text-text-muted">{t('commentReplyGeneratorDescription')}</p>
                    </div>
                </div>
                <button
                    onClick={handleGenerateReplies}
                    disabled={isLoading}
                    className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-xl shadow-md transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2"><SpinnerIcon /> {t('generating')}</span>
                    ) : (
                        t('generate3Replies')
                    )}
                </button>
            </div>

            {isLoading && (
                <div className="flex justify-center items-center py-8 text-primary">
                    <SpinnerIcon />
                </div>
            )}

            {!isLoading && error && (
                <div className="bg-red-500/10 text-red-400 p-4 rounded-xl my-4 text-sm flex items-center gap-3">
                    <ErrorIcon /> {error}
                </div>
            )}

            {!isLoading && replies && (
                <div className="grid gap-3 animate-fade-in">
                    {replies.map((reply, index) => (
                         <div key={index} className="group bg-surfaceHighlight border border-border p-4 rounded-xl flex justify-between items-start gap-4 hover:border-primary/50 transition-colors">
                            <p className="text-gray-200 text-sm leading-relaxed pt-1">{reply}</p>
                            <button
                                onClick={() => handleCopy(reply, index)}
                                className={`p-2 rounded-lg transition-colors flex-shrink-0 ${copiedIndex === index ? 'text-green-400 bg-green-500/10' : 'text-text-muted hover:text-white hover:bg-surface'}`}
                                aria-label="Copy reply"
                            >
                                {copiedIndex === index ? <CheckIcon /> : <CopyIcon />}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AICommentReplyGenerator;
