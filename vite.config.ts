import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [],
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'chart-vendor': ['recharts'],
          'icons-vendor': ['lucide-react'],
          
          // App chunks
          'portfolio-components': [
            './src/components/AssetForm.tsx',
            './src/components/PortfolioChart.tsx',
            './src/components/AssetModal.tsx'
          ],
          'strategy-components': [
            './src/components/StrategyCard.tsx',
            './src/components/StrategyComparison.tsx',
            './src/components/AllocationEditor.tsx',
            './src/components/ProjectionChart.tsx'
          ],
          'ai-components': [
            './src/components/ChatGPTIntegration.tsx',
            './src/services/chatgpt.ts'
          ],
          'ui-components': [
            './src/components/LanguageSelector.tsx',
            './src/components/CurrencySelector.tsx',
            './src/components/DisclaimerModal.tsx',
            './src/components/ResetButton.tsx',
            './src/components/SEOHead.tsx'
          ],
          'utils': [
            './src/utils/calculations.ts',
            './src/utils/storage.ts',
            './src/utils/translations.ts'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    target: 'esnext',
    minify: 'esbuild'
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'recharts', 'lucide-react'],
    force: true
  },
  resolve: {
  },
  server: {
    fs: {
      strict: false
    }
  }
})