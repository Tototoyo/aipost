import React from 'react';
import LegalPageLayout from './LegalPageLayout';

interface PageProps {
    onLoginClick: () => void;
}

const AboutPage: React.FC<PageProps> = ({ onLoginClick }) => {
    return (
        <LegalPageLayout title="About AI Post Generator" onLoginClick={onLoginClick}>
            <p>
                Welcome to AI Post Generator, your go-to tool for creating high-quality, engaging social media content in seconds. We believe that everyone, from small business owners to large marketing teams, deserves access to powerful tools that make content creation simple, fast, and effective.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 pb-2 border-b border-gray-600">Our Mission</h2>
            <p>
                Our mission is to empower creators and brands by automating the most time-consuming aspects of social media management. We leverage cutting-edge artificial intelligence to generate unique and compelling text and images, allowing you to focus on what truly matters: connecting with your audience and growing your brand.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 pb-2 border-b border-gray-600">How It Works</h2>
            <p>
                Our platform is designed for simplicity and power. Here's how you can create a stunning post in just a few clicks:
            </p>
            <ul className="list-disc pl-8 my-4 space-y-2">
                <li><strong>Enter Your Subject:</strong> Tell our AI what your post is about. The more specific you are, the better the result.</li>
                <li><strong>Customize Your Brand:</strong> Provide details about your brand's voice, style, and target audience to get perfectly tailored content.</li>
                <li><strong>Choose Your Style:</strong> Select a tone, template, and image style that matches your campaign goals.</li>
                <li><strong>Generate:</strong> With a single click, our AI gets to work, crafting multiple caption options, relevant hashtags, and a stunning, unique image.</li>
                <li><strong>Share:</strong> Copy your favorite caption, download the image, and share it with the world!</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 pb-2 border-b border-gray-600">Contact Us</h2>
            <p>
                Have questions, feedback, or suggestions? We'd love to hear from you! Please reach out to our support team at <a href="mailto:support@aipostgen.example.com" className="text-brand-orange hover:underline">support@aipostgen.example.com</a>.
            </p>
        </LegalPageLayout>
    );
};

export default AboutPage;
