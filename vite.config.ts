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
            manualChunks: (id) => {
              // Vendor chunks
              if (id.includes('node_modules')) {
                if (id.includes('react') || id.includes('react-dom')) {
                  return 'vendor-react';
                }
                if (id.includes('react-router-dom')) {
                  return 'vendor-router';
                }
                if (id.includes('@google/generative-ai')) {
                  return 'vendor-google';
                }
                // Other node_modules
                return 'vendor';
              }

              // Split contexts separately
              if (id.includes('/contexts/')) {
                return 'contexts';
              }

              // Split hooks separately
              if (id.includes('/hooks/')) {
                return 'hooks';
              }

              // Split data files (large constants)
              if (id.includes('/data/')) {
                return 'data';
              }

              // Split common components
              if (id.includes('/components/common/') || id.includes('WordChip') || id.includes('LoadingFallback')) {
                return 'ui-components';
              }
            },
            // Better chunk naming for debugging
            chunkFileNames: 'assets/[name]-[hash].js',
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
          reporter: ['text', 'text-summary', 'json', 'json-summary', 'html', 'lcov'],
          reportsDirectory: './coverage',
          exclude: [
            'node_modules/',
            'tests/',
            'e2e/',
            '**/*.test.{ts,tsx}',
            '**/__tests__/**',
            '*.config.{ts,js}',
            'dist/',
            'server/',
            'api/',
            'coverage/',
            '**/*.d.ts',
          ],
          // Note: thresholds removed temporarily to ensure coverage generation
        },
      },
    };
});
