import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        instagram: resolve(__dirname, 'instagram_preview_react.html'),
        cardnews: resolve(__dirname, 'card_news_maker.html'),
        carousel: resolve(__dirname, 'carousel_templates.html'),
        checklist: resolve(__dirname, '현장촬영_체크리스트.html'),
        beforeafter: resolve(__dirname, 'before_after_maker.html'),
        highlight: resolve(__dirname, 'highlight_cover_maker.html'),
        review: resolve(__dirname, 'review_overlay_maker.html'),
        reels: resolve(__dirname, 'reels_cover_maker.html'),
      },
    },
  },
});
