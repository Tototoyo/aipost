
export interface SocialMediaPost {
    imageUrl: string | null;
    captions: string[];
    hashtags: string;
}

export interface ShowcasePost {
    id: number;
    imageUrl: string;
    caption: {
        ar: string;
        en: string;
    };
    bgColor: string;
}

export interface User {
    id: string;
    email: string;
}

export interface Reminder {
    id: string;
    subject: string;
    scheduledTime: string;
    contentSnippet?: string;
}

export interface ViralHooks {
    curiosity: string[];
    controversial: string[];
    story: string[];
    emotional: string[];
    short: string[];
}
