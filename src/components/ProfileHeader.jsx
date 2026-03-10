import React from 'react';
import { LinkIcon, Info, Sparkles, Heart, CalendarIcon, MapPin } from './InstagramIcons';

export const ProfileHeader = () => (
    <div className="border-b border-gray-200 pt-10 pb-6 px-4" style={{background:'rgba(255,248,240,0.3)'}}>
        <div className="max-w-2xl mx-auto flex flex-col items-center">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full mb-8">
                <div className="w-24 h-24 md:w-36 md:h-36 rounded-full p-1 shadow-lg" style={{background:'linear-gradient(135deg,#FF8C42,#FFB085)'}}>
                    <div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-gray-100 flex items-center justify-center">
                        <span className="text-3xl font-black tracking-tighter" style={{color:'#FF8C42'}}>IM</span>
                    </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                        <h1 className="text-xl font-medium tracking-tight">im_aesthetic_official</h1>
                        <div className="flex gap-2">
                            <button className="bg-gray-100 hover:bg-gray-200 px-4 py-1.5 rounded-lg text-sm font-semibold">프로필 편집</button>
                            <button className="bg-gray-100 hover:bg-gray-200 px-4 py-1.5 rounded-lg text-sm font-semibold">보관된 스토리</button>
                        </div>
                    </div>
                    <div className="flex justify-center md:justify-start gap-8 mb-5">
                        <span className="text-sm"><strong>36</strong> 게시물</span>
                        <span className="text-sm"><strong>1,248</strong> 팔로워</span>
                        <span className="text-sm"><strong>152</strong> 팔로잉</span>
                    </div>
                    <div className="text-sm">
                        <h2 className="font-bold mb-1 text-gray-900">IM 에스테틱 | 3인 전문가 통합 케어</h2>
                        <p className="font-semibold mb-1 italic" style={{color:'#FF8C42'}}>세 명의 전문가, 하나의 완벽한 솔루션 🍊</p>
                        <p className="text-gray-700 leading-relaxed text-xs">
                            ✔️ 유수정 (메디컬 스킨케어 20년 경력)<br/>
                            ✔️ 우연우 (바른체형 근막 테라피 전문가)<br/>
                            ✔️ 김은경 (39년 내공 7감 리추얼 디렉터)
                        </p>
                        <div className="flex items-center gap-1 text-blue-900 font-semibold mt-3">
                            <LinkIcon size={14} />
                            <a href="#" className="hover:underline text-sm">linktr.ee/im_aesthetic</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-5 w-full overflow-x-auto py-4 no-scrollbar">
                {[
                    { name: '소개', icon: <Info size={20} /> },
                    { name: '통합케어', icon: <Sparkles size={20} /> },
                    { name: '후기', icon: <Heart size={20} /> },
                    { name: '이벤트', icon: <CalendarIcon size={20} /> },
                    { name: '공간', icon: <MapPin size={20} /> }
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 flex-shrink-0">
                        <div className="w-16 h-16 rounded-full border border-gray-200 p-0.5 bg-white shadow-sm flex items-center justify-center cursor-pointer" style={{color:'#FF8C42'}}>
                            {item.icon}
                        </div>
                        <span className="text-xs font-semibold text-gray-600">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
