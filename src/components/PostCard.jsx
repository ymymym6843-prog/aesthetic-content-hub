import React from 'react';
import { ChevronRight } from './Icons.jsx';

export const PostCard = ({ post, idx, activeWeek, onSelect }) => (
    <button onClick={() => onSelect(post)}
        className="flex flex-col text-left h-full bg-gray-50/50 rounded-3xl border border-gray-100 overflow-hidden hover:bg-white transition-all duration-300 group shadow-sm hover:shadow-xl relative">
        {post.image && (
            <div className="w-full h-36 bg-gray-100 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
        )}
        <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-gray-200 group-hover:text-orange-100 transition-colors">0{idx + 1}</span>
                <div className={`px-2.5 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase border ${post.day === '토' && activeWeek >= 3 ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                    {post.day}요일
                </div>
            </div>
            <div className="mb-3">
                <div className="flex items-center gap-1.5 mb-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${post.type === '릴스' ? 'bg-purple-500' : post.type === '캐러셀' ? 'bg-blue-500' : ''}`}
                        style={post.type !== '릴스' && post.type !== '캐러셀' ? {background:'#FF8C42'} : {}}></div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{post.type}</span>
                </div>
                <h4 className="text-lg font-bold transition-colors leading-snug group-hover:text-orange-500">{post.title}</h4>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed flex-grow">{post.desc}</p>
            {post.slideCount > 0 && (
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black text-white" style={{background:'#FF8C42'}}>{post.slideCount}장</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border" style={{color:'#FF8C42', borderColor:'rgba(255,140,66,0.3)', background:'rgba(255,140,66,0.05)'}}>{post.templateType}</span>
                </div>
            )}
            {post.slideCount > 0 && (
                <a href={`card_news_maker.html?post=${activeWeek}W_Thu`}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors hover:bg-orange-50"
                    style={{color:'#FF8C42'}}>
                    카드뉴스 만들기 <span style={{fontSize:'14px'}}>&rarr;</span>
                </a>
            )}
            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-gray-300 group-hover:text-orange-400 transition-all">
                <span className="text-[10px] font-bold opacity-0 group-hover:opacity-100">가이드 & 본문 확인하기</span>
                <ChevronRight size={18} />
            </div>
        </div>
    </button>
);
