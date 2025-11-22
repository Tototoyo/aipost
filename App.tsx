
import React, { useState, useCallback, useEffect } from 'react';
import type { SocialMediaPost, ShowcasePost, Reminder } from './types';
import { generateSocialMediaPost, enhanceImage } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import GenerateButton from './components/GenerateButton';
import ImageDisplay from './components/ImageDisplay';
import PostContent from './components/PostContent';
import ToneSelector from './components/ToneSelector';
import ImageStyleSelector from './components/ImageStyleSelector';
import { ErrorIcon, PhotoIcon, DocumentTextIcon, BellIcon, XMarkIcon } from './components/icons';
import BrandInfoInput from './components/BrandInfoInput';
import TemplateSelector from './components/TemplateSelector';
import PostIdeaGenerator from './components/PostIdeaGenerator';
import AICommentReplyGenerator from './components/AICommentReplyGenerator';
import CommunityShowcase from './components/CommunityShowcase';
import { useI18n } from './contexts/I18nContext';
import SubjectInput from './components/SubjectInput';
import AuthModal from './components/AuthModal';
import ScheduleModal from './components/ScheduleModal';
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

    // Reminder State
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [reminders, setReminders] = useState<Reminder[]>(() => {
        const saved = localStorage.getItem('post_reminders');
        return saved ? JSON.parse(saved) : [];
    });
    const [activeReminder, setActiveReminder] = useState<Reminder | null>(null);

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

    // Reminder logic
    useEffect(() => {
        localStorage.setItem('post_reminders', JSON.stringify(reminders));
    }, [reminders]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const dueReminders = reminders.filter(r => new Date(r.scheduledTime) <= now);
            
            if (dueReminders.length > 0) {
                // Trigger notification for the first one
                setActiveReminder(dueReminders[0]);
                // Remove from list so it doesn't trigger again
                setReminders(prev => prev.filter(r => r.id !== dueReminders[0].id));
            }
        }, 10000); // Check every 10 seconds

        return () => clearInterval(interval);
    }, [reminders]);

    const handleSchedule = (dateString: string) => {
        if (!post) return;
        const newReminder: Reminder = {
            id: Date.now().toString(),
            subject: subject || 'Social Media Post',
            scheduledTime: dateString,
            contentSnippet: post.captions[0]?.substring(0, 50) + '...'
        };
        setReminders(prev => [...prev, newReminder]);
        // We could add a "Reminder Set" toast here, but let's keep it simple
    };

    const closeNotification = () => {
        setActiveReminder(null);
    };


    const sharePostToCommunity = useCallback(async (postToShare: SocialMediaPost) => {
        if (!postToShare.imageUrl || !postToShare.captions || postToShare.captions.length === 0) {
            return;
        }

        const bgColors = ['bg-slate-700', 'bg-sky-700', 'bg-emerald-700', 'bg-rose-700', 'bg-violet-700'];
        const randomBg = bgColors[Math.floor(Math.random() * bgColors.length)];
        
        const firstCaption = `${postToShare.captions[0]}\n\n${postToShare.hashtags}`;
        
        // Ensure caption object has both language keys, even if content is the same, for schema consistency.
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
                    <div className="min-h-screen bg-brand-dark text-brand-light font-sans flex flex-col">
                        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
                            <Header onLoginClick={handleLoginClick} />
                            <main className="mt-8">
                                <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {/* Control Panel */}
                                    <div className="md:col-span-1 space-y-6">
                                        <SubjectInput subject={subject} onSubjectChange={setSubject} />
                                        
                                        <div className="bg-brand-medium p-4 rounded-xl shadow-lg space-y-4 border border-gray-700">
                                            <h3 className="text-lg font-semibold text-center text-gray-200">
                                                {t('brandCustomizationTitle')}
                                            </h3>
                                            <BrandInfoInput brandInfo={brandInfo} onBrandInfoChange={setBrandInfo} />
                                            <TemplateSelector selectedTemplate={template} onTemplateChange={setTemplate} />
                                        </div>

                                        <div>
                                            <label className="block text-center text-sm font-medium text-gray-400 mb-2">
                                                {t('generationModeLabel')}
                                            </label>
                                            <div className="grid grid-cols-2 gap-2 rounded-lg bg-brand-medium p-1">
                                                <button
                                                    key="full"
                                                    onClick={() => setGenerationMode('full')}
                                                    className={`
                                                        flex items-center justify-center gap-2 w-full px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-orange
                                                        ${generationMode === 'full'
                                                            ? 'bg-gradient-to-r from-brand-orange to-brand-green text-white shadow'
                                                            : 'bg-brand-medium text-gray-300 hover:bg-gray-700/50'
                                                        }
                                                    `}
                                                    aria-pressed={generationMode === 'full'}
                                                >
                                                    <PhotoIcon />
                                                    <span>{t('textAndImage')}</span>
                                                </button>
                                                <button
                                                    key="textOnly"
                                                    onClick={() => setGenerationMode('textOnly')}
                                                    className={`
                                                        flex items-center justify-center gap-2 w-full px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-orange
                                                        ${generationMode === 'textOnly'
                                                            ? 'bg-gradient-to-r from-brand-orange to-brand-green text-white shadow'
                                                            : 'bg-brand-medium text-gray-300 hover:bg-gray-700/50'
                                                        }
                                                    `}
                                                    aria-pressed={generationMode === 'textOnly'}
                                                >
                                                    <DocumentTextIcon />
                                                    <span>{t('textOnly')}</span>
                                                </button>
                                            </div>
                                        </div>
                                        <ImageStyleSelector selectedStyle={imageStyle} onStyleChange={setImageStyle} />
                                        <ToneSelector selectedTone={tone} onToneChange={setTone} />
                                        <GenerateButton isLoading={isLoading} onClick={handleGeneratePost} disabled={!subject.trim()} />
                                    </div>

                                    {/* Results Area */}
                                    <div className="md:col-span-2 space-y-8">
                                        {error && (
                                            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative flex items-center gap-3">
                                            <ErrorIcon />
                                                <span className="block sm:inline">{error}</span>
                                            </div>
                                        )}
                                        
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                                            <ImageDisplay 
                                                isLoading={isLoading} 
                                                imageUrl={post?.imageUrl ?? null}
                                                isEnhancing={isEnhancing}
                                                isEnhanced={isEnhanced}
                                                onEnhance={handleEnhanceImage} 
                                            />
                                            <PostContent 
                                                isLoading={isLoading} 
                                                captions={post?.captions ?? null} 
                                                hashtags={post?.hashtags ?? null}
                                                onOpenSchedule={() => setIsScheduleModalOpen(true)}
                                            />
                                        </div>
                                        {post && <AICommentReplyGenerator post={post} />}
                                    </div>
                                </div>
                                
                                {/* Community & Engagement Section */}
                                <div id="community" className="mt-12 border-t border-gray-700 pt-8">
                                    <h2 className="text-3xl font-bold text-center mb-8">
                                        <span className="text-brand-light">{t('communitySectionTitle')}</span>
                                    </h2>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <PostIdeaGenerator />
                                        <CommunityShowcase posts={showcasePosts} />
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
            <ScheduleModal 
                isOpen={isScheduleModalOpen} 
                onClose={() => setIsScheduleModalOpen(false)} 
                onSchedule={handleSchedule} 
            />
            
            {/* In-App Notification Toast */}
            {activeReminder && (
                <div className="fixed top-4 right-4 z-50 max-w-sm w-full bg-brand-medium border border-brand-orange rounded-xl shadow-2xl p-4 animate-slide-in-right">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                            <div className="bg-brand-orange/20 p-2 rounded-full text-brand-orange shrink-0">
                                <BellIcon />
                            </div>
                            <div>
                                <h4 className="text-brand-light font-bold">{t('reminderTitle')}</h4>
                                <p className="text-gray-300 text-sm mt-1">
                                    {t('timeFor')} 
                                    <span className="font-medium text-white">"{activeReminder.subject}"</span>
                                </p>
                                {user?.email && (
                                    <p className="text-xs text-gray-500 mt-2 italic">
                                        {t('simulatedEmailSent')} {user.email}
                                    </p>
                                )}
                            </div>
                        </div>
                        <button onClick={closeNotification} className="text-gray-400 hover:text-white">
                            <XMarkIcon />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default App;
