import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

import { LayoutGrid, Sparkles, Clock, Award, CheckCircle2, ChevronRight } from './components/Icons.jsx';
import { strategyData } from './data/posts.js';
import { WeekNav } from './components/WeekNav.jsx';
import { PostCard } from './components/PostCard.jsx';
import { PostDetail } from './components/PostDetail.jsx';

const App = () => {
    const [activeWeek, setActiveWeek] = useState(1);
    const [selectedPost, setSelectedPost] = useState(null);
    const [copied, setCopied] = useState(false);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen p-4 md:p-10 font-sans" style={{background:'#FFF8F0', color:'#333'}}>
            <header className="max-w-6xl mx-auto mb-12 flex flex-col items-center">
                <div className="px-5 py-1.5 rounded-full text-xs font-bold mb-4 border tracking-widest uppercase" style={{background:'rgba(255,140,66,0.1)', color:'#FF8C42', borderColor:'rgba(255,140,66,0.2)'}}>
                    IM AESTHETIC SNS CONTENT HUB
                </div>
                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-center">
                    IM 에스테틱 12주 올인원 전략
                </h1>
                <p className="text-gray-500 text-lg max-w-2xl text-center leading-relaxed">
                    각 카드를 클릭하여 <strong>이미지 가이드, 본문 카피, 태그</strong>를 확인하세요.
                </p>
                <div className="mt-4 flex gap-3">
                    <a href="card_news_maker.html" className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold text-white shadow-md hover:shadow-lg transition-all" style={{background:'#FF8C42'}}>
                        <LayoutGrid size={16} /> 카드뉴스 메이커
                    </a>
                </div>
            </header>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                <WeekNav strategyData={strategyData} activeWeek={activeWeek} onSelect={setActiveWeek} />

                <main className="lg:col-span-9 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden min-h-[600px] flex flex-col">
                    <div className="p-8 md:p-10 border-b border-gray-50 bg-gray-800 text-white">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2" style={{color:'#FF8C42'}}>
                                    <Sparkles size={16} />
                                    <span className="text-xs font-black uppercase tracking-widest italic">{strategyData[activeWeek - 1].phase}</span>
                                </div>
                                <h2 className="text-3xl font-bold tracking-tight">{strategyData[activeWeek - 1].theme}</h2>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl backdrop-blur-md border border-white/5">
                                <Clock size={16} style={{color:'#FF8C42'}} />
                                <span className="text-sm font-bold tracking-tight">화·목·토 실전 업로드</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 md:p-10 flex-grow">
                        <div className="mb-10 p-6 rounded-3xl border relative overflow-hidden group" style={{background:'#FFF8F0', borderColor:'rgba(255,140,66,0.1)'}}>
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Award size={80} /></div>
                            <div className="flex items-center gap-2 mb-2 font-black text-xs tracking-widest uppercase" style={{color:'#FF8C42'}}>
                                <CheckCircle2 size={16} /><span>Strategy Goal</span>
                            </div>
                            <p className="text-gray-700 text-lg font-medium leading-relaxed italic">
                                "{strategyData[activeWeek - 1].goal}"
                            </p>
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <LayoutGrid size={22} style={{color:'#FF8C42'}} />
                                콘텐츠 상세 기획 (클릭하여 확인)
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {strategyData[activeWeek - 1].posts.map((post, idx) => (
                                <PostCard
                                    key={idx}
                                    post={post}
                                    idx={idx}
                                    activeWeek={activeWeek}
                                    onSelect={setSelectedPost}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="px-10 py-6 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-8 items-center justify-center">
                        {[{code:'Yu',role:'Skin Expert',name:'유수정 전문가'},{code:'Woo',role:'Body Expert',name:'우연우 전문가'},{code:'Kim',role:'Wellness Dir',name:'김은경 디렉터'}].map((e,i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm font-bold text-[10px]" style={{color:'#FF8C42'}}>{e.code}</div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter italic">{e.role}</span>
                                    <span className="text-xs font-bold">{e.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            <PostDetail
                post={selectedPost}
                activeWeek={activeWeek}
                copied={copied}
                onClose={() => setSelectedPost(null)}
                onCopy={handleCopy}
            />

            <footer className="max-w-6xl mx-auto mt-16 text-center text-gray-400">
                <p className="text-xs font-bold uppercase tracking-widest mb-2 italic opacity-60">Professional Aesthetics Content Strategy</p>
                <div className="text-[10px] flex justify-center gap-4">
                    <span>&copy; 2026 IM AESTHETIC</span><span>|</span><span>수성구 범어동 마크팰리스</span>
                </div>
            </footer>
        </div>
    );
};

export default App;

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
