import React, { useState } from 'react';
import {
    Copy,
    Check,
    ThumbsUp,
    MessageSquare,
    Share2,
    MoreHorizontal,
    Heart,
    Bookmark,
    Send,
    Repeat,
    MessageCircle,
    RefreshCw,
    Linkedin,
    Instagram,
    Twitter
} from 'lucide-react';
import { motion } from 'framer-motion';

const ResultCard = ({ content, platform = 'LinkedIn', onRegenerate, isRegenerating = false }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!content) return;
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const wordCount = content ? content.trim().split(/\s+/).filter(Boolean).length : 0;
    const charCount = content ? content.length : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl mx-auto mt-8 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl relative z-20"
        >
            {/* Top Toolbar / Platform Header */}
            <div className="p-4 border-b border-slate-800 flex justify-between items-center gap-4 bg-slate-900/60">
                {/* Platform Identification & Profile */}
                <div className="flex items-center gap-3">
                    {platform === 'Instagram' ? (
                        <div className="p-0.5 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600">
                            <div className="w-11 h-11 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm">
                                CB
                            </div>
                        </div>
                    ) : platform === 'Twitter (X)' ? (
                        <div className="w-11 h-11 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-bold text-sm">
                            CB
                        </div>
                    ) : (
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-600/30">
                            CB
                        </div>
                    )}

                    <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="font-semibold text-white text-sm">
                                {platform === 'Instagram' ? 'codebasics' : 'Codebasics'}
                            </h3>
                            {platform === 'LinkedIn' && (
                                <span className="text-blue-400 text-xs font-medium">● 1st</span>
                            )}
                            {platform === 'Twitter (X)' && (
                                <span className="text-slate-400 text-xs">@codebasics</span>
                            )}
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700 ml-1">
                                {platform === 'Instagram' && <Instagram className="w-2.5 h-2.5 text-pink-400" />}
                                {platform === 'Twitter (X)' && <Twitter className="w-2.5 h-2.5 text-sky-400" />}
                                {platform === 'LinkedIn' && <Linkedin className="w-2.5 h-2.5 text-blue-400" />}
                                {platform} Preview
                            </span>
                        </div>
                        <p className="text-slate-400 text-xs">
                            {platform === 'LinkedIn'
                                ? 'Top Voice | EdTech • 1h • 🌐'
                                : platform === 'Instagram'
                                ? 'Digital Creator • Original audio'
                                : 'EdTech & AI insights • Just now'}
                        </p>
                    </div>
                </div>

                {/* Post Action Buttons: Regenerate & Copy */}
                <div className="flex items-center gap-2">
                    {onRegenerate && (
                        <button
                            onClick={onRegenerate}
                            disabled={isRegenerating}
                            title="Regenerate this post"
                            className="px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium transition-all border border-slate-700 flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                        >
                            <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin text-indigo-400' : ''}`} />
                            <span className="hidden sm:inline">Regenerate</span>
                        </button>
                    )}
                    <button
                        onClick={handleCopy}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                            copied
                                ? 'bg-emerald-600/30 text-emerald-400 border-emerald-500/50'
                                : 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border-blue-500/30 shadow-sm'
                        }`}
                    >
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? 'Copied!' : 'Copy Post'}</span>
                    </button>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-5 text-slate-200 whitespace-pre-wrap leading-relaxed text-sm sm:text-base font-normal selection:bg-indigo-600 selection:text-white">
                {content}
            </div>

            {/* Post Metrics / Word Count Footer */}
            <div className="px-5 py-2 bg-slate-900/40 border-t border-slate-800/80 flex items-center justify-between text-slate-400 text-xs">
                <div className="flex items-center gap-3">
                    <span>{wordCount} words</span>
                    <span>•</span>
                    <span>{charCount} characters</span>
                </div>
                {platform === 'Twitter (X)' && (
                    <span className={`text-[11px] font-medium ${charCount > 280 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {charCount <= 280 ? 'Fits single tweet (280 chars)' : 'Thread / Long tweet format'}
                    </span>
                )}
            </div>

            {/* Platform-Specific Interaction Footer Bar */}
            {platform === 'LinkedIn' && (
                <>
                    <div className="px-4 py-2 border-t border-slate-800 flex items-center justify-between text-slate-400 text-xs">
                        <div className="flex items-center gap-1.5">
                            <div className="flex -space-x-1">
                                <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[8px] text-white">👍</div>
                                <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[8px] text-white">💡</div>
                                <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-[8px] text-white">❤️</div>
                            </div>
                            <span className="hover:text-blue-400 hover:underline cursor-pointer">1,842</span>
                        </div>
                        <div className="flex gap-3">
                            <span className="hover:text-blue-400 hover:underline cursor-pointer">94 comments</span>
                            <span className="hover:text-blue-400 hover:underline cursor-pointer">28 reposts</span>
                        </div>
                    </div>
                    <div className="px-2 py-1 border-t border-slate-800 flex justify-between">
                        <button className="flex-1 py-2.5 hover:bg-slate-800/60 rounded-lg flex items-center justify-center gap-2 text-slate-400 text-xs sm:text-sm font-medium transition-colors">
                            <ThumbsUp className="w-4 h-4" /> Like
                        </button>
                        <button className="flex-1 py-2.5 hover:bg-slate-800/60 rounded-lg flex items-center justify-center gap-2 text-slate-400 text-xs sm:text-sm font-medium transition-colors">
                            <MessageSquare className="w-4 h-4" /> Comment
                        </button>
                        <button className="flex-1 py-2.5 hover:bg-slate-800/60 rounded-lg flex items-center justify-center gap-2 text-slate-400 text-xs sm:text-sm font-medium transition-colors">
                            <Repeat className="w-4 h-4" /> Repost
                        </button>
                        <button className="flex-1 py-2.5 hover:bg-slate-800/60 rounded-lg flex items-center justify-center gap-2 text-slate-400 text-xs sm:text-sm font-medium transition-colors">
                            <Send className="w-4 h-4" /> Send
                        </button>
                    </div>
                </>
            )}

            {platform === 'Instagram' && (
                <div className="px-4 py-3 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-slate-300">
                        <button className="hover:text-pink-500 transition-colors">
                            <Heart className="w-5 h-5" />
                        </button>
                        <button className="hover:text-blue-400 transition-colors">
                            <MessageCircle className="w-5 h-5" />
                        </button>
                        <button className="hover:text-indigo-400 transition-colors">
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                    <button className="hover:text-amber-400 transition-colors text-slate-300">
                        <Bookmark className="w-5 h-5" />
                    </button>
                </div>
            )}

            {platform === 'Twitter (X)' && (
                <div className="px-4 py-2.5 border-t border-slate-800 flex items-center justify-around text-slate-400">
                    <button className="flex items-center gap-1.5 hover:text-sky-400 text-xs transition-colors">
                        <MessageCircle className="w-4 h-4" /> <span>32</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-emerald-400 text-xs transition-colors">
                        <Repeat className="w-4 h-4" /> <span>14</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-pink-500 text-xs transition-colors">
                        <Heart className="w-4 h-4" /> <span>188</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-sky-400 text-xs transition-colors">
                        <Bookmark className="w-4 h-4" />
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-sky-400 text-xs transition-colors">
                        <Share2 className="w-4 h-4" />
                    </button>
                </div>
            )}
        </motion.div>
    );
};

export default ResultCard;
