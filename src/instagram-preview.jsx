import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

import { feedPosts } from './data/posts';
import { ProfileHeader } from './components/ProfileHeader';
import { GridView } from './components/GridView';
import { FeedDetailView } from './components/FeedDetailView';
import { Layout, Play, MessageCircle, User } from './components/InstagramIcons';

const App = () => {
    const [selectedPost, setSelectedPost] = useState(null);
    const [view, setView] = useState('grid');

    const handlePostClick = (post) => {
        setSelectedPost(post);
        setView('feed');
        window.scrollTo(0, 0);
    };

    return (
        <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
            {view === 'grid' ? (
                <div>
                    <ProfileHeader />
                    <GridView posts={feedPosts} onPostClick={handlePostClick} />
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
