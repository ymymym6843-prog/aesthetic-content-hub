import React from 'react';
import { Calendar, ChevronRight } from './Icons.jsx';

export const WeekNav = ({ strategyData, activeWeek, onSelect }) => (
    <nav className="lg:col-span-3 space-y-3">
        <div className="text-xs font-bold text-gray-400 px-2 pb-2 uppercase tracking-tighter flex items-center gap-2">
            <Calendar size={14} /> Roadmap Timeline
        </div>
        {strategyData.map((item) => (
            <button key={item.week} onClick={() => onSelect(item.week)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${activeWeek === item.week ? 'bg-gray-800 text-white shadow-xl translate-x-2' : 'bg-white/80 text-gray-500 hover:bg-white hover:shadow-md'}`}>
                <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-black w-7 h-7 rounded-full flex items-center justify-center border ${activeWeek === item.week ? 'border-orange-400 text-white' : 'bg-gray-100 border-gray-200'}`}
                        style={activeWeek === item.week ? {background:'#FF8C42'} : {}}>
                        {String(item.week).padStart(2,'0')}
                    </span>
                    <div className="text-left">
                        <div className="text-[10px] opacity-60 font-bold uppercase tracking-tight italic">Week</div>
                        <div className="font-bold text-sm leading-tight">주차 로드맵 {String(item.week).padStart(2,'0')}</div>
                    </div>
                </div>
                <ChevronRight size={16} className={activeWeek === item.week ? '' : 'text-gray-300'} style={activeWeek === item.week ? {color:'#FF8C42'} : {}} />
            </button>
        ))}
    </nav>
);
