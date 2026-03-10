import React from 'react';
import { Grid, Play, User, Heart, MessageCircle, Copy } from './InstagramIcons';

export const GridView = ({ posts, onPostClick }) => (
    <div className="max-w-2xl mx-auto py-2">
        <div className="flex justify-center border-t border-gray-200 mb-2">
            <button className="flex items-center gap-2 py-4 border-t border-black -mt-px text-xs font-bold tracking-widest uppercase">
                <Grid size={14} /> 게시물
            </button>
            <button className="flex items-center gap-2 py-4 text-gray-400 text-xs font-bold tracking-widest uppercase mx-16">
                <Play size={14} /> 릴스
            </button>
            <button className="flex items-center gap-2 py-4 text-gray-400 text-xs font-bold tracking-widest uppercase">
                <User size={14} /> 태그됨
            </button>
        </div>
        <div className="grid grid-cols-3 gap-0.5 md:gap-1">
            {posts.map((post, index) => (
                <React.Fragment key={post.id}>
                    {index % 9 === 0 && (
                        <div className="col-span-3 px-3 py-2 border-y flex items-center justify-between" style={{background:'#FFF8F0', borderColor:'rgba(255,140,66,0.1)'}}>
                            <span className="text-xs font-black uppercase tracking-widest" style={{color:'#FF8C42'}}>{post.phase}</span>
                            <span className="text-xs text-gray-400 font-bold uppercase">Week {post.week} ~</span>
                        </div>
                    )}
                    <div
                        className="relative group cursor-pointer overflow-hidden bg-gray-100 shadow-inner"
                        style={{aspectRatio:'3/4'}}
                        onClick={() => onPostClick(post)}
                    >
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute top-3 right-3 flex flex-col gap-1 items-end" style={{filter:'drop-shadow(0 1px 2px rgba(0,0,0,0.5))'}}>
                            {post.type === 'reel' && <Play size={18} className="text-white" />}
                            {post.type === 'carousel' && <Copy size={18} className="text-white" />}
                        </div>
                        {post.slideCount && (
                            <div className="absolute top-3 left-3 px-1.5 py-0.5 rounded text-[10px] font-black text-white" style={{background:'#FF8C42', filter:'drop-shadow(0 1px 2px rgba(0,0,0,0.3))'}}>
                                {post.slideCount}장
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                            <div className="flex items-center gap-6 font-bold">
                                <div className="flex items-center gap-1"><Heart size={20} fill="white" /> 124</div>
                                <div className="flex items-center gap-1"><MessageCircle size={20} fill="white" /> 18</div>
                            </div>
                            <div className="text-xs mt-2 font-bold opacity-80">Click to read caption</div>
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    </div>
);
