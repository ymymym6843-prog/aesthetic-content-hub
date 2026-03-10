import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

import { LayoutGrid, Sparkles, Clock, Award, CheckCircle2, ChevronRight, Plus, BarChart } from './components/Icons.jsx';
import { strategyData as fallbackData } from './data/posts.js';
import { fetchPosts, fetchWeekStrategies, createPost, updatePost, deletePost, uploadImage, addPostImage, createWeekStrategy, updatePublishChecklist, updatePostStatus, DEFAULT_CLINIC_ID } from './lib/supabase.js';
import { WeekNav } from './components/WeekNav.jsx';
import { PostCard } from './components/PostCard.jsx';
import { PostDetail } from './components/PostDetail.jsx';
import { PostEditor } from './components/PostEditor.jsx';
import { WeekWizard } from './components/WeekWizard.jsx';

// DB 데이터를 strategyData 형식으로 변환
function transformDbData(posts, strategies) {
    return strategies.map(s => {
        const weekPosts = posts.filter(p => p.week === s.week);
        return {
            week: s.week,
            phase: `${s.phase}`,
            theme: s.theme,
            goal: s.goal,
            posts: weekPosts.map(p => ({
                day: p.day,
                type: p.type,
                title: p.title,
                desc: p.description,
                caption: p.caption,
                tags: p.tags,
                image: p.post_images?.[0]?.image_url || '/feed_images/placeholder.svg',
                slideCount: p.slide_count,
                templateType: p.template_type,
                asset: p.asset || '',
                aiGuide: p.ai_guide || '',
                design: p.design || '',
                dbId: p.id,
                status: p.status,
                publishChecklist: p.publish_checklist || null,
            }))
        };
    });
}

