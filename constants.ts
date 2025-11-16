import type { ShowcasePost } from './types';

export const POST_TEMPLATES = [
    { name: 'General', label: { ar: 'عام', en: 'General' } },
    { name: 'New Product', label: { ar: 'منتج جديد', en: 'New Product' } },
    { name: 'Promotion', label: { ar: 'عرض ترويجي', en: 'Promotion' } },
    { name: 'Customer Story', label: { ar: 'قصة عميل', en: 'Customer Story' } },
    { name: 'Behind the Scenes', label: { ar: 'خلف الكواليس', en: 'Behind the Scenes' } },
];

export const COMMUNITY_SHOWCASE_POSTS: ShowcasePost[] = [
    {
        // FIX: Added missing 'id' property as required by the ShowcasePost type.
        id: 1,
        imageUrl: `https://images.unsplash.com/photo-1511920183276-542a97fb494d?q=80&w=2070&auto=format&fit=crop`,
        caption: {
            ar: 'ابدأ يومك بشكل صحيح مع قهوتنا المحمصة الطازجة. ☕️ #قهوة #صباح_الخير #كافيين',
            en: 'Start your day right with our freshly roasted coffee. ☕️ #CoffeeLover #MorningRitual #CaffeineFix'
        },
        bgColor: 'bg-amber-700'
    },
    {
        // FIX: Added missing 'id' property as required by the ShowcasePost type.
        id: 2,
        imageUrl: `https://images.unsplash.com/photo-1598226463239-733b0634c387?q=80&w=2070&auto=format&fit=crop`,
        caption: {
            ar: 'أناقة ومستدامة. اكتشف مجموعتنا الجديدة من الأزياء الصديقة للبيئة. #أزياء_مستدامة #صديق_للبيئة #تسوق_بوعي',
            en: 'Style that feels good and does good. Discover our new eco-friendly fashion line. #SustainableFashion #EcoFriendly #ConsciousShopping'
        },
        bgColor: 'bg-teal-500'
    },
    {
        // FIX: Added missing 'id' property as required by the ShowcasePost type.
        id: 3,
        imageUrl: `https://images.unsplash.com/photo-1606220858428-e4b272f28014?q=80&w=2070&auto=format&fit=crop`,
        caption: {
            ar: 'المستقبل بين يديك. استمتع بصوت لا مثيل له مع سماعاتنا الجديدة. #تكنولوجيا #أدوات #صوت_غامر',
            en: 'The future is now. Experience sound like never before with our new headphones. #Tech #Gadgets #ImmersiveAudio'
        },
        bgColor: 'bg-indigo-500'
    }
];
