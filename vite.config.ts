import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      plugins: [react()],
      define: {
        // セキュリティ上の理由で、APIキーはサーバーサイドでのみ使用
        // クライアントサイドには注入しない
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      server: {
        proxy: {
          '/api': 'http://localhost:3001'
        }
      },
      build: {
        outDir: 'dist',
        sourcemap: false,
        minify: 'esbuild'
      }
    };
});
