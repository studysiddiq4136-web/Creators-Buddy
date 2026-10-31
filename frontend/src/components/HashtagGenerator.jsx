import React, { useState } from 'react';
import { Hash, Sparkles, Copy, Check, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HashtagGenerator = ({ postContent, platform, topic }) => {
    const [hashtags, setHashtags] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [copiedAll, setCopiedAll] = useState(false);
    const [copiedTag, setCopiedTag] = useState(null);
    const [error, setError] = useState(null);

    const handleGenerateHashtags = async () => {
        if (!postContent) return;
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8000/generate-hashtags', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    post: postContent,
                    platform: platform || 'LinkedIn',
                    topic: topic || ''
                }),
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.detail || 'Failed to generate hashtags');
            }

            const data = await response.json();
            if (data.hashtags && Array.isArray(data.hashtags)) {
                setHashtags(data.hashtags);
            } else {
                setHashtags([]);
            }
        } catch (err) {
            console.error('Error generating hashtags:', err);
            setError(err.message || 'Error generating hashtags. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopyAll = () => {
        if (!hashtags.length) return;
        const allText = hashtags.join(' ');
        navigator.clipboard.writeText(allText);
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 2000);
    };

    const handleCopySingle = (tag) => {
        navigator.clipboard.writeText(tag);
        setCopiedTag(tag);
        setTimeout(() => setCopiedTag(null), 1500);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl mx-auto mt-6 bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl relative z-20"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-lg shadow-purple-600/20 text-white">
                        <Hash className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            AI Hashtag Generator
                            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-medium">
                                {platform}
                            </span>
                        </h3>
                        <p className="text-xs text-slate-400">
                            Context-aware, high-reach hashtags optimized for {platform}
                        </p>
                    </div>
                </div>

                {/* Initial Generate Button or Actions when hashtags exist */}
                {hashtags.length === 0 ? (
                    <button
                        onClick={handleGenerateHashtags}
                        disabled={isLoading || !postContent}
                        className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-purple-600/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Generating...</span>
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4 text-purple-200" />
                                <span>Generate Hashtags ✨</span>
                            </>
                        )}
                    </button>
                ) : (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleGenerateHashtags}
                            disabled={isLoading}
                            title="Regenerate new hashtags"
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                        >
                            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                            <span>Regenerate</span>
                        </button>
                        <button
                            onClick={handleCopyAll}
                            className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-lg shadow-md shadow-purple-600/30 transition-all flex items-center gap-1.5"
                        >
                            {copiedAll ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedAll ? 'Copied All!' : 'Copy All'}</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs">
                    {error}
                </div>
            )}

            {/* Content Area */}
            <div className="mt-4">
                {isLoading && hashtags.length === 0 ? (
                    <div className="py-8 flex flex-col items-center justify-center gap-2 text-slate-400">
                        <div className="w-6 h-6 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                        <span className="text-xs">Analyzing post & crafting high-impact hashtags...</span>
                    </div>
                ) : hashtags.length > 0 ? (
                    <div>
                        <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                            <span>Click any hashtag to copy individually</span>
                            <span>{hashtags.length} hashtags generated</span>
                        </div>
                        {/* Hashtag Chips */}
                        <div className="flex flex-wrap gap-2">
                            <AnimatePresence>
                                {hashtags.map((tag, idx) => {
                                    const isThisCopied = copiedTag === tag;
                                    return (
                                        <motion.button
                                            key={`${tag}-${idx}`}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.03 }}
                                            onClick={() => handleCopySingle(tag)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 group cursor-pointer ${
                                                isThisCopied
                                                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                                                    : 'bg-slate-800/80 hover:bg-purple-900/40 text-purple-300 hover:text-purple-200 border border-slate-700 hover:border-purple-500/50'
                                            }`}
                                        >
                                            <span>{tag}</span>
                                            {isThisCopied ? (
                                                <Check className="w-3 h-3 text-white" />
                                            ) : (
                                                <Copy className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                                            )}
                                        </motion.button>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </div>
                ) : (
                    <div className="py-4 text-center text-xs text-slate-500">
                        Click <span className="text-purple-400 font-medium">"Generate Hashtags ✨"</span> above to produce ~10–15 targeted hashtags for this post.
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default HashtagGenerator;
