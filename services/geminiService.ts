
import { GoogleGenAI, Type } from "@google/genai";
import type { SocialMediaPost } from "../types";
import type { Language } from "../contexts/I18nContext";

// Initialize the client with the API key from process.env.API_KEY
// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const textModel = 'gemini-3-pro-preview';
const imageModel = 'gemini-3-pro-image-preview';
const fastTextModel = 'gemini-2.5-flash';

export const generateSocialMediaPost = async (
    subject: string,
    tone: string,
    mode: 'full' | 'textOnly' = 'full',
    imageStyle: string = 'Photorealistic',
    brandInfo: string,
    template: string,
    language: Language
): Promise<SocialMediaPost> => {
    const isArabic = language === 'ar';

    let toneInstruction = '';
    if (isArabic) {
        switch (tone) {
            case 'Marketing':
                toneInstruction = 'مقنعة وتركز على الفوائد. يجب أن تشجع الدعوة إلى اتخاذ إجراء المستخدمين على اتخاذ إجراء معين (على سبيل المثال، زيارة موقع ويب، التحقق من منتج).';
                break;
            case 'Creative':
                toneInstruction = 'خيالية وتعتمد على السرد القصيصي لبناء شخصية العلامة التجارية وعرض الإمكانيات.';
                break;
            case 'Informative':
            default:
                toneInstruction = 'تعليمية وموثوقة، مما يضع العلامة التجارية كمصدر رئيسي للمعرفة. اختتم بسؤال لبناء المجتمع.';
                break;
        }
    } else {
         switch (tone) {
            case 'Marketing':
                toneInstruction = 'Persuasive and benefits-focused. The call-to-action should encourage users to take a specific action (e.g., visit a website, check out a product).';
                break;
            case 'Creative':
                toneInstruction = 'Imaginative and uses storytelling to build brand personality and showcase possibilities.';
                break;
            case 'Informative':
            default:
                toneInstruction = 'Educational and authoritative, positioning the brand as a key source of knowledge. End with a community-building question.';
                break;
        }
    }

    let templateInstruction = '';
    if (isArabic) {
        switch (template) {
            case 'New Product':
                templateInstruction = 'يجب أن يكون المنشور على هيئة إعلان عن منتج أو خدمة جديدة. ركز على إثارة الحماس، وتسليط الضوء على الميزات الرئيسية، وشرح الفوائد للعميل.';
                break;
            case 'Promotion':
                templateInstruction = 'يجب أن يسلط المنشور الضوء على عرض خاص أو خصم أو صفقة. اخلق شعوراً بالإلحاح وشجع على اتخاذ إجراء فوري.';
                break;
            case 'Customer Story':
                templateInstruction = 'يجب أن يروي المنشور قصة من وجهة نظر العميل، ويعرض قصة نجاح أو تجربة إيجابية تتعلق بالموضوع.';
                break;
            case 'Behind the Scenes':
                templateInstruction = 'يجب أن يقدم المنشور لمحة عن العملية أو الفريق أو كيفية إنشاء منتج/خدمة. أظهر الجانب الإنساني للعمل.';
                break;
            case 'General':
            default:
                templateInstruction = 'اتبع الإرشادات العامة للنبرة والأسلوب دون هيكل محدد مسبقًا.';
                break;
        }
    } else {
        switch (template) {
            case 'New Product':
                templateInstruction = 'The post should be a new product or service announcement. Focus on generating excitement, highlighting key features, and explaining the benefits to the customer.';
                break;
            case 'Promotion':
                templateInstruction = 'The post should highlight a special offer, discount, or deal. Create a sense of urgency and encourage immediate action.';
                break;
            case 'Customer Story':
                templateInstruction = 'The post should tell a story from a customer\'s perspective, showcasing a success story or positive experience related to the topic.';
                break;
            case 'Behind the Scenes':
                templateInstruction = 'The post should give a glimpse into the process, team, or how a product/service is made. Show the human side of the business.';
                break;
            case 'General':
            default:
                templateInstruction = 'Follow the general tone and style guidelines without a specific preconceived structure.';
                break;
        }
    }

    let imageStyleInstruction = '';
    switch (imageStyle) {
        case 'Vibrant Abstract':
            imageStyleInstruction = `A vibrant, abstract 3D render featuring geometric shapes like cubes and spheres in a dynamic composition. The primary colors should be vibrant and complementary, set against a clean, light gray background. The scene should be conceptual and represent innovation and quality. The lighting should be bright and modern.`;
            break;
        case 'Elegant Flat Lay':
            imageStyleInstruction = `An elegant, top-down flat lay photograph (knolling style). The subject should be neatly arranged on a textured, neutral-colored surface like concrete or linen. The composition must be balanced and minimalist. The lighting should be soft and natural, creating gentle shadows. Include subtle color accents. 4K resolution.`;
            break;
        case 'Minimalist Art':
            imageStyleInstruction = `A sophisticated and minimalist single-line art illustration. The drawing should cleverly represent the subject using a continuous black line on a clean, off-white background. Add tasteful, subtle splashes of a single highlight color to highlight key areas. The style must be modern, clean, and elegant.`;
            break;
        case 'Photorealistic':
        default:
            imageStyleInstruction = `A modern, minimalist, and clean aesthetic with professional studio lighting for a hyper-realistic, 4K resolution photo.`;
            break;
    }

    try {
        const userPrompt = `
Create a social media post about: "${subject}".

**Instructions for Post Text (${isArabic ? 'in Arabic' : 'in English'}):**
-   **Template:** Follow the "${template}" template: "${templateInstruction}".
-   **Captions:** Generate 3 distinct, short, catchy caption variations.
-   **Tone:** Use this tone: "${toneInstruction}".
${brandInfo.trim() ? `
-   **Brand Intelligence:** Adapt the tone based on this brand info: "${brandInfo}".
` : ''}
-   **Hashtags:** Generate 5-10 relevant hashtags.

**Instructions for Image Prompt (in English):**
-   Based on the captions, create a powerful image generation prompt.
-   **Aesthetics:** ${imageStyleInstruction}
-   The subject should be a beautiful representation of the caption's content.
`;
        const response = await ai.models.generateContent({
            model: textModel,
            contents: userPrompt,
            config: {
                systemInstruction: "You are an expert social media marketer and art director.",
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        captions: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        },
                        hashtags: { type: Type.STRING },
                        imagePrompt: { type: Type.STRING }
                    },
                    required: ["captions", "hashtags", "imagePrompt"]
                },
            },
        });

        const generatedTextContent = JSON.parse(response.text || "{}");
        const { captions, hashtags, imagePrompt } = generatedTextContent as { captions: string[], hashtags: string, imagePrompt: string };
        
        if (!captions || captions.length === 0 || !hashtags || !imagePrompt) {
            throw new Error(isArabic ? "فشل في إنشاء محتوى منشور التواصل الاجتماعي بالكامل." : "Failed to generate the full social media post.");
        }

        if (mode === 'textOnly') {
            return { imageUrl: null, captions, hashtags };
        }

        const imageResponse = await ai.models.generateContent({
            model: imageModel,
            contents: { parts: [{ text: imagePrompt }] },
            config: {
                imageConfig: {
                    aspectRatio: "1:1",
                    imageSize: "1K"
                }
            },
        });

        let imageUrl: string | null = null;
        const candidate = imageResponse.candidates?.[0];
        if (candidate?.content?.parts) {
            for (const part of candidate.content.parts) {
                if (part.inlineData) {
                    imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                    break;
                }
            }
        }

        if (!imageUrl) {
            throw new Error(isArabic ? "فشل إنشاء الصورة." : "Image generation failed.");
        }

        return { imageUrl, captions, hashtags };

    } catch (error) {
        console.error("Error in generateSocialMediaPost:", error);
        if (error instanceof Error) {
             // Basic check for JSON parsing errors or others
            if (error.message.includes("JSON")) {
                throw new Error(isArabic ? "أرجع نموذج الذكاء الاصطناعي تنسيقًا غير صالح." : "The AI model returned an invalid format.");
            }
            throw new Error(`${isArabic ? 'فشل في إنشاء منشور التواصل الاجتماعي' : 'Failed to generate social media post'}: ${error.message}`);
        }
        throw new Error(isArabic ? "حدث خطأ غير معروف أثناء إنشاء المنشور." : "An unknown error occurred while generating the post.");
    }
};

