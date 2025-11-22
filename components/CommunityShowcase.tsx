
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
        <div className="bg-surface/50 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-lg h-full flex flex-col">
             <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                         <UsersGroupIcon />
                    </div>
                    <div>
                         <h3 className="text-lg font-bold text-white">
                            {t('communityShowcaseTitle')}
                        </h3>
                        <p className="text-xs text-text-muted">
                            {t('communityShowcaseDescription')}
                        </p>
                    </div>
                </div>
                <a 
                    href="/#/showcase"
                    className="text-sm text-primary hover:text-primary-light font-semibold hover:underline transition-colors"
                >
                    {t('viewMoreLink')}
                </a>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {posts.map((post, index) => (
                    <div key={post.id || index} className="relative rounded-xl overflow-hidden group aspect-square border border-border hover:border-primary/50 transition-colors">
                        <img src={post.imageUrl} alt={`Showcase post ${index + 1}`} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                        <div className={`absolute inset-0 bg-black/70 flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                            <p className="text-white text-[10px] font-medium line-clamp-3">
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
