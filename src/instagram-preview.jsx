import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

import { feedPosts as fallbackPosts, initialGridPosts } from './data/posts';
import { fetchPosts, fetchWeekStrategies, DEFAULT_CLINIC_ID } from './lib/supabase';
import { ProfileHeader } from './components/ProfileHeader';
import { GridView } from './components/GridView';
import { FeedDetailView } from './components/FeedDetailView';
import { MockGeneratorView } from './components/MockGeneratorView';
import { Layout, Play, MessageCircle, User, ChevronLeft } from './components/InstagramIcons';
import mockGeminiOutput from './mock_gemini_output.json';

const AISetupView = ({ onBack, onComplete }) => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!url) return alert('URL을 입력해주세요.');
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3001/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });
            if (!res.ok) throw new Error('API 서버 오류 발생');
            const data = await res.json();
            onComplete(data);
        } catch (err) {
            console.error(err);
            alert('AI 생성 실패. 백엔드 서버가 실행중인지 확인해주시고 URL을 다시 확인해주세요.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white min-h-screen pt-20">
            <h2 className="text-2xl font-black text-gray-800 mb-2 whitespace-nowrap overflow-hidden text-clip flex items-center gap-2">🪄 AI 마케팅 에셋 생성기</h2>
            <p className="text-sm text-gray-500 mb-8 whitespace-pre-wrap break-keep">블로그 글이나 온라인 쇼핑몰(URL) 주소를 입력해 보세요. Gemini가 내용을 분석하고 즉시 카드뉴스를 기획해 드립니다.</p>
            <div className="bg-[#FFF8F0] p-6 rounded-2xl border border-orange-100 shadow-sm mb-6">
                <label className="block text-xs font-bold text-[#E8703A] tracking-wider uppercase mb-2">Target URL</label>
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="url"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        placeholder="https://www.n2spa.co.kr/products/..."
                        className="flex-1 p-3 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8703A] bg-white text-sm"
                        disabled={loading}
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={loading || !url}
                        className="bg-[#E8703A] text-white px-6 py-3 rounded-xl font-bold disabled:opacity-50 hover:bg-orange-600 transition-colors shadow-sm flex items-center justify-center min-w-[120px]"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : '생성 시작'}
                    </button>
                </div>
            </div>

            <button onClick={onBack} className="flex items-center gap-1 text-gray-400 text-sm font-medium hover:text-gray-600 transition-colors px-2 py-1">
                <ChevronLeft size={16} /> 홈으로 돌아가기
            </button>
        </div>
    );
};

// DB type → feedPosts type 매핑
const typeMap = { '릴스': 'reel', '캐러셀': 'carousel', '이미지': 'image', '피드': 'image' };

// DB 데이터를 feedPosts 형식으로 변환
function transformToFeedPosts(posts, strategies) {
    const phaseMap = {};
    strategies.forEach(s => { phaseMap[s.week] = s.phase; });

    return posts
        .map((p, idx) => ({
            id: idx + 1,
            week: p.week,
            day: p.day,
            type: typeMap[p.type] || p.type,
            phase: phaseMap[p.week] || '',
            title: p.title,
            image: p.post_images?.[0]?.image_url || './feed_images/placeholder.svg',
            caption: p.caption || p.description || '',
            hashtags: p.tags || '',
            slideCount: p.slide_count,
            templateType: p.template_type,
            status: p.status || 'draft',
        }))
        .sort((a, b) => b.id - a.id); // 최신순
}

const FILTERS = [
    { key: 'all', label: '전체' },
    { key: 'published', label: '발행됨' },
    { key: 'unpublished', label: '미발행' },
];

const App = () => {
    const [selectedPost, setSelectedPost] = useState(null);
    const [view, setView] = useState('grid');
    const [posts, setPosts] = useState(fallbackPosts);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [aiData, setAiData] = useState(mockGeminiOutput);

    useEffect(() => {
        async function loadFromDb() {
            try {
                const [dbPosts, strategies] = await Promise.all([
                    fetchPosts(DEFAULT_CLINIC_ID),
                    fetchWeekStrategies(DEFAULT_CLINIC_ID),
                ]);
                if (dbPosts.length > 0 && strategies.length > 0) {
                    const transformed = transformToFeedPosts(dbPosts, strategies);
                    // Prepend initial grid posts (wedding care 6-grid)
                    const gridReversed = [...initialGridPosts].reverse();
                    setPosts([...gridReversed, ...transformed]);
                }
            } catch (err) {
                console.warn('DB 로드 실패, 폴백 데이터 사용:', err.message);
            }
            setLoading(false);
        }
        loadFromDb();
    }, []);

    const handlePostClick = (post) => {
        setSelectedPost(post);
        setView('feed');
        window.scrollTo(0, 0);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-8 h-8 border-3 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#E8703A', borderTopColor: 'transparent' }}></div>
            </div>
        );
    }

    // 통계
    const publishedCount = posts.filter(p => p.status === 'published').length;

    return (
        <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
            {view === 'grid' ? (
                <div>
                    <ProfileHeader />

                    <div className="fixed bottom-20 right-4 z-[60]">
                        <button
                            onClick={() => setView('ai-setup')}
                            className="bg-[#E8703A] text-white px-5 py-3 rounded-full shadow-lg font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                        >
                            <span className="text-xl">✨</span> AI 기획안 만들기
                        </button>
                    </div>

                    {/* Phase 4: 발행 필터 */}
                    <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
                        <div className="flex gap-2">
                            {FILTERS.map(f => (
                                <button key={f.key}
                                    onClick={() => setFilter(f.key)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${filter === f.key ? 'text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                                    style={filter === f.key ? { background: '#E8703A' } : {}}>
                                    {f.label}
                                </button>
                            ))}
                        </div>
                        <span className="text-xs font-bold text-gray-400">
                            {publishedCount}/{posts.length} 발행
                        </span>
                    </div>
                    <GridView posts={posts} onPostClick={handlePostClick} filter={filter} />
                </div>
            ) : view === 'ai-setup' ? (
                <AISetupView onBack={() => setView('grid')} onComplete={(data) => {
                    setAiData(data);
                    setView('mock-gen');
                }} />
            ) : view === 'mock-gen' ? (
                <MockGeneratorView mockData={aiData} onBack={() => setView('grid')} />
            ) : (
                <FeedDetailView post={selectedPost} onBack={() => setView('grid')} />
            )}
            <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 h-16 flex items-center justify-around px-4 z-50">
                <Layout size={24} className={view === 'grid' ? '' : 'text-gray-300'} style={{ color: view === 'grid' ? '#E8703A' : undefined }} onClick={() => setView('grid')} />
                <Play size={24} className="text-gray-300" />
                <div className="w-10 h-10 rounded-full p-0.5 flex items-center justify-center shadow-md" style={{ background: 'linear-gradient(135deg,#E8703A,#F5A070)' }}>
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-xs font-black" style={{ color: '#E8703A' }}>IM</div>
                </div>
                <MessageCircle size={24} className="text-gray-300" />
                <User size={24} className="text-gray-300" />
            </div>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
