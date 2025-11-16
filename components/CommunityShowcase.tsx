import React from 'react';
import { UsersGroupIcon } from './icons';
import { useI18n } from '../contexts/I18nContext';
import type { ShowcasePost } from '../types';

interface CommunityShowcaseProps {
    posts: ShowcasePost[];
}

const CommunityShowcase: React.FC<CommunityShowcaseProps> = ({ posts }) => {
    const { t, language } = useI18n();
    return (
        <div className="bg-brand-medium p-6 rounded-xl shadow-lg h-full">
            <h3 className="text-xl font-bold text-center mb-2 text-brand-light flex items-center justify-center gap-2">
                <UsersGroupIcon />
                <span>{t('communityShowcaseTitle')}</span>
            </h3>
            <p className="text-sm text-gray-400 text-center mb-4">
                {t('communityShowcaseDescription')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {posts.map((post, index) => (
                    <div key={index} className="relative rounded-lg overflow-hidden group aspect-square">
                        <img src={post.imageUrl} alt={`Showcase post ${index + 1}`} className="w-full h-full object-cover" />
                        <div className={`absolute inset-0 bg-black/60 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                            <p className="text-white text-xs font-medium whitespace-pre-wrap">
                                {post.caption[language]}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommunityShowcase;