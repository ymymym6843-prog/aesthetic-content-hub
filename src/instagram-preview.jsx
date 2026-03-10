import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

import { feedPosts as fallbackPosts } from './data/posts';
import { fetchPosts, fetchWeekStrategies, DEFAULT_CLINIC_ID } from './lib/supabase';
import { ProfileHeader } from './components/ProfileHeader';
import { GridView } from './components/GridView';
import { FeedDetailView } from './components/FeedDetailView';
import { Layout, Play, MessageCircle, User } from './components/InstagramIcons';

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

    useEffect(() => {
        async function loadFromDb() {
            try {
                const [dbPosts, strategies] = await Promise.all([
                    fetchPosts(DEFAULT_CLINIC_ID),
                    fetchWeekStrategies(DEFAULT_CLINIC_ID),
                ]);
                if (dbPosts.length > 0 && strategies.length > 0) {
                    setPosts(transformToFeedPosts(dbPosts, strategies));
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
                <div className="w-8 h-8 border-3 border-t-transparent rounded-full animate-spin" style={{borderColor:'#FF8C42', borderTopColor:'transparent'}}></div>
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
                    {/* Phase 4: 발행 필터 */}
                    <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
                        <div className="flex gap-2">
                            {FILTERS.map(f => (
                                <button key={f.key}
                                    onClick={() => setFilter(f.key)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${filter === f.key ? 'text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                                    style={filter === f.key ? {background:'#FF8C42'} : {}}>
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
            ) : (
                <FeedDetailView post={selectedPost} onBack={() => setView('grid')} />
            )}
            <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 h-16 flex items-center justify-around px-4 z-50">
                <Layout size={24} className={view === 'grid' ? '' : 'text-gray-300'} style={{color: view === 'grid' ? '#FF8C42' : undefined}} onClick={() => setView('grid')} />
                <Play size={24} className="text-gray-300" />
                <div className="w-10 h-10 rounded-full p-0.5 flex items-center justify-center shadow-md" style={{background:'linear-gradient(135deg,#FF8C42,#FFB085)'}}>
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-xs font-black" style={{color:'#FF8C42'}}>IM</div>
                </div>
                <MessageCircle size={24} className="text-gray-300" />
                <User size={24} className="text-gray-300" />
            </div>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
