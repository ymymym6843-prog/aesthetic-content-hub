import React from 'react';
import { LinkIcon } from './InstagramIcons';

// Highlight SVG icons (inline, high quality)
const RingIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="14" r="7"/>
        <path d="M9.5 7.5L12 2l2.5 5.5"/>
        <circle cx="12" cy="14" r="3.5"/>
    </svg>
);

const SparkleIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/>
    </svg>
);

const ClipboardIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
        <rect x="8" y="2" width="8" height="4" rx="1"/>
        <line x1="8" y1="12" x2="16" y2="12"/>
        <line x1="8" y1="16" x2="13" y2="16"/>
    </svg>
);

const HeartMailIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M12 13.5l-3.5-3a2.2 2.2 0 0 1 3.5-2.5 2.2 2.2 0 0 1 3.5 2.5z"/>
    </svg>
);

const PinIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
    </svg>
);

const HIGHLIGHTS = [
    { name: '웨딩케어', image: '/highlight_covers/01_wedding_care.jpeg' },
    { name: '비포&애프터', image: '/highlight_covers/02_before_after.jpeg' },
    { name: '후기', image: '/highlight_covers/03_review.jpeg' },
    { name: '오시는길', image: '/highlight_covers/04_location.jpeg' },
    { name: '예약', image: '/highlight_covers/05_reservation.jpeg' },
];

export const ProfileHeader = () => (
    <div className="border-b border-gray-200 pt-10 pb-6 px-4" style={{background:'rgba(250,244,234,0.3)'}}>
        <div className="max-w-2xl mx-auto flex flex-col items-center">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full mb-8">
                {/* Avatar */}
                <div className="w-24 h-24 md:w-36 md:h-36 rounded-full p-1 shadow-lg" style={{background:'linear-gradient(135deg,#E8703A,#F5A070)'}}>
                    <div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-gray-100 flex items-center justify-center">
                        <span className="text-3xl font-black tracking-tighter" style={{color:'#E8703A'}}>IM</span>
                    </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                    {/* Username + Buttons */}
                    <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                        <h1 className="text-xl font-medium tracking-tight">im.aesthetic.official</h1>
                        <div className="flex gap-2">
                            <button className="bg-gray-100 hover:bg-gray-200 px-4 py-1.5 rounded-lg text-sm font-semibold">프로필 편집</button>
                            <button className="bg-gray-100 hover:bg-gray-200 px-4 py-1.5 rounded-lg text-sm font-semibold">보관된 스토리</button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-center md:justify-start gap-8 mb-5">
                        <span className="text-sm"><strong>6</strong> 게시물</span>
                        <span className="text-sm"><strong>8</strong> 팔로워</span>
                        <span className="text-sm"><strong>0</strong> 팔로잉</span>
                    </div>

                    {/* Bio - 3-tier structure */}
                    <div className="text-sm">
                        <h2 className="font-bold mb-1 text-gray-900">IM AESTHETIC 아이엠에스테틱 | 대구 웨딩케어</h2>
                        <p className="text-xs text-gray-500 mb-2">스킨케어 서비스</p>

                        {/* Tier 1: Emotional copy */}
                        <p className="font-semibold mb-1" style={{color:'#E8703A'}}>
                            당신의 가장 빛나는 날을 준비합니다
                        </p>

                        {/* Divider */}
                        <div className="w-full h-px my-2" style={{background:'rgba(232,112,58,0.2)'}}></div>

                        {/* Tier 2: Information */}
                        <p className="text-gray-700 leading-relaxed text-xs">
                            <span style={{color:'#E8703A'}}>&#10022;</span> 웨딩 전문 에스테틱<br/>
                            <span style={{color:'#E8703A'}}>&#10022;</span> 수성구 범어동 · 맞춤 설계 관리<br/>
                            <span style={{color:'#E8703A'}}>&#10022;</span> 웨딩케어 | 피부관리 | 바디케어
                        </p>

                        {/* Divider */}
                        <div className="w-full h-px my-2" style={{background:'rgba(232,112,58,0.2)'}}></div>

                        {/* Tier 3: CTA */}
                        <p className="text-xs text-gray-600 font-medium">
                            웨딩케어 상담 &amp; 예약
                        </p>

                        {/* Link */}
                        <div className="flex items-center gap-1 text-blue-900 font-semibold mt-2">
                            <LinkIcon size={14} />
                            <a href="#" className="hover:underline text-sm">litt.ly/im.aesthetic</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Highlights */}
            <div className="flex gap-5 w-full overflow-x-auto py-4 no-scrollbar justify-center">
                {HIGHLIGHTS.map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 flex-shrink-0">
                        <div className="w-16 h-16 rounded-full p-0.5 shadow-sm cursor-pointer"
                            style={{ background: 'linear-gradient(135deg, #E8703A, #F5A070, #E8703A)' }}>
                            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                                <img src={item.image} alt={item.name}
                                    className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <span className="text-xs font-semibold text-gray-600">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
