import React from 'react';
import { motion } from 'framer-motion';

const SkeletonPost = () => (
    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 mb-4 w-full max-w-2xl mx-auto opacity-20">
        <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-slate-600/50" />
            <div className="flex-1">
                <div className="h-3 w-32 bg-slate-600/50 rounded mb-2" />
                <div className="h-2 w-20 bg-slate-600/50 rounded" />
            </div>
        </div>
        <div className="space-y-2">
            <div className="h-3 w-full bg-slate-600/50 rounded" />
            <div className="h-3 w-full bg-slate-600/50 rounded" />
            <div className="h-3 w-3/4 bg-slate-600/50 rounded" />
        </div>
    </div>
);

const SkeletonFeed = () => {
    return (
        <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-transparent to-slate-900 z-10" />

            <motion.div
                className="flex flex-col items-center pt-10"
                animate={{ y: [0, -1000] }}
                transition={{
                    repeat: Infinity,
                    duration: 40,
                    ease: "linear"
                }}
            >
                {/* Duplicate items for seamless loop */}
                {[...Array(10)].map((_, i) => (
                    <SkeletonPost key={i} />
                ))}
                {[...Array(10)].map((_, i) => (
                    <SkeletonPost key={`dup-${i}`} />
                ))}
            </motion.div>
        </div>
    );
};

export default SkeletonFeed;
