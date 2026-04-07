import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
      '/uploads': 'http://localhost:3001',
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        instagram: resolve(__dirname, 'instagram_preview_react.html'),
        cardnews: resolve(__dirname, 'card_news_maker.html'),
        carousel: resolve(__dirname, 'carousel_templates.html'),
        checklist: resolve(__dirname, '현장촬영_체크리스트.html'),
        highlight: resolve(__dirname, 'highlight_cover_maker.html'),
        canva: resolve(__dirname, 'canva_templates.html'),
        eventcard: resolve(__dirname, 'event_card_maker.html'),
        review: resolve(__dirname, 'review_overlay_maker.html'),
        reels: resolve(__dirname, 'reels_cover_maker.html'),
        baPhoto: resolve(__dirname, 'ba_photo_maker.html'),
        profileRenewal: resolve(__dirname, 'instagram_profile_renewal_1.html'),
        trendAnalysis: resolve(__dirname, 'trend_analysis_2026.html'),
        userGuide: resolve(__dirname, 'user_guide.html'),
      },
    },
  },
});