export const enhanceImage = async (imageUrl: string, language: Language): Promise<string> => {
    const isArabic = language === 'ar';
    try {
        // Check if imageUrl is a data URL and extract base64
        let base64Data = '';
        let mimeType = '';
        if (imageUrl.startsWith('data:')) {
            const parts = imageUrl.split(',');
            if (parts.length === 2) {
                base64Data = parts[1];
                const mimeMatch = parts[0].match(/:(.*?);/);
                if (mimeMatch) {
                    mimeType = mimeMatch[1];
                }
            }
        }

        if (!base64Data || !mimeType) {
             // If it's not a data URL, we can't handle it easily with Gemini inlineData without fetching it first.
             // Assuming app generates data URLs.
             throw new Error("Invalid image format for enhancement.");
        }

        // Step 1: Analyze image to get a better prompt
        const visionResponse = await ai.models.generateContent({
            model: fastTextModel,
            contents: {
                parts: [
                    {
                        inlineData: {
                            mimeType: mimeType,
                            data: base64Data
                        }
                    },
                    {
                        text: 'Analyze this image and write a new, highly detailed image generation prompt for a generative AI model to regenerate it with enhanced sharpness, clarity, and photorealistic quality. Do not change the core subject or composition. Return ONLY the new prompt in English.'
                    }
                ]
            }
        });
        
        const newPrompt = visionResponse.text;
        if (!newPrompt) {
            throw new Error(isArabic ? "فشل في تحليل الصورة للتحسين." : "Failed to analyze image for enhancement.");
        }

        // Step 2: Generate new image
        const imageResponse = await ai.models.generateContent({
            model: imageModel,
            contents: { parts: [{ text: newPrompt }] },
            config: {
                 imageConfig: {
                    aspectRatio: "1:1",
                    imageSize: "1K"
                }
            },
        });

        let enhancedImageUrl: string | null = null;
         const candidate = imageResponse.candidates?.[0];
        if (candidate?.content?.parts) {
            for (const part of candidate.content.parts) {
                if (part.inlineData) {
                    enhancedImageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                    break;
                }
            }
        }

        if (!enhancedImageUrl) {
            throw new Error(isArabic ? "فشل تحسين الصورة." : "Image enhancement failed.");
        }

        return enhancedImageUrl;

    } catch (error) {
        console.error("Error in enhanceImage:", error);
        if (error instanceof Error) {
            throw new Error(`${isArabic ? 'فشل في تحسين الصورة' : 'Failed to enhance image'}: ${error.message}`);
        }
        throw new Error(isArabic ? "حدث خطأ غير معروف أثناء تحسين الصورة." : "An unknown error occurred while enhancing the image.");
    }
};


