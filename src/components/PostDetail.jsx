import React, { useState } from 'react';
import { X, Camera, LayoutGrid, MessageSquare, Palette, BookOpen, Copy, Check, Hash, Star, Edit2, ClipboardCheck } from './Icons.jsx';

const DEFAULT_CHECKLIST = {
    caption_copied: false,
    image_downloaded: false,
    uploaded_to_instagram: false,
    hashtags_added: false,
    published_at: null,
};

const CHECKLIST_ITEMS = [
    { key: 'caption_copied', label: '캡션 복사 완료' },
    { key: 'image_downloaded', label: '이미지 다운로드 완료' },
    { key: 'uploaded_to_instagram', label: '인스타그램 업로드 완료' },
    { key: 'hashtags_added', label: '해시태그 추가 완료' },
];

export const PostDetail = ({ post, activeWeek, copied, onClose, onCopy, onEdit, dbConnected, onUpdateChecklist }) => {
    const [checklist, setChecklist] = useState(() => {
        const saved = post?.publishChecklist;
        return saved && typeof saved === 'object' ? { ...DEFAULT_CHECKLIST, ...saved } : { ...DEFAULT_CHECKLIST };
    });

    if (!post) return null;

    const handleCopyCaption = () => {
        onCopy(post.caption);
        if (dbConnected && onUpdateChecklist && post.dbId) {
            const updated = { ...checklist, caption_copied: true };
            setChecklist(updated);
            onUpdateChecklist(post.dbId, updated);
        }
    };

    const handleCheckToggle = (key) => {
        if (!dbConnected || !onUpdateChecklist || !post.dbId) return;
        const updated = { ...checklist, [key]: !checklist[key] };
        // If all checked, set published_at
        const allChecked = CHECKLIST_ITEMS.every(item => updated[item.key]);
        if (allChecked && !updated.published_at) {
            updated.published_at = new Date().toISOString();
        } else if (!allChecked) {
            updated.published_at = null;
        }
        setChecklist(updated);
        onUpdateChecklist(post.dbId, updated, allChecked);
    };

    const completedCount = CHECKLIST_ITEMS.filter(item => checklist[item.key]).length;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm" style={{background:'rgba(51,51,51,0.6)'}}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                <div className="p-6 md:p-8 bg-gray-800 text-white flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${post.type === '릴스' ? 'bg-purple-500' : post.type === '캐러셀' ? 'bg-blue-500' : ''}`}
                            style={post.type !== '릴스' && post.type !== '캐러셀' ? {background:'#E8703A'} : {}}>
                            {post.type === '릴스' ? <Camera size={24} /> : post.type === '캐러셀' ? <LayoutGrid size={24} /> : <MessageSquare size={24} />}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest" style={{color:'#E8703A'}}>
                                <span>Week {activeWeek}</span><span className="opacity-30">|</span><span>{post.day}요일 {post.type}</span>
                            </div>
                            <h2 className="text-2xl font-bold">{post.title}</h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {dbConnected && onEdit && (
                            <button onClick={() => onEdit(post)}
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-orange-500/80 flex items-center justify-center transition-colors" title="수정">
                                <Edit2 size={16} />
                            </button>
                        )}
                        <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"><X size={20} /></button>
                    </div>
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
                                    <div className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-tight">권장 사진 에셋</div>
                                    <div className="text-sm font-semibold">{post.asset}</div>
                                </div>
                                <div className="p-4 rounded-2xl border" style={{background:'rgba(232,112,58,0.05)', borderColor:'rgba(232,112,58,0.2)'}}>
                                    <div className="text-[10px] font-bold uppercase mb-1 tracking-tight" style={{color:'#E8703A'}}>디자인 스타일</div>
                                    <div className="text-sm font-semibold">{post.design}</div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 bg-gray-900 rounded-3xl text-white">
                            <div className="text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest">AI GENERATION PROMPT</div>
                            <div className="text-xs leading-relaxed font-mono opacity-80 italic">{post.aiGuide}</div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <BookOpen size={16} /> 업로드용 본문 (수정본)
                            </h3>
                            <button onClick={handleCopyCaption}
                                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full hover:bg-orange-50" style={{color:'#E8703A'}}>
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                {copied ? "복사됨!" : "텍스트 복사"}
                            </button>
                        </div>
                        <div className="p-6 rounded-3xl border relative" style={{background:'#FFF8F0', borderColor:'rgba(232,112,58,0.2)'}}>
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

                    {/* Phase 3: 발행 체크리스트 */}
                    {dbConnected && post.dbId && (
                        <section className="space-y-4">
                            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <ClipboardCheck size={16} /> 발행 체크리스트
                            </h3>
                            <div className="p-5 rounded-2xl border border-gray-100 bg-gray-50 space-y-3">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex-grow bg-gray-200 rounded-full h-2 overflow-hidden">
                                        <div className="h-full rounded-full transition-all duration-500"
                                            style={{
                                                width: `${(completedCount / CHECKLIST_ITEMS.length) * 100}%`,
                                                background: completedCount === CHECKLIST_ITEMS.length ? '#22c55e' : '#E8703A'
                                            }} />
                                    </div>
                                    <span className="text-xs font-bold text-gray-400">{completedCount}/{CHECKLIST_ITEMS.length}</span>
                                </div>
                                {CHECKLIST_ITEMS.map((item) => (
                                    <label key={item.key}
                                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${checklist[item.key] ? 'bg-green-50 border border-green-100' : 'bg-white border border-gray-100 hover:border-orange-200'}`}>
                                        <input type="checkbox" checked={checklist[item.key] || false}
                                            onChange={() => handleCheckToggle(item.key)}
                                            className="w-4 h-4 rounded accent-orange-500" />
                                        <span className={`text-sm font-medium ${checklist[item.key] ? 'text-green-700 line-through' : 'text-gray-700'}`}>
                                            {item.label}
                                        </span>
                                        {item.key === 'caption_copied' && !checklist[item.key] && (
                                            <span className="text-[10px] text-gray-400 ml-auto">위 "텍스트 복사" 클릭 시 자동 체크</span>
                                        )}
                                    </label>
                                ))}
                                {checklist.published_at && (
                                    <div className="mt-2 text-xs text-green-600 font-bold text-center">
                                        발행 완료 ({new Date(checklist.published_at).toLocaleString('ko-KR')})
                                    </div>
                                )}
                            </div>
                        </section>
                    )}
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