const App = () => {
    const [activeWeek, setActiveWeek] = useState(1);
    const [selectedPost, setSelectedPost] = useState(null);
    const [copied, setCopied] = useState(false);
    const [strategyData, setStrategyData] = useState(fallbackData);
    const [dbConnected, setDbConnected] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editorPost, setEditorPost] = useState(undefined); // undefined=closed, null=new, object=edit
    const [toast, setToast] = useState(null);
    const [showWizard, setShowWizard] = useState(false);

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const reloadData = async () => {
        try {
            const [posts, strategies] = await Promise.all([
                fetchPosts(DEFAULT_CLINIC_ID),
                fetchWeekStrategies(DEFAULT_CLINIC_ID),
            ]);
            if (strategies.length > 0 && posts.length > 0) {
                setStrategyData(transformDbData(posts, strategies));
                setDbConnected(true);
            }
        } catch (err) {
            console.warn('DB 새로고침 실패:', err.message);
        }
    };

    useEffect(() => {
        async function loadFromDb() {
            await reloadData();
            setLoading(false);
        }
        loadFromDb();
    }, []);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSave = async (formData, isNew) => {
        try {
            const postData = {
                clinic_id: DEFAULT_CLINIC_ID,
                week: activeWeek,
                day: formData.day,
                type: formData.type,
                title: formData.title,
                description: formData.desc,
                caption: formData.caption,
                tags: formData.tags,
                slide_count: formData.type === '캐러셀' ? (formData.slideCount || 0) : 0,
                template_type: formData.type === '캐러셀' ? formData.templateType : '',
                status: formData.status,
                sort_order: formData.day === '화' ? 1 : formData.day === '목' ? 2 : 3,
            };

            let savedPost;
            if (isNew) {
                savedPost = await createPost(postData);
            } else {
                savedPost = await updatePost(formData.dbId, postData);
            }

            // Handle image upload
            if (formData.imageFile && savedPost) {
                const path = `${DEFAULT_CLINIC_ID}/${activeWeek}W_${formData.day}_${Date.now()}.${formData.imageFile.name.split('.').pop()}`;
                const publicUrl = await uploadImage(formData.imageFile, path);
                await addPostImage(savedPost.id, publicUrl, 0, formData.title);
            }

            await reloadData();
            setEditorPost(undefined);
            setSelectedPost(null);
            showToast(isNew ? '게시물이 추가되었습니다' : '게시물이 수정되었습니다');
        } catch (err) {
            showToast('저장 실패: ' + err.message, 'error');
        }
    };

    const handleDelete = async (postId) => {
        try {
            await deletePost(postId);
            await reloadData();
            setEditorPost(undefined);
            setSelectedPost(null);
            showToast('게시물이 삭제되었습니다');
        } catch (err) {
            showToast('삭제 실패: ' + err.message, 'error');
        }
    };

    const handleEdit = (post) => {
        setSelectedPost(null);
        setEditorPost(post);
    };

    // Phase 1: 새 주차 생성 위저드
    const handleWizardComplete = async (weekStrategy, posts) => {
        try {
            await createWeekStrategy({
                clinic_id: DEFAULT_CLINIC_ID,
                week: weekStrategy.week,
                phase: weekStrategy.phase,
                theme: weekStrategy.theme,
                goal: weekStrategy.goal,
            });

            for (const post of posts) {
                await createPost({
                    clinic_id: DEFAULT_CLINIC_ID,
                    week: weekStrategy.week,
                    day: post.day,
                    type: post.type,
                    title: post.title,
                    description: post.desc,
                    caption: post.caption,
                    tags: post.tags,
                    slide_count: post.slideCount || 0,
                    template_type: post.templateType || '',
                    status: 'draft',
                    sort_order: post.day === '화' ? 1 : post.day === '목' ? 2 : 3,
                });
            }

            await reloadData();
            setShowWizard(false);
            setActiveWeek(weekStrategy.week);
            showToast(`Week ${weekStrategy.week} 생성 완료! 3개 포스트가 추가되었습니다.`);
        } catch (err) {
            showToast('주차 생성 실패: ' + err.message, 'error');
        }
    };

    // Phase 3: 발행 체크리스트 업데이트
    const handleUpdateChecklist = async (postId, checklist, allChecked) => {
        try {
            await updatePublishChecklist(postId, checklist);
            if (allChecked) {
                await updatePostStatus(postId, 'published');
            }
            await reloadData();
        } catch (err) {
            console.warn('체크리스트 업데이트 실패:', err.message);
        }
    };

    // Phase 3: 발행 통계 계산
    const allPosts = strategyData.flatMap(w => w.posts);
    const publishedCount = allPosts.filter(p => p.status === 'published').length;
    const totalCount = allPosts.length;
    const progressPct = totalCount > 0 ? Math.round((publishedCount / totalCount) * 100) : 0;

    const nextWeek = strategyData.length > 0 ? Math.max(...strategyData.map(s => s.week)) + 1 : 1;

    // 현재 주차의 모든 포스트 (가이드 패널용)
    const currentWeekPosts = strategyData[activeWeek - 1]?.posts || [];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{background:'#FFF8F0'}}>
                <div className="text-center">
                    <div className="w-8 h-8 border-3 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{borderColor:'#FF8C42', borderTopColor:'transparent'}}></div>
                    <p className="text-gray-400 text-sm">Loading...</p>
                </div>
            </div>
        );
    }

    const activeData = strategyData.find(s => s.week === activeWeek) || strategyData[0];

    return (
        <div className="min-h-screen p-4 md:p-10 font-sans" style={{background:'#FFF8F0', color:'#333'}}>
            <header className="max-w-6xl mx-auto mb-12 flex flex-col items-center">
                <div className="px-5 py-1.5 rounded-full text-xs font-bold mb-4 border tracking-widest uppercase flex items-center gap-2" style={{background:'rgba(255,140,66,0.1)', color:'#FF8C42', borderColor:'rgba(255,140,66,0.2)'}}>
                    <span className={`w-2 h-2 rounded-full ${dbConnected ? 'bg-green-400' : 'bg-gray-300'}`}></span>
                    IM AESTHETIC SNS CONTENT HUB
                </div>
                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-center">
                    IM 에스테틱 콘텐츠 관리
                </h1>
                <p className="text-gray-500 text-lg max-w-2xl text-center leading-relaxed">
                    각 카드를 클릭하여 <strong>이미지 가이드, 본문 카피, 태그</strong>를 확인하세요.
                </p>

                {/* Phase 3: 발행 진행률 */}
                {dbConnected && totalCount > 0 && (
                    <div className="mt-6 w-full max-w-md">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                                <BarChart size={16} style={{color:'#FF8C42'}} />
                                발행 현황
                            </div>
                            <span className="text-sm font-black" style={{color:'#FF8C42'}}>{publishedCount}/{totalCount} ({progressPct}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-700"
                                style={{width: `${progressPct}%`, background: progressPct === 100 ? '#22c55e' : '#FF8C42'}} />
                        </div>
                    </div>
                )}

                <div className="mt-4 flex gap-3">
                    <a href="card_news_maker.html" className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold text-white shadow-md hover:shadow-lg transition-all" style={{background:'#FF8C42'}}>
                        <LayoutGrid size={16} /> 카드뉴스 메이커
                    </a>
                </div>
            </header>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                <WeekNav
                    strategyData={strategyData}
                    activeWeek={activeWeek}
                    onSelect={setActiveWeek}
                    onAddWeek={() => setShowWizard(true)}
                    dbConnected={dbConnected}
                />

                <main className="lg:col-span-9 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden min-h-[600px] flex flex-col">
                    <div className="p-8 md:p-10 border-b border-gray-50 bg-gray-800 text-white">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2" style={{color:'#FF8C42'}}>
                                    <Sparkles size={16} />
                                    <span className="text-xs font-black uppercase tracking-widest italic">{activeData.phase}</span>
                                </div>
                                <h2 className="text-3xl font-bold tracking-tight">{activeData.theme}</h2>
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
                                "{activeData.goal}"
                            </p>
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <LayoutGrid size={22} style={{color:'#FF8C42'}} />
                                콘텐츠 상세 기획 (클릭하여 확인)
                            </h3>
                            {dbConnected && (
                                <button onClick={() => setEditorPost(null)}
                                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white shadow-md hover:shadow-lg transition-all"
                                    style={{background:'#FF8C42'}}>
                                    <Plus size={14} /> 새 게시물
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {activeData.posts.map((post, idx) => (
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
                onEdit={handleEdit}
                dbConnected={dbConnected}
                onUpdateChecklist={handleUpdateChecklist}
            />

            {editorPost !== undefined && (
                <PostEditor
                    post={editorPost}
                    activeWeek={activeWeek}
                    onSave={handleSave}
                    onDelete={handleDelete}
                    onClose={() => setEditorPost(undefined)}
                    existingPosts={currentWeekPosts}
                />
            )}

            {showWizard && (
                <WeekWizard
                    nextWeek={nextWeek}
                    onComplete={handleWizardComplete}
                    onClose={() => setShowWizard(false)}
                />
            )}

            {toast && (
                <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-6 py-3 rounded-2xl text-sm font-bold text-white shadow-xl transition-all ${toast.type === 'error' ? 'bg-red-500' : 'bg-gray-800'}`}>
                    {toast.msg}
                </div>
            )}

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
