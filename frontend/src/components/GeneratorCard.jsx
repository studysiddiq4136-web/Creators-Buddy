import React from 'react';
import { Sparkles, Linkedin, Instagram, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

const PLATFORMS = [
    { id: 'LinkedIn', label: 'LinkedIn', icon: Linkedin, color: 'text-blue-400', activeBg: 'bg-blue-600/20 border-blue-500/50' },
    { id: 'Instagram', label: 'Instagram', icon: Instagram, color: 'text-pink-400', activeBg: 'bg-pink-600/20 border-pink-500/50' },
    { id: 'Twitter (X)', label: 'Twitter (X)', icon: Twitter, color: 'text-sky-400', activeBg: 'bg-sky-600/20 border-sky-500/50' },
];

const GeneratorCard = ({
    onGenerate,
    isLoading,
    topic,
    setTopic,
    platform,
    setPlatform,
    length,
    setLength,
    language,
    setLanguage,
    tags
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-3xl mx-auto bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative z-20"
        >
            {/* Logo, Heading & Tagline */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-3.5 bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-xl shadow-indigo-600/30 mb-3">
                    <Sparkles className="w-8 h-8 text-white animate-pulse" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400 tracking-tight">
                    Creator’s Buddy
                </h1>
                <p className="text-sm sm:text-base text-slate-400 mt-1 font-medium">
                    Your AI-Powered Social Media Content Partner
                </p>
            </div>

            <div className="space-y-6">
                {/* 1. Topic / Tone Selection */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300 ml-1 flex items-center justify-between">
                        <span>Topic / Tone</span>
                        <span className="text-xs text-slate-500 font-normal">Select the core message or tone</span>
                    </label>
                    <div className="relative">
                        <select
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="w-full bg-slate-800/80 border border-slate-700 hover:border-slate-600 text-white rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all appearance-none text-sm sm:text-base font-medium cursor-pointer"
                        >
                            {tags.length > 0 ? (
                                tags.map(tag => (
                                    <option key={tag} value={tag} className="bg-slate-900 text-white">{tag}</option>
                                ))
                            ) : (
                                <>
                                    <option value="Mental Health">Mental Health</option>
                                    <option value="Job Search">Job Search</option>
                                    <option value="Motivation">Motivation</option>
                                </>
                            )}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                            ▼
                        </div>
                    </div>
                </div>

                {/* 2. Platform Selection */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300 ml-1 flex items-center justify-between">
                        <span>Platform</span>
                        <span className="text-xs text-slate-500 font-normal">Tailors tone, structure & formatting</span>
                    </label>

                    {/* Interactive Platform Tabs */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        {PLATFORMS.map((p) => {
                            const Icon = p.icon;
                            const isSelected = platform === p.id;
                            return (
                                <button
                                    key={p.id}
                                    type="button"
                                    onClick={() => setPlatform(p.id)}
                                    className={`py-3 px-3 rounded-xl border flex flex-col sm:flex-row items-center justify-center gap-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                                        isSelected
                                            ? `${p.activeBg} text-white shadow-lg shadow-indigo-900/20 ring-1 ring-white/20`
                                            : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                                    }`}
                                >
                                    <Icon className={`w-4 h-4 ${isSelected ? p.color : 'text-slate-400'}`} />
                                    <span>{p.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Fallback Select Dropdown (accessible & full compliance with dropdown requirement) */}
                    <div className="relative mt-2">
                        <select
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                            className="w-full bg-slate-800/50 border border-slate-700/60 text-slate-300 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                        >
                            <option value="LinkedIn" className="bg-slate-900">LinkedIn (Professional & Informative)</option>
                            <option value="Instagram" className="bg-slate-900">Instagram (Engaging Captions & Emojis)</option>
                            <option value="Twitter (X)" className="bg-slate-900">Twitter / X (Concise & Punchy Hooks)</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                            ▼
                        </div>
                    </div>
                </div>

                {/* 3. Length & Language Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Length */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-300 ml-1">Length</label>
                        <div className="relative">
                            <select
                                value={length}
                                onChange={(e) => setLength(e.target.value)}
                                className="w-full bg-slate-800/80 border border-slate-700 hover:border-slate-600 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all appearance-none text-sm font-medium cursor-pointer"
                            >
                                <option value="Short" className="bg-slate-900">Short (Punchy / Quick read)</option>
                                <option value="Medium" className="bg-slate-900">Medium (Standard depth)</option>
                                <option value="Long" className="bg-slate-900">Long (Detailed storytelling / thread)</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                                ▼
                            </div>
                        </div>
                    </div>

                    {/* Language */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-300 ml-1">Language</label>
                        <div className="relative">
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="w-full bg-slate-800/80 border border-slate-700 hover:border-slate-600 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all appearance-none text-sm font-medium cursor-pointer"
                            >
                                <option value="English" className="bg-slate-900">English</option>
                                <option value="Hinglish" className="bg-slate-900">Hinglish (Hindi + English)</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                                ▼
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Generate Button */}
                <button
                    onClick={onGenerate}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-xl shadow-indigo-600/30 transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 group cursor-pointer text-base"
                >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Crafting your {platform} post...</span>
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5 text-indigo-200 group-hover:rotate-12 transition-transform" />
                            <span>Generate Post</span>
                        </>
                    )}
                </button>
            </div>
        </motion.div>
    );
};

export default GeneratorCard;
