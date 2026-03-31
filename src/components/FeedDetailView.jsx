import React from 'react';
import {
    ChevronLeft, MoreHorizontal, MapPin, Volume2, Heart, MessageCircle,
    Send, Bookmark, Copy, Check
} from './InstagramIcons';

export const FeedDetailView = ({ post, onBack }) => (
    <div className="max-w-2xl mx-auto bg-white min-h-screen pb-20">
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-30 flex items-center justify-between p-4">
            <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full">
                <ChevronLeft size={24} />
            </button>
            <div className="text-center">
                <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">게시물 상세</div>
                <h2 className="font-black tracking-tight text-sm uppercase">{post.title}</h2>
            </div>
            <div className="w-10"></div>
        </div>
        <div className="flex flex-col">
            <div className="flex items-center justify-between p-3 border-b border-gray-50">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full p-0.5" style={{background:'linear-gradient(135deg,#E8703A,#F5A070)'}}>
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-xs font-black border border-white" style={{color:'#E8703A'}}>IM</div>
                    </div>
                    <div>
                        <div className="text-sm font-bold flex items-center gap-1 uppercase">
                            im.aesthetic.official <Check size={12} className="bg-blue-500 text-white rounded-full p-0.5" />
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-0.5 italic"><MapPin size={10} /> 대구 수성구 범어동 마크팰리스</div>
                    </div>
                </div>
                <MoreHorizontal size={20} className="text-gray-400" />
            </div>
            <div className="relative w-full bg-gray-50" style={{aspectRatio:'4/5'}}>
                {post.type === 'reel' && (
                    <div className="absolute top-4 right-4 z-10 bg-black/40 p-2 rounded-full text-white backdrop-blur-sm">
                        <Volume2 size={16} />
                    </div>
                )}
                <img src={post.image} alt="" className="w-full h-full object-cover" />
                {post.type === 'carousel' && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                        <div className="w-3 h-1.5 rounded-full" style={{background:'#E8703A'}}></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
                    </div>
                )}
            </div>
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <Heart size={26} className="hover:text-red-500 cursor-pointer" />
                        <MessageCircle size={26} className="hover:text-gray-400 cursor-pointer" />
                        <Send size={26} className="hover:text-gray-400 cursor-pointer" />
                    </div>
                    <Bookmark size={26} className="cursor-pointer" style={{color:'#E8703A'}} />
                </div>
                <div className="text-sm font-bold mb-3">좋아요 1,248개</div>
                <div className="p-4 rounded-2xl border mb-4" style={{background:'rgba(255,248,240,0.5)',borderColor:'rgba(232,112,58,0.2)'}}>
                    <div className="flex items-center justify-between mb-3 border-b pb-2" style={{borderColor:'rgba(232,112,58,0.3)'}}>
                        <span className="text-xs font-black tracking-widest uppercase italic" style={{color:'#E8703A'}}>Instagram Caption Copy</span>
                        <button onClick={() => {
                            const text = post.caption + "\n\n" + post.hashtags;
                            navigator.clipboard.writeText(text).then(() => {
                                const btn = document.activeElement;
                                const orig = btn.innerHTML;
                                btn.innerHTML = '✓ 복사됨!';
                                setTimeout(() => { btn.innerHTML = orig; }, 2000);
                            });
                        }} className="flex items-center gap-1 text-xs font-bold text-white px-2 py-1 rounded-md cursor-pointer" style={{background:'#E8703A'}}>
                            <Copy size={10} /> 본문 복사
                        </button>
                    </div>
                    <div className="text-sm leading-relaxed mb-4 text-gray-800 whitespace-pre-line">
                        <span className="font-bold text-gray-900 underline decoration-orange-400 underline-offset-4">im.aesthetic.official</span>
                        {"\n"}{post.caption}
                    </div>
                    <div className="text-sm text-blue-800 font-medium leading-relaxed cursor-pointer hover:underline">
                        {post.hashtags}
                    </div>
                </div>
                <div className="text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded" style={{background:'rgba(232,112,58,0.1)',color:'#E8703A'}}>{post.phase}</span>
                        <span>Week {post.week} - {post.day}</span>
                    </div>
                    <span>2026년 3월 예정</span>
                </div>
            </div>
            <div className="border-t border-gray-50 px-4 py-4 mt-2 mb-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400 border border-gray-200">You</div>
                    <div className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-xs text-gray-400 border border-gray-100 italic">댓글을 달아 고객과 소통해보세요...</div>
                </div>
            </div>
        </div>
    </div>
);
