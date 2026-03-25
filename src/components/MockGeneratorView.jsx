import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { ChevronLeft, Check, Copy, Bookmark } from './InstagramIcons';

export const MockGeneratorView = ({ mockData, onBack }) => {
    const slideRefs = useRef([]);

    const downloadSlide = async (index) => {
        const slideElement = slideRefs.current[index];
        if (!slideElement) return;

        try {
            const canvas = await html2canvas(slideElement, {
                scale: 2, // 고해상도 이미지 수출
                useCORS: true,
                backgroundColor: '#FFF8F0'
            });
            const image = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = image;
            link.download = `IM_Aesthetic_Carousel_${index + 1}.png`;
            link.click();
        } catch (err) {
            console.error("Failed to download image", err);
            alert("이미지 다운로드에 실패했습니다.");
        }
    };

    if (!mockData || !mockData.card_news) return null;

    const slides = [
        {
            type: 'hook',
            eyebrow: 'IM BEAUTY TIP',
            title: mockData.card_news.slide_1_hook,
            sub: '지금 바로 스와이프해서 확인하세요 →'
        },
        {
            type: 'text',
            label: '고객 핵심 고민',
            title: '이런 고민 있으시죠?',
            content: mockData.card_news.slide_2_pain_point,
            icon: '🤔'
        },
        {
            type: 'solution',
            label: 'IM AESTHETIC 솔루션',
            title: '근본적인 해결책 제안',
            content: mockData.card_news.slide_3_solution,
            icon: '💧',
            image: mockData.original_image
        },
        {
            type: 'text',
            label: '달라지는 변화',
            title: '확실한 효과',
            content: mockData.card_news.slide_4_benefit,
            icon: '✨'
        },
        {
            type: 'cta',
            title: mockData.card_news.slide_5_cta,
        }
    ];

    return (
        <div className="max-w-4xl mx-auto bg-gray-50 min-h-screen pb-20 p-4">
            <div className="flex items-center gap-4 mb-6">
                <button onClick={onBack} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50">
                    <ChevronLeft size={24} />
                </button>
                <div>
                    <h1 className="text-xl font-bold text-gray-800">AI 카드뉴스 자동 생성 결과</h1>
                    <p className="text-sm text-gray-500">제품명: {mockData.product_name}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {slides.map((slide, idx) => (
                    <div key={idx} className="flex flex-col gap-3">
                        <div className="flex justify-between items-center px-1">
                            <span className="text-sm font-bold text-gray-600">Slide {idx + 1}</span>
                            <button
                                onClick={() => downloadSlide(idx)}
                                className="text-xs bg-[#E8703A] text-white px-3 py-1 rounded hover:bg-orange-500 transition-colors tracking-wide font-medium"
                            >
                                이미지 다운로드 ↓
                            </button>
                        </div>

                        {/* Slide Mockup (html2canvas 타겟 영역) */}
                        <div
                            ref={el => slideRefs.current[idx] = el}
                            className="bg-[#FFF8F0] w-full aspect-[4/5] rounded-[10px] shadow-md relative overflow-hidden font-sans border border-gray-100"
                        >
                            <div className="absolute top-3 left-4 text-[9px] font-[800] tracking-[1.5px] text-[#E8703A]">IM AESTHETIC</div>

                            <div className="h-full pt-12 p-6 flex flex-col">
                                {slide.type === 'hook' && (
                                    <div className="flex-1 flex flex-col justify-center">
                                        <div className="w-8 h-1 bg-[#E8703A] rounded-full mb-4"></div>
                                        <div className="text-[10px] font-bold tracking-[2px] text-[#E8703A] mb-3">{slide.eyebrow}</div>
                                        <h2 className="text-[22px] font-[800] text-[#333333] leading-[1.35] tracking-tight whitespace-pre-line break-keep font-sans">
                                            {slide.title}
                                        </h2>
                                        <div className="mt-4 text-[12px] text-[#888]">{slide.sub}</div>
                                    </div>
                                )}

                                {slide.type === 'text' && (
                                    <div className="pt-2">
                                        <div className="text-[10px] font-bold tracking-[1.5px] text-[#E8703A] mb-2 uppercase">{slide.label}</div>
                                        <h3 className="text-[15px] font-bold text-[#333] mb-4">{slide.title} <span className="text-xl">{slide.icon}</span></h3>
                                        <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-50/50">
                                            <p className="text-[13px] text-[#555] leading-[1.7] whitespace-pre-line break-keep">
                                                {slide.content}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {slide.type === 'solution' && (
                                    <div className="pt-2 flex flex-col h-full">
                                        <div className="text-[10px] font-bold tracking-[1.5px] text-[#E8703A] mb-2 uppercase">{slide.label}</div>
                                        <div className="flex-1">
                                            <p className="text-[12px] text-[#444] leading-[1.6] bg-[#FFE4CC]/30 p-3 rounded-md mb-4 border-l-2 border-[#E8703A]">
                                                {slide.content}
                                            </p>
                                            {slide.image && (
                                                <div className="w-full h-32 rounded-md overflow-hidden bg-gray-100 mb-3 border border-orange-100/50 relative">
                                                    <img src={slide.image} alt="product" className="w-full h-full object-cover object-center" />
                                                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/80 to-transparent"></div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {slide.type === 'cta' && (
                                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                                        <div className="w-12 h-12 bg-[#E8703A] rounded-full flex items-center justify-center mb-4 text-white">
                                            <Bookmark size={20} />
                                        </div>
                                        <p className="text-[14px] font-[800] text-[#333] leading-[1.5] px-2 mb-6">
                                            {slide.title}
                                        </p>
                                        <div className="w-full bg-[#F5F0EB] py-3 rounded-lg text-[11px] text-[#666] flex flex-col gap-1">
                                            <div>📞 053-241-3855</div>
                                            <div>📍 대구 수성구 범어마크팰리스</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* AI Prompts Section */}
            <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🤖</span> AI 생성용 프롬프트 에셋
                </h3>

                <div className="grid gap-6">
                    <div>
                        <div className="text-sm font-bold text-gray-500 mb-2">고화질 이미지 생성 (Midjourney, DALL-E)</div>
                        <div className="flex flex-col gap-2">
                            <div className="p-3 bg-gray-50 rounded text-xs text-gray-700 font-mono relative group">
                                {mockData.image_generation_prompts.prompt_1}
                            </div>
                            <div className="p-3 bg-gray-50 rounded text-xs text-gray-700 font-mono">
                                {mockData.image_generation_prompts.prompt_2}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="text-sm font-bold text-gray-500 mb-2">릴스/쇼츠 기획 및 영상 생성 (Sora, Runway)</div>
                        <div className="p-3 bg-[#FFE4CC]/30 border border-[#E8703A]/20 rounded mb-2 text-sm text-gray-800">
                            <strong>🎬 기획 의도:</strong> {mockData.video_script.hook_scene}
                        </div>
                        <div className="p-3 bg-gray-50 rounded text-xs text-gray-700 font-mono">
                            {mockData.video_script.video_generation_prompt}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
