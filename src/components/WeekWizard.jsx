/**
 * WeekWizard.jsx
 * 새 주차 콘텐츠를 3단계로 생성하는 마법사 모달 컴포넌트
 * Step 1: 주차 설정 (테마·프로그램 선택)
 * Step 2: 포스트 미리보기 및 편집
 * Step 3: 확인 & 생성
 */
import React, { useState } from 'react';
import { X, ChevronRight, Check, Sparkles, Plus } from './Icons.jsx';
import { PROGRAMS, generatePostSkeleton, DAY_GUIDES } from '../lib/templates.js';

// ──────────────────────────────────────────────
// 헬퍼: 캡션 내 [placeholder] 구간을 주황색 강조 스팬으로 변환
// ──────────────────────────────────────────────
function HighlightedCaption({ text, maxLength = 200 }) {
    const display = text.length > maxLength ? text.slice(0, maxLength) + '…' : text;
    const parts = display.split(/(\[[^\]]+\])/g);
    return (
        <span>
            {parts.map((part, i) =>
                /^\[[^\]]+\]$/.test(part) ? (
                    <mark
                        key={i}
                        className="rounded px-0.5 font-semibold"
                        style={{ background: 'rgba(255,140,66,0.18)', color: '#FF8C42' }}
                    >
                        {part}
                    </mark>
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </span>
    );
}

// ──────────────────────────────────────────────
// Step 2: 개별 포스트 카드 (클릭해 인라인 편집 토글)
// ──────────────────────────────────────────────
function PostPreviewCard({ post, index, onChange }) {
    const [expanded, setExpanded] = useState(false);

    const dayColor = { 화: '#3B82F6', 목: '#10B981', 토: '#F59E0B' };
    const dayGuide = DAY_GUIDES[post.day];

    const set = (key, val) =>
        onChange(index, { ...post, [key]: val });

    return (
        <div
            className="rounded-2xl border overflow-hidden transition-shadow"
            style={{
                borderColor: expanded ? '#FF8C42' : '#E5E7EB',
                boxShadow: expanded ? '0 0 0 2px rgba(255,140,66,0.25)' : undefined,
            }}
        >
            {/* 카드 헤더 — 항상 표시 */}
            <button
                type="button"
                onClick={() => setExpanded(v => !v)}
                className="w-full flex items-center gap-3 p-4 text-left hover:bg-orange-50/50 transition-colors"
            >
                {/* 요일 배지 */}
                <span
                    className="shrink-0 w-10 h-10 rounded-xl text-white text-sm font-black flex items-center justify-center"
                    style={{ background: dayColor[post.day] ?? '#6B7280' }}
                >
                    {post.day}
                </span>

                <div className="flex-1 min-w-0">
                    {/* 유형 + 가이드 레이블 */}
                    <div className="flex items-center gap-2 mb-0.5">
                        <span
                            className="text-[10px] font-bold uppercase tracking-widest"
                            style={{ color: '#FF8C42' }}
                        >
                            {post.type}
                        </span>
                        <span className="text-[10px] text-gray-400">{dayGuide?.label ?? ''}</span>
                    </div>
                    {/* 제목 */}
                    <p className="text-sm font-bold text-gray-800 truncate">
                        {post.title || '(제목 없음)'}
                    </p>
                    {/* 캡션 미리보기 */}
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                        <HighlightedCaption text={post.caption} maxLength={80} />
                    </p>
                </div>

                {/* 펼치기 아이콘 */}
                <ChevronRight
                    size={16}
                    className="shrink-0 text-gray-300 transition-transform duration-200"
                    style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
                />
            </button>

            {/* 확장 편집 영역 */}
            {expanded && (
                <div className="px-4 pb-4 space-y-3 border-t border-orange-100 pt-4 bg-orange-50/30">
                    {/* 제목 수정 */}
                    <label className="block">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                            제목
                        </span>
                        <input
                            type="text"
                            value={post.title}
                            onChange={e => set('title', e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-300 bg-white"
                        />
                    </label>

                    {/* 캡션 수정 */}
                    <label className="block">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                            캡션{' '}
                            <span className="normal-case font-normal text-orange-400">
                                (주황색 [항목]을 실제 내용으로 교체하세요)
                            </span>
                        </span>
                        <textarea
                            value={post.caption}
                            onChange={e => set('caption', e.target.value)}
                            rows={8}
                            className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-mono focus:outline-none focus:border-orange-300 resize-none bg-white leading-relaxed"
                        />
                    </label>

                    {/* 캡션 플레이스홀더 하이라이트 미리보기 */}
                    <div
                        className="rounded-xl p-3 text-xs leading-relaxed text-gray-600 whitespace-pre-wrap"
                        style={{ background: '#FFF8F0' }}
                    >
                        <p className="text-[10px] font-bold text-orange-400 mb-1.5 uppercase tracking-wide">
                            미리보기
                        </p>
                        <HighlightedCaption text={post.caption} maxLength={500} />
                    </div>
                </div>
            )}
        </div>
    );
}

// ──────────────────────────────────────────────
// Step 진행 표시 점
// ──────────────────────────────────────────────
function StepDots({ current, total }) {
    return (
        <div className="flex items-center gap-2">
            {Array.from({ length: total }).map((_, i) => (
                <span
                    key={i}
                    className="rounded-full transition-all duration-300"
                    style={{
                        width: current === i + 1 ? 24 : 8,
                        height: 8,
                        background:
                            current === i + 1
                                ? '#FF8C42'
                                : current > i + 1
                                ? '#FED7AA'
                                : '#E5E7EB',
                    }}
                />
            ))}
        </div>
    );
}

// ──────────────────────────────────────────────
// 메인: WeekWizard
// ──────────────────────────────────────────────
export const WeekWizard = ({ nextWeek, onComplete, onClose }) => {
    const TOTAL_STEPS = 3;

    // ── 단계 상태
    const [step, setStep] = useState(1);
    const [creating, setCreating] = useState(false);

    // ── Step 1 폼 상태
    const defaultPhase = `Phase ${Math.ceil(nextWeek / 4)}: 확장 콘텐츠`;
    const [selectedProgramId, setSelectedProgramId] = useState(PROGRAMS[0].id);
    const [customProgramName, setCustomProgramName] = useState('');
    const [theme, setTheme] = useState(PROGRAMS[0].name);
    const [phase, setPhase] = useState(defaultPhase);
    const [goal, setGoal] = useState('');

    // ── Step 2: 생성된 포스트 스켈레톤 (편집 가능)
    const [posts, setPosts] = useState([]);

    // ──────────────────────────────────────────
    // 프로그램 선택 시 테마 자동 채우기
    // custom 선택 시에는 테마를 비워 사용자가 직접 입력하도록 유도
    // ──────────────────────────────────────────
    const handleProgramChange = (programId) => {
        setSelectedProgramId(programId);
        if (programId === 'custom') {
            setTheme('');
        } else {
            const program = PROGRAMS.find(p => p.id === programId);
            if (program) setTheme(program.name);
        }
    };

    // custom 선택 시 undefined — 이후 렌더에서 조건부로 처리
    const selectedProgram = PROGRAMS.find(p => p.id === selectedProgramId) ?? null;

    // Step 3 요약에 표시할 전문가 레이블
    const expertLabel =
        selectedProgramId === 'custom'
            ? '직접 입력 (미지정)'
            : selectedProgram?.expertTitle ?? '-';

    // ──────────────────────────────────────────
    // Step 1 → Step 2: 포스트 스켈레톤 생성
    // custom 선택 시 3in 템플릿을 기반으로 생성 후 제목 보정
    // ──────────────────────────────────────────
    const goToStep2 = () => {
        const effectiveProgramId =
            selectedProgramId === 'custom' ? '3in' : selectedProgramId;
        const effectiveTheme =
            selectedProgramId === 'custom'
                ? customProgramName.trim() || theme.trim()
                : theme.trim();

        const generated = ['화', '목', '토'].map(day =>
            generatePostSkeleton(day, effectiveProgramId, nextWeek)
        );

        // 주차 테마로 제목 보정
        const patched = generated.map(p => ({
            ...p,
            title: `[${nextWeek}주차 ${p.day}] ${effectiveTheme} - [제목을 입력하세요]`,
        }));

        setPosts(patched);
        setStep(2);
    };

    // ──────────────────────────────────────────
    // 포스트 개별 수정 콜백
    // ──────────────────────────────────────────
    const handlePostChange = (index, updated) => {
        setPosts(prev => prev.map((p, i) => (i === index ? updated : p)));
    };

    // ──────────────────────────────────────────
    // Step 3: 최종 생성 실행
    // ──────────────────────────────────────────
    const handleCreate = async () => {
        setCreating(true);
        try {
            const finalTheme =
                selectedProgramId === 'custom'
                    ? customProgramName.trim() || theme.trim()
                    : theme.trim();
            const weekStrategy = {
                week: nextWeek,
                phase,
                theme: finalTheme,
                goal,
                focus: selectedProgram?.keywords?.slice(0, 3).join(', ') ?? '',
            };
            await onComplete(weekStrategy, posts);
        } finally {
            setCreating(false);
        }
    };

    // ──────────────────────────────────────────
    // Step 1 유효성
    // ──────────────────────────────────────────
    const step1Valid =
        phase.trim().length > 0 &&
        (selectedProgramId !== 'custom'
            ? theme.trim().length > 0
            : customProgramName.trim().length > 0 || theme.trim().length > 0);

    // ──────────────────────────────────────────
    // 렌더
    // ──────────────────────────────────────────
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            style={{ background: 'rgba(51,51,51,0.65)' }}
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="bg-white w-full max-w-2xl max-h-[92vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">

                {/* ── 헤더 */}
                <div
                    className="px-6 py-5 flex items-center justify-between shrink-0"
                    style={{ background: '#1F2937' }}
                >
                    <div className="flex items-center gap-3">
                        <span
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: '#FF8C42' }}
                        >
                            <Sparkles size={18} className="text-white" />
                        </span>
                        <div>
                            <div
                                className="text-[10px] font-black uppercase tracking-widest mb-0.5"
                                style={{ color: '#FF8C42' }}
                            >
                                Week {nextWeek} 생성 마법사
                            </div>
                            <h2 className="text-lg font-bold text-white leading-tight">
                                {step === 1 && '주차 설정'}
                                {step === 2 && '포스트 미리보기'}
                                {step === 3 && '확인 & 생성'}
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <StepDots current={step} total={TOTAL_STEPS} />
                        <button
                            onClick={onClose}
                            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                            style={{ background: 'rgba(255,255,255,0.1)' }}
                            onMouseOver={e =>
                                (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')
                            }
                            onMouseOut={e =>
                                (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')
                            }
                        >
                            <X size={18} className="text-white" />
                        </button>
                    </div>
                </div>

                {/* ── 본문 (스크롤 가능) */}
                <div className="flex-grow overflow-y-auto p-6 space-y-5">

                    {/* ────────── STEP 1: 주차 설정 ────────── */}
                    {step === 1 && (
                        <>
                            {/* 주차 번호 배지 */}
                            <div
                                className="flex items-center gap-3 rounded-2xl p-4"
                                style={{ background: '#FFF8F0' }}
                            >
                                <span
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg font-black shrink-0"
                                    style={{ background: '#FF8C42' }}
                                >
                                    {String(nextWeek).padStart(2, '0')}
                                </span>
                                <div>
                                    <p className="text-xs font-bold text-orange-400 uppercase tracking-widest">
                                        자동 감지됨
                                    </p>
                                    <p className="text-sm font-bold text-gray-800">
                                        Week {nextWeek} — 새 주차 콘텐츠
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        화·목·토 3개 포스트가 자동 생성됩니다
                                    </p>
                                </div>
                            </div>

                            {/* 프로그램 선택 */}
                            <label className="block">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                                    프로그램 / 테마 선택
                                </span>
                                <select
                                    value={selectedProgramId}
                                    onChange={e => handleProgramChange(e.target.value)}
                                    className="mt-1.5 w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-300 bg-white"
                                >
                                    {PROGRAMS.map(p => (
                                        <option key={p.id} value={p.id}>
                                            {p.name}
                                            {p.expert && p.expert !== '3IN 팀'
                                                ? ` — ${p.expert}`
                                                : ''}
                                        </option>
                                    ))}
                                    {/* 직접 입력 옵션 — PROGRAMS 배열 외부에 선언 */}
                                    <option value="custom">직접 입력</option>
                                </select>
                            </label>

                            {/* 직접 입력 (custom 선택 시) */}
                            {selectedProgramId === 'custom' && (
                                <label className="block">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                                        프로그램명 직접 입력 *
                                    </span>
                                    <input
                                        type="text"
                                        value={customProgramName}
                                        onChange={e => setCustomProgramName(e.target.value)}
                                        placeholder="예: 이벤트 기획, 시즌 콘텐츠…"
                                        className="mt-1.5 w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-300"
                                        autoFocus
                                    />
                                </label>
                            )}

                            {/* 주차 테마 */}
                            <label className="block">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                                    주차 테마
                                    <span className="ml-1.5 normal-case font-normal text-gray-400">
                                        (자동 입력 · 수정 가능)
                                    </span>
                                </span>
                                <input
                                    type="text"
                                    value={theme}
                                    onChange={e => setTheme(e.target.value)}
                                    placeholder={
                                        selectedProgramId === 'custom'
                                            ? '예: 시즌 이벤트, 콜라보 기획…'
                                            : '예: 피부 장벽 강화'
                                    }
                                    className="mt-1.5 w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-300"
                                />
                            </label>

                            {/* Phase */}
                            <label className="block">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                                    Phase
                                </span>
                                <input
                                    type="text"
                                    value={phase}
                                    onChange={e => setPhase(e.target.value)}
                                    placeholder="예: Phase 4: 심화 케어"
                                    className="mt-1.5 w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-300"
                                />
                            </label>

                            {/* 주차 목표 */}
                            <label className="block">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                                    주차 목표
                                    <span className="ml-1.5 normal-case font-normal text-gray-400">
                                        (선택)
                                    </span>
                                </span>
                                <input
                                    type="text"
                                    value={goal}
                                    onChange={e => setGoal(e.target.value)}
                                    placeholder="예: 전문성 신뢰 강화 및 예약 전환 유도"
                                    className="mt-1.5 w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-300"
                                />
                            </label>

                            {/* 선택된 프로그램 정보 카드 — custom에서는 숨김 */}
                            {selectedProgram && selectedProgramId !== 'custom' && (
                                <div
                                    className="rounded-2xl p-4 space-y-2 text-xs"
                                    style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}
                                >
                                    <p className="font-bold text-gray-600">
                                        {selectedProgram.emoji ?? '✨'} {selectedProgram.expertTitle}
                                    </p>
                                    {selectedProgram.keywords && (
                                        <div className="flex flex-wrap gap-1.5 mt-1">
                                            {selectedProgram.keywords.map(kw => (
                                                <span
                                                    key={kw}
                                                    className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                                                    style={{
                                                        background: 'rgba(255,140,66,0.12)',
                                                        color: '#FF8C42',
                                                    }}
                                                >
                                                    {kw}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}

                    {/* ────────── STEP 2: 포스트 미리보기 ────────── */}
                    {step === 2 && (
                        <>
                            <p className="text-sm text-gray-500">
                                아래 3개의 포스트 스켈레톤이 자동 생성되었습니다. 각 카드를
                                클릭해 제목과 캡션을 편집할 수 있습니다.
                                <span className="font-semibold" style={{ color: '#FF8C42' }}>
                                    &nbsp;주황색 [항목]
                                </span>
                                은 실제 내용으로 교체가 필요한 자리표시자입니다.
                            </p>

                            <div className="space-y-3">
                                {posts.map((post, i) => (
                                    <PostPreviewCard
                                        key={post.day}
                                        post={post}
                                        index={i}
                                        onChange={handlePostChange}
                                    />
                                ))}
                            </div>

                            {/* 요일별 특성 가이드 참고 */}
                            <div
                                className="rounded-2xl p-4 space-y-3 text-xs"
                                style={{ background: '#FFF8F0', border: '1px dashed #FED7AA' }}
                            >
                                <p className="font-bold text-orange-500 uppercase tracking-wide text-[10px]">
                                    요일별 콘텐츠 가이드
                                </p>
                                {['화', '목', '토'].map(day => {
                                    const g = DAY_GUIDES[day];
                                    return (
                                        <div key={day} className="flex gap-2">
                                            <span
                                                className="shrink-0 w-5 h-5 rounded-md text-white text-[10px] font-black flex items-center justify-center mt-0.5"
                                                style={{
                                                    background: {
                                                        화: '#3B82F6',
                                                        목: '#10B981',
                                                        토: '#F59E0B',
                                                    }[day],
                                                }}
                                            >
                                                {day}
                                            </span>
                                            <div>
                                                <p className="font-bold text-gray-700">{g.label}</p>
                                                <p className="text-gray-400">{g.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}

                    {/* ────────── STEP 3: 확인 & 생성 ────────── */}
                    {step === 3 && (
                        <>
                            <p className="text-sm text-gray-500">
                                아래 내용으로 Week {nextWeek} 콘텐츠를 생성합니다. 생성 후
                                대시보드에서 각 포스트를 추가로 편집할 수 있습니다.
                            </p>

                            {/* 주차 전략 요약 */}
                            <div
                                className="rounded-2xl p-5 space-y-3"
                                style={{ background: '#FFF8F0', border: '1px solid #FED7AA' }}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <span
                                        className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-black"
                                        style={{ background: '#FF8C42' }}
                                    >
                                        {String(nextWeek).padStart(2, '0')}
                                    </span>
                                    <p className="font-bold text-gray-800">Week {nextWeek} 주차 전략</p>
                                </div>
                                {[
                                    [
                                        '테마',
                                        selectedProgramId === 'custom'
                                            ? customProgramName.trim() || theme.trim() || '(미입력)'
                                            : theme,
                                    ],
                                    ['Phase', phase],
                                    ['목표', goal || '(미입력)'],
                                    ['전문가', expertLabel],
                                ].map(([label, value]) => (
                                    <div key={label} className="flex gap-3 text-sm">
                                        <span className="w-14 shrink-0 text-[11px] font-bold text-orange-400 uppercase tracking-wide pt-0.5">
                                            {label}
                                        </span>
                                        <span className="text-gray-700 flex-1">{value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* 포스트 목록 요약 */}
                            <div className="space-y-2">
                                {posts.map(post => (
                                    <div
                                        key={post.day}
                                        className="flex items-center gap-3 rounded-xl px-4 py-3"
                                        style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}
                                    >
                                        <span
                                            className="w-7 h-7 rounded-lg text-white text-xs font-black flex items-center justify-center shrink-0"
                                            style={{
                                                background: {
                                                    화: '#3B82F6',
                                                    목: '#10B981',
                                                    토: '#F59E0B',
                                                }[post.day],
                                            }}
                                        >
                                            {post.day}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-800 truncate">
                                                {post.title}
                                            </p>
                                            <p className="text-[11px] text-gray-400">
                                                {post.type} · {post.day}요일
                                            </p>
                                        </div>
                                        <span
                                            className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full"
                                            style={{ background: '#E5E7EB', color: '#6B7280' }}
                                        >
                                            초안
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* 생성 체크리스트 */}
                            <div
                                className="rounded-2xl p-4 space-y-2"
                                style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}
                            >
                                <p className="text-[10px] font-bold text-green-600 uppercase tracking-wide mb-2">
                                    생성 예정 항목
                                </p>
                                {[
                                    `Week ${nextWeek} 주차 전략 레코드`,
                                    '화요일 포스트 (초안)',
                                    '목요일 포스트 (초안)',
                                    '토요일 포스트 (초안)',
                                ].map(item => (
                                    <div key={item} className="flex items-center gap-2 text-sm text-green-700">
                                        <Check size={14} className="shrink-0 text-green-500" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* ── 푸터 내비게이션 */}
                <div
                    className="px-6 py-4 flex items-center justify-between shrink-0"
                    style={{ borderTop: '1px solid #F3F4F6', background: '#FAFAFA' }}
                >
                    {/* 이전 / 취소 버튼 */}
                    <button
                        type="button"
                        onClick={() => (step > 1 ? setStep(s => s - 1) : onClose())}
                        className="px-5 py-2 rounded-xl text-sm font-bold text-gray-400 hover:bg-gray-100 transition-colors"
                    >
                        {step === 1 ? '취소' : '이전'}
                    </button>

                    {/* 단계 텍스트 */}
                    <span className="text-xs text-gray-400 font-medium">
                        {step} / {TOTAL_STEPS}
                    </span>

                    {/* 다음 / 생성 버튼 */}
                    {step < TOTAL_STEPS ? (
                        <button
                            type="button"
                            onClick={() => {
                                if (step === 1) goToStep2();
                                else setStep(s => s + 1);
                            }}
                            disabled={step === 1 && !step1Valid}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-md hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                            style={{ background: '#FF8C42' }}
                        >
                            다음
                            <ChevronRight size={15} />
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleCreate}
                            disabled={creating}
                            className="flex items-center gap-2 px-7 py-2.5 rounded-xl text-sm font-bold text-white shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                            style={{ background: creating ? '#9CA3AF' : '#FF8C42' }}
                        >
                            <Plus size={15} />
                            {creating ? '생성 중…' : '생성하기'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