export const generatePostIdea = async (language: Language): Promise<string> => {
    const isArabic = language === 'ar';
    try {
        const prompt = isArabic 
            ? "أنت خبير استراتيجي إبداعي. قدم فكرة واحدة جديدة وجذابة لمنشور على وسائل التواصل الاجتماعي لليوم. يجب أن تكون الفكرة عبارة عن موجه قصير وملهم يمكن للمستخدم البناء عليه. ركز على مواضيع عامة مثل اتجاهات التصميم، أو قصص النجاح، أو نظرة من خلف الكواليس. يجب أن يكون الناتج نصًا واحدًا باللغة العربية."
            : "You are a creative strategist. Provide one fresh and engaging social media post idea for today. The idea should be a short, inspirational prompt a user can build on. Focus on general themes like design trends, success stories, or a behind-the-scenes look. The output must be a single string in English.";

        const response = await ai.models.generateContent({
            model: fastTextModel,
            contents: prompt,
        });

        const idea = response.text;
        if (!idea) {
            throw new Error(isArabic ? "فشلت في إنشاء فكرة." : "Failed to generate an idea.");
        }
        return idea.trim();
    } catch (error) {
        console.error("Error generating post idea:", error);
        if (error instanceof Error) {
            throw new Error(`${isArabic ? 'فشل في إنشاء فكرة المنشور' : 'Failed to generate post idea'}: ${error.message}`);
        }
        throw new Error(isArabic ? "حدث خطأ غير معروف أثناء إنشاء فكرة المنشور." : "An unknown error occurred while generating a post idea.");
    }
};

export const generateReplies = async (postCaption: string, language: Language): Promise<string[]> => {
    const isArabic = language === 'ar';
    try {
        const userPrompt = `Based on this post text, generate 3 distinct and engaging replies for positive comments: "${postCaption}".`;
        
        const response = await ai.models.generateContent({
            model: fastTextModel,
            contents: userPrompt,
            config: {
                systemInstruction: `You are a friendly social media manager. Your replies must be in ${isArabic ? 'Arabic' : 'English'}.`,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        replies: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        }
                    },
                    required: ["replies"]
                }
            }
        });

        const content = response.text;
        if (!content) {
            throw new Error(isArabic ? "فشلت في إنشاء الردود." : "Failed to generate replies.");
        }

        const parsedResponse = JSON.parse(content);
        if (!parsedResponse.replies || !Array.isArray(parsedResponse.replies) || parsedResponse.replies.length === 0) {
            throw new Error(isArabic ? "لم يتمكن النموذج من إنشاء ردود صالحة." : "The model could not generate valid replies.");
        }
        
        return parsedResponse.replies;
    } catch (error) {
        console.error("Error generating replies:", error);
        if (error instanceof Error) {
             if (error.message.includes("JSON")) {
                 throw new Error(isArabic ? "أرجع نموذج الذكاء الاصطناعي تنسيقًا غير صالح للردود." : "The AI model returned an invalid format for replies.");
            }
            throw new Error(`${isArabic ? 'فشل في إنشاء الردود' : 'Failed to generate replies'}: ${error.message}`);
        }
        throw new Error(isArabic ? "حدث خطأ غير معروف أثناء إنشاء الردود." : "An unknown error occurred while generating replies.");
    }
};
