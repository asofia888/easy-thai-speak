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
        minify: 'esbuild',
        rollupOptions: {
          output: {
            manualChunks: {
              // Vendor chunks
              'vendor-react': ['react', 'react-dom', 'react-router-dom'],
              'vendor-google': ['@google/generative-ai'],

              // Route chunks (lazy loaded)
              // These are automatically split by dynamic imports

              // Shared components
              'ui-components': [
                './components/common/Icon.tsx',
                './components/WordChip.tsx',
                './components/LoadingFallback.tsx',
              ],
            },
            // Better chunk naming for debugging
            chunkFileNames: (chunkInfo) => {
              const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
              return `assets/[name]-[hash].js`;
            },
            entryFileNames: 'assets/[name]-[hash].js',
            assetFileNames: 'assets/[name]-[hash].[ext]',
          },
        },
        // Chunk size warnings
        chunkSizeWarningLimit: 500,
      },
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/setup.ts',
        css: true,
        coverage: {
          provider: 'v8',
          reporter: ['text', 'json', 'html'],
          exclude: [
            'node_modules/',
            'tests/',
            '*.config.ts',
            'dist/',
          ],
        },
      },
    };
});
