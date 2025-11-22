
import React, { useState, useCallback, useEffect } from 'react';
import type { SocialMediaPost, ShowcasePost } from './types';
import { generateSocialMediaPost, enhanceImage } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import GenerateButton from './components/GenerateButton';
import ImageDisplay from './components/ImageDisplay';
import PostContent from './components/PostContent';
import ToneSelector from './components/ToneSelector';
import ImageStyleSelector from './components/ImageStyleSelector';
import { ErrorIcon, PhotoIcon, DocumentTextIcon } from './components/icons';
import BrandInfoInput from './components/BrandInfoInput';
import TemplateSelector from './components/TemplateSelector';
import PostIdeaGenerator from './components/PostIdeaGenerator';
import AICommentReplyGenerator from './components/AICommentReplyGenerator';
import CommunityShowcase from './components/CommunityShowcase';
import { useI18n } from './contexts/I18nContext';
import SubjectInput from './components/SubjectInput';
import AuthModal from './components/AuthModal';
import { useAuth } from './contexts/AuthContext';
import { supabase } from './supabaseClient';
import AboutPage from './components/AboutPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import ContactPage from './components/ContactPage';
import CommunityShowcasePage from './components/CommunityShowcasePage';


const App: React.FC = () => {
    const { t, language } = useI18n();
    const { user } = useAuth();
    const [post, setPost] = useState<SocialMediaPost | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [subject, setSubject] = useState<string>('');
    const [tone, setTone] = useState<string>('Informative');
    const [generationMode, setGenerationMode] = useState<'full' | 'textOnly'>('full');
    const [imageStyle, setImageStyle] = useState<string>('Photorealistic');
    const [brandInfo, setBrandInfo] = useState<string>('');
    const [isEnhancing, setIsEnhancing] = useState<boolean>(false);
    const [isEnhanced, setIsEnhanced] = useState<boolean>(false);

    // Paid features state
    const [template, setTemplate] = useState<string>('General');

    // Auth and Community state
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [showcasePosts, setShowcasePosts] = useState<ShowcasePost[]>([]);

    // Routing state
    const [route, setRoute] = useState(window.location.hash || '#/');

    useEffect(() => {
        const handleHashChange = () => {
            setRoute(window.location.hash || '#/');
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);


    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.title = language === 'ar' ? 'مولد المنشورات بالذكاء الاصطناعي' : 'AI Post Generator';
    }, [language]);

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(9); // Fetch latest 9 posts

            if (error) {
                console.error("Error fetching showcase posts:", error.message);
            } else {
                setShowcasePosts(data.map(item => ({
                    id: item.id,
                    imageUrl: item.image_url,
                    caption: item.caption,
                    bgColor: item.bg_color,
                })));
            }
        };

        fetchPosts();
    }, []);

    const sharePostToCommunity = useCallback(async (postToShare: SocialMediaPost) => {
        if (!postToShare.imageUrl || !postToShare.captions || postToShare.captions.length === 0) {
            return;
        }

        const bgColors = ['bg-slate-700', 'bg-indigo-700', 'bg-purple-700', 'bg-rose-700', 'bg-emerald-700'];
        const randomBg = bgColors[Math.floor(Math.random() * bgColors.length)];
        
        const firstCaption = `${postToShare.captions[0]}\n\n${postToShare.hashtags}`;
        
        const captionContent = { en: firstCaption, ar: firstCaption };

        const newPostData = {
            user_id: user?.id || null, // Allow anonymous posts
            image_url: postToShare.imageUrl,
            caption: captionContent,
            bg_color: randomBg
        };

        const { data, error } = await supabase
            .from('posts')
            .insert(newPostData)
            .select()
            .single();

        if (error) {
            console.error("Error auto-sharing post:", error.message);
        } else if (data) {
             const newShowcasePost: ShowcasePost = {
                id: data.id,
                imageUrl: data.image_url,
                caption: data.caption,
                bgColor: data.bg_color,
            };
            setShowcasePosts(prevPosts => [newShowcasePost, ...prevPosts].slice(0, 9));
        }
    }, [user]);

    const handleGeneratePost = useCallback(async () => {
        if (!subject.trim()) {
            setError(t('subjectRequired'));
            return;
        }
        setIsLoading(true);
        setError(null);
        setPost(null);
        setIsEnhanced(false);

        try {
            const generatedPost = await generateSocialMediaPost(subject, tone, generationMode, imageStyle, brandInfo, template, language);
            setPost(generatedPost);

            if (generatedPost.imageUrl) {
                sharePostToCommunity(generatedPost);
            }
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : t('unexpectedError'));
        } finally {
            setIsLoading(false);
        }
    }, [subject, tone, generationMode, imageStyle, brandInfo, template, language, t, sharePostToCommunity]);

    const handleEnhanceImage = useCallback(async () => {
        if (!post?.imageUrl) return;
        
        setIsEnhancing(true);
        setError(null);
        try {
            const enhancedImageUrl = await enhanceImage(post.imageUrl, language);
            setPost(prevPost => {
                if (!prevPost) return null;
                return { ...prevPost, imageUrl: enhancedImageUrl };
            });
            setIsEnhanced(true);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : t('unexpectedError'));
        } finally {
            setIsEnhancing(false);
        }
    }, [post, language, t]);

    const handleLoginClick = () => setIsAuthModalOpen(true);

    const renderPage = () => {
        switch (route) {
            case '#/about':
                return <AboutPage onLoginClick={handleLoginClick} />;
            case '#/privacy':
                return <PrivacyPolicyPage onLoginClick={handleLoginClick} />;
            case '#/terms':
                return <TermsOfServicePage onLoginClick={handleLoginClick} />;
            case '#/contact':
                return <ContactPage onLoginClick={handleLoginClick} />;
            case '#/showcase':
                return <CommunityShowcasePage onLoginClick={handleLoginClick} />;
            default:
                return (
                    <div className="min-h-screen bg-background text-text-main font-sans flex flex-col">
                        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow pb-20">
                            <Header onLoginClick={handleLoginClick} />
                            <main className="mt-10 animate-fade-in">
                                <div id="features" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                    {/* Left Column: Controls */}
                                    <div className="lg:col-span-4 space-y-6">
                                        <div className="bg-surface/50 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-lg space-y-8">
                                            <div className="space-y-6">
                                                <SubjectInput subject={subject} onSubjectChange={setSubject} />
                                                <TemplateSelector selectedTemplate={template} onTemplateChange={setTemplate} />
                                            </div>

                                            <div className="pt-6 border-t border-border space-y-6">
                                                <BrandInfoInput brandInfo={brandInfo} onBrandInfoChange={setBrandInfo} />
                                            </div>

                                            <div className="pt-6 border-t border-border space-y-6">
                                                <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">{t('generationModeLabel')}</h3>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <button
                                                        key="full"
                                                        onClick={() => setGenerationMode('full')}
                                                        className={`
                                                            flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
                                                            ${generationMode === 'full'
                                                                ? 'bg-primary/10 text-primary border border-primary'
                                                                : 'bg-surfaceHighlight text-text-muted border border-transparent hover:bg-surfaceHighlight/80'
                                                            }
                                                        `}
                                                    >
                                                        <PhotoIcon />
                                                        <span>{t('textAndImage')}</span>
                                                    </button>
                                                    <button
                                                        key="textOnly"
                                                        onClick={() => setGenerationMode('textOnly')}
                                                        className={`
                                                            flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
                                                            ${generationMode === 'textOnly'
                                                                ? 'bg-primary/10 text-primary border border-primary'
                                                                : 'bg-surfaceHighlight text-text-muted border border-transparent hover:bg-surfaceHighlight/80'
                                                            }
                                                        `}
                                                    >
                                                        <DocumentTextIcon />
                                                        <span>{t('textOnly')}</span>
                                                    </button>
                                                </div>

                                                <ImageStyleSelector selectedStyle={imageStyle} onStyleChange={setImageStyle} />
                                                <ToneSelector selectedTone={tone} onToneChange={setTone} />
                                                
                                                <div className="pt-4">
                                                    <GenerateButton isLoading={isLoading} onClick={handleGeneratePost} disabled={!subject.trim()} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Results */}
                                    <div className="lg:col-span-8 space-y-6">
                                        {error && (
                                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl flex items-center gap-3 animate-fade-in">
                                                <ErrorIcon />
                                                <span className="text-sm font-medium">{error}</span>
                                            </div>
                                        )}
                                        
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                                            <div className="lg:col-span-1 w-full">
                                                <ImageDisplay 
                                                    isLoading={isLoading} 
                                                    imageUrl={post?.imageUrl ?? null}
                                                    isEnhancing={isEnhancing}
                                                    isEnhanced={isEnhanced}
                                                    onEnhance={handleEnhanceImage} 
                                                />
                                            </div>
                                            <div className="lg:col-span-1 w-full h-full">
                                                <PostContent 
                                                    isLoading={isLoading} 
                                                    captions={post?.captions ?? null} 
                                                    hashtags={post?.hashtags ?? null}
                                                />
                                            </div>
                                        </div>

                                        {post && (
                                            <div className="animate-fade-in">
                                                <AICommentReplyGenerator post={post} />
                                            </div>
                                        )}

                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                                            <PostIdeaGenerator />
                                            <CommunityShowcase posts={showcasePosts} />
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                        <Footer />
                    </div>
                );
        }
    }


    return (
        <>
            {renderPage()}
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </>
    );
};

export default App;
