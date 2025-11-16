
import React, { useState, useEffect, useCallback } from 'react';
import Footer from './Footer';
import { supabase } from '../supabaseClient';
import type { ShowcasePost } from '../types';
import { useI18n } from '../contexts/I18nContext';
import { SpinnerIcon, SparklesIcon } from './icons';

interface PageProps {
    onLoginClick: () => void;
}

const POSTS_PER_PAGE = 12;

const CommunityShowcasePage: React.FC<PageProps> = ({ onLoginClick }) => {
    const { t, language } = useI18n();
    const [posts, setPosts] = useState<ShowcasePost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);

    const fetchPosts = useCallback(async (pageNum: number) => {
        setIsLoading(true);
        const from = pageNum * POSTS_PER_PAGE;
        const to = from + POSTS_PER_PAGE - 1;

        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false })
            .range(from, to);

        if (error) {
            console.error("Error fetching showcase posts:", error.message);
            setHasMore(false);
        } else {
            const formattedPosts = data.map(item => ({
                id: item.id,
                imageUrl: item.image_url,
                caption: item.caption,
                bgColor: item.bg_color,
            }));
            
            setPosts(prev => pageNum === 0 ? formattedPosts : [...prev, ...formattedPosts]);

            if (data.length < POSTS_PER_PAGE) {
                setHasMore(false);
            }
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        // Fetch initial posts only once
        fetchPosts(0);
    }, [fetchPosts]);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchPosts(nextPage);
    };

    return (
        <div className="min-h-screen bg-brand-dark text-brand-light font-sans flex flex-col">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
                <header className="relative">
                    <nav className="flex items-center justify-between py-4">
                        <a href="/#/" className="flex items-center gap-2 text-xl font-bold text-brand-light">
                            <SparklesIcon/>
                            <span>AI Post Gen</span>
                        </a>
                        <a href="/#/" className="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-orange bg-brand-medium text-gray-300 hover:bg-gray-700/50">
                            &larr; {t('backToGenerator')}
                        </a>
                    </nav>
                </header>
                
                <main className="my-8">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold text-brand-light">
                           {t('showcasePageTitle')}
                        </h1>
                        <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">
                            {t('communityShowcaseDescription')}
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
                        {posts.map((post) => (
                            <div key={post.id} className="relative rounded-lg overflow-hidden group aspect-square">
                                <img src={post.imageUrl} alt={`Showcase post`} className="w-full h-full object-cover" />
                                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-4 transition-all duration-300`}>
                                    <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                        {post.caption[language] ? post.caption[language] : post.caption['en']}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {isLoading && (
                        <div className="flex justify-center my-8">
                            <SpinnerIcon />
                        </div>
                    )}

                    {hasMore && !isLoading && (
                        <div className="text-center my-8">
                            <button
                                onClick={handleLoadMore}
                                className="px-8 py-3 bg-gradient-to-r from-brand-orange to-brand-green text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
                            >
                                {t('loadMore')}
                            </button>
                        </div>
                    )}
                    
                    {!hasMore && posts.length > 0 && !isLoading &&(
                        <p className="text-center text-gray-500 my-8">{t('noMorePosts')}</p>
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default CommunityShowcasePage;
