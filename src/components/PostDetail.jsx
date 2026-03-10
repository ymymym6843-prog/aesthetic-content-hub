import React from 'react';
import { X, Camera, LayoutGrid, MessageSquare, Palette, BookOpen, Copy, Check, Hash, Star } from './Icons.jsx';

export const PostDetail = ({ post, activeWeek, copied, onClose, onCopy }) => {
    if (!post) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm" style={{background:'rgba(51,51,51,0.6)'}}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                <div className="p-6 md:p-8 bg-gray-800 text-white flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${post.type === '릴스' ? 'bg-purple-500' : post.type === '캐러셀' ? 'bg-blue-500' : ''}`}
                            style={post.type !== '릴스' && post.type !== '캐러셀' ? {background:'#FF8C42'} : {}}>
                            {post.type === '릴스' ? <Camera size={24} /> : post.type === '캐러셀' ? <LayoutGrid size={24} /> : <MessageSquare size={24} />}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest" style={{color:'#FF8C42'}}>
                                <span>Week {activeWeek}</span><span className="opacity-30">|</span><span>{post.day}요일 {post.type}</span>
                            </div>
                            <h2 className="text-2xl font-bold">{post.title}</h2>
                        </div>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"><X size={20} /></button>
                </div>

                <div className="flex-grow overflow-y-auto p-8 md:p-10 space-y-8 no-scrollbar">
                    {post.image && (
                        <section>
                            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                                <img src={post.image} alt={post.title} className="w-full max-h-80 object-cover" />
                            </div>
                        </section>
                    )}

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <Palette size={16} /> 이미지 제작 가이드
                            </h3>
                            <div className="space-y-3">
                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-tight">📸 권장 사진 에셋</div>
                                    <div className="text-sm font-semibold">{post.asset}</div>
                                </div>
                                <div className="p-4 rounded-2xl border" style={{background:'rgba(255,140,66,0.05)', borderColor:'rgba(255,140,66,0.2)'}}>
                                    <div className="text-[10px] font-bold uppercase mb-1 tracking-tight" style={{color:'#FF8C42'}}>🎨 디자인 스타일</div>
                                    <div className="text-sm font-semibold">{post.design}</div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 bg-gray-900 rounded-3xl text-white">
                            <div className="text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest">🪄 AI GENERATION PROMPT</div>
                            <div className="text-xs leading-relaxed font-mono opacity-80 italic">{post.aiGuide}</div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <BookOpen size={16} /> 업로드용 본문 (수정본)
                            </h3>
                            <button onClick={() => onCopy(post.caption)}
                                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full hover:bg-orange-50" style={{color:'#FF8C42'}}>
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                {copied ? "복사됨!" : "텍스트 복사"}
                            </button>
                        </div>
                        <div className="p-6 rounded-3xl border relative" style={{background:'#FFF8F0', borderColor:'rgba(255,140,66,0.2)'}}>
                            <div className="absolute top-4 right-4 text-orange-200"><Star size={24} /></div>
                            <div className="text-base leading-relaxed whitespace-pre-line text-gray-700 font-medium">{post.caption}</div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <Hash size={16} /> 추천 해시태그
                        </h3>
                        <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex flex-wrap gap-2">
                            {post.tags.split(' ').map((tag, i) => (
                                <span key={i} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-500">{tag}</span>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50 text-center shrink-0">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Tip: 2026년 인스타그램 그리드 비율(3:4)을 고려하여 핵심 요소는 수직 중앙에 배치하세요.
                    </p>
                </div>
            </div>
        </div>
    );
};
