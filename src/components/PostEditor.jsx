import React, { useState, useRef } from 'react';
import { X, Save, Upload, Image, Trash2 } from './Icons.jsx';

const TYPES = ['이미지', '캐러셀', '릴스'];
const DAYS = ['화', '목', '토'];
const STATUSES = ['draft', 'ready', 'published'];
const STATUS_LABELS = { draft: '초안', ready: '준비완료', published: '발행됨' };

export const PostEditor = ({ post, activeWeek, onSave, onDelete, onClose, uploading }) => {
    const isNew = !post;
    const [form, setForm] = useState({
        title: post?.title || '',
        day: post?.day || '화',
        type: post?.type || '이미지',
        desc: post?.desc || '',
        caption: post?.caption || '',
        tags: post?.tags || '',
        slideCount: post?.slideCount || 0,
        templateType: post?.templateType || '',
        status: post?.status || 'draft',
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(post?.image || null);
    const [saving, setSaving] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const fileRef = useRef(null);

    const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (ev) => setImagePreview(ev.target.result);
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title.trim()) return;
        setSaving(true);
        try {
            await onSave({ ...form, imageFile, dbId: post?.dbId }, isNew);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirmDelete) {
            setConfirmDelete(true);
            return;
        }
        setSaving(true);
        try {
            await onDelete(post.dbId);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm" style={{ background: 'rgba(51,51,51,0.6)' }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-6 bg-gray-800 text-white flex items-center justify-between shrink-0">
                    <div>
                        <div className="text-xs font-black uppercase tracking-widest" style={{ color: '#FF8C42' }}>
                            Week {activeWeek} {isNew ? '| NEW POST' : '| EDIT POST'}
                        </div>
                        <h2 className="text-xl font-bold mt-1">{isNew ? '새 게시물 작성' : `"${post.title}" 수정`}</h2>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 md:p-8 space-y-5 no-scrollbar">
                    {/* Row: Day, Type, Status */}
                    <div className="grid grid-cols-3 gap-4">
                        <label className="block">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">요일</span>
                            <select value={form.day} onChange={e => set('day', e.target.value)}
                                className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-300">
                                {DAYS.map(d => <option key={d} value={d}>{d}요일</option>)}
                            </select>
                        </label>
                        <label className="block">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">유형</span>
                            <select value={form.type} onChange={e => set('type', e.target.value)}
                                className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-300">
                                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </label>
                        <label className="block">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">상태</span>
                            <select value={form.status} onChange={e => set('status', e.target.value)}
                                className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-300">
                                {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                            </select>
                        </label>
                    </div>

                    {/* Title */}
                    <label className="block">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">제목 *</span>
                        <input type="text" value={form.title} onChange={e => set('title', e.target.value)}
                            placeholder="게시물 제목"
                            className="mt-1 w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-300"
                            required />
                    </label>

                    {/* Description */}
                    <label className="block">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">설명</span>
                        <input type="text" value={form.desc} onChange={e => set('desc', e.target.value)}
                            placeholder="게시물 설명"
                            className="mt-1 w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-300" />
                    </label>

                    {/* Image */}
                    <div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-2">이미지</span>
                        <div className="flex items-start gap-4">
                            {imagePreview ? (
                                <div className="w-32 h-24 rounded-xl overflow-hidden border border-gray-200 shrink-0">
                                    <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                                </div>
                            ) : (
                                <div className="w-32 h-24 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center shrink-0">
                                    <Image size={24} className="text-gray-300" />
                                </div>
                            )}
                            <div className="flex flex-col gap-2">
                                <button type="button" onClick={() => fileRef.current?.click()}
                                    className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                                    <Upload size={14} /> 이미지 업로드
                                </button>
                                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                <span className="text-[11px] text-gray-400">PNG, JPG, WebP (최대 5MB)</span>
                            </div>
                        </div>
                    </div>

                    {/* Slide count + Template (for carousel) */}
                    {form.type === '캐러셀' && (
                        <div className="grid grid-cols-2 gap-4">
                            <label className="block">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">슬라이드 수</span>
                                <input type="number" min="2" max="10" value={form.slideCount} onChange={e => set('slideCount', parseInt(e.target.value) || 0)}
                                    className="mt-1 w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-300" />
                            </label>
                            <label className="block">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">템플릿 유형</span>
                                <input type="text" value={form.templateType} onChange={e => set('templateType', e.target.value)}
                                    placeholder="예: 카드 인포그래픽형"
                                    className="mt-1 w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-300" />
                            </label>
                        </div>
                    )}

                    {/* Caption */}
                    <label className="block">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">본문 캡션</span>
                        <textarea value={form.caption} onChange={e => set('caption', e.target.value)}
                            rows={6} placeholder="인스타그램 본문 텍스트"
                            className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-300 resize-none" />
                    </label>

                    {/* Tags */}
                    <label className="block">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">해시태그</span>
                        <input type="text" value={form.tags} onChange={e => set('tags', e.target.value)}
                            placeholder="#태그1 #태그2 #태그3"
                            className="mt-1 w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-300" />
                    </label>
                </form>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-between shrink-0">
                    <div>
                        {!isNew && post?.dbId && (
                            <button type="button" onClick={handleDelete} disabled={saving}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors ${confirmDelete ? 'bg-red-500 text-white' : 'text-red-400 hover:bg-red-50'}`}>
                                <Trash2 size={14} />
                                {confirmDelete ? '정말 삭제하시겠습니까?' : '삭제'}
                            </button>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <button type="button" onClick={onClose}
                            className="px-5 py-2 rounded-xl text-sm font-bold text-gray-400 hover:bg-gray-100 transition-colors">
                            취소
                        </button>
                        <button type="submit" onClick={handleSubmit} disabled={saving || !form.title.trim()}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                            style={{ background: '#FF8C42' }}>
                            <Save size={14} />
                            {saving ? '저장 중...' : (isNew ? '게시물 추가' : '변경사항 저장')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
