import OpenAI from 'openai';
import type { SocialMediaPost } from "../types";
import type { Language } from "../contexts/I18nContext";

// In accordance with OpenAI API guidelines, initialize the client.
// Assumes API_KEY is available in the execution environment as `import.meta.env.VITE_OPENAI_API_KEY`.
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // This is required for client-side usage.
});

const textModel = 'gpt-4o';
const imageGenerationModel = 'dall-e-3';
const visionModel = 'gpt-4o';
const fastTextModel = 'gpt-4o-mini';

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
        const systemPrompt = `You are an expert social media marketer and art director. Your response must be a valid JSON object matching this schema: {"captions": ["string", "string", "string"], "hashtags": "string", "imagePrompt": "string"}. The 'imagePrompt' must be in English and must strictly forbid any text from appearing in the image.`;
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
        const response = await openai.chat.completions.create({
            model: textModel,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            response_format: { type: 'json_object' },
        });

        const content = response.choices[0].message.content;
        if (!content) {
            throw new Error(isArabic ? "كانت استجابة الواجهة البرمجية فارغة أو غير صالحة." : "The API response was empty or invalid.");
        }

        const generatedTextContent = JSON.parse(content);
        const { captions, hashtags, imagePrompt } = generatedTextContent as { captions: string[], hashtags: string, imagePrompt: string };
        
        if (!captions || captions.length === 0 || !hashtags || !imagePrompt) {
            throw new Error(isArabic ? "فشل في إنشاء محتوى منشور التواصل الاجتماعي بالكامل." : "Failed to generate the full social media post.");
        }

        if (mode === 'textOnly') {
            return { imageUrl: null, captions, hashtags };
        }

        const imageResponse = await openai.images.generate({
            model: imageGenerationModel,
            prompt: imagePrompt,
            n: 1,
            size: "1024x1024",
            response_format: 'b64_json',
        });

        const b64Json = imageResponse.data[0]?.b64_json;
        if (!b64Json) {
            throw new Error(isArabic ? "فشل إنشاء الصورة." : "Image generation failed.");
        }
        
        const imageUrl = `data:image/jpeg;base64,${b64Json}`;

        return { imageUrl, captions, hashtags };

    } catch (error) {
        console.error("Error in generateSocialMediaPost:", error);
        if (error instanceof Error) {
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
        const visionResponse = await openai.chat.completions.create({
            model: visionModel,
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: 'Analyze this image and write a new, highly detailed image generation prompt for a generative AI model to regenerate it with enhanced sharpness, clarity, and photorealistic quality. Do not change the core subject or composition. Return ONLY the new prompt in English.' },
                        {
                            type: "image_url",
                            image_url: {
                                url: imageUrl,
                            },
                        },
                    ],
                },
            ],
        });
        
        const newPrompt = visionResponse.choices[0].message.content;
        if (!newPrompt) {
            throw new Error(isArabic ? "فشل في تحليل الصورة للتحسين." : "Failed to analyze image for enhancement.");
        }

        const imageResponse = await openai.images.generate({
            model: imageGenerationModel,
            prompt: newPrompt,
            n: 1,
            size: "1024x1024",
            response_format: 'b64_json',
        });

        const b64Json = imageResponse.data[0]?.b64_json;
        if (!b64Json) {
            throw new Error(isArabic ? "فشل تحسين الصورة." : "Image enhancement failed.");
        }

        return `data:image/jpeg;base64,${b64Json}`;

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

        const response = await openai.chat.completions.create({
            model: fastTextModel,
            messages: [{ role: 'user', content: prompt }],
        });

        const idea = response.choices[0].message.content;
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
        const systemPrompt = `You are a friendly social media manager. Your response must be a valid JSON object matching this schema: {"replies": ["string", "string", "string"]}. Your replies must be in ${isArabic ? 'Arabic' : 'English'}.`;
        const userPrompt = `Based on this post text, generate 3 distinct and engaging replies for positive comments: "${postCaption}".`;
        
        const response = await openai.chat.completions.create({
            model: fastTextModel,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            response_format: { type: 'json_object' },
        });

        const content = response.choices[0].message.content;
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