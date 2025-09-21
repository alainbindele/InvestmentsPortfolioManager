// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [],
      output: {
        manualChunks: {
          // Vendor chunks
          "react-vendor": ["react", "react-dom"],
          "chart-vendor": ["recharts"],
          "icons-vendor": ["lucide-react"],
          // App chunks
          "portfolio-components": [
            "./src/components/AssetForm.tsx",
            "./src/components/PortfolioChart.tsx",
            "./src/components/AssetModal.tsx"
          ],
          "strategy-components": [
            "./src/components/StrategyCard.tsx",
            "./src/components/StrategyComparison.tsx",
            "./src/components/AllocationEditor.tsx",
            "./src/components/ProjectionChart.tsx"
          ],
          "ai-components": [
            "./src/components/ChatGPTIntegration.tsx",
            "./src/services/chatgpt.ts"
          ],
          "ui-components": [
            "./src/components/LanguageSelector.tsx",
            "./src/components/CurrencySelector.tsx",
            "./src/components/DisclaimerModal.tsx",
            "./src/components/ResetButton.tsx",
            "./src/components/SEOHead.tsx"
          ],
          "utils": [
            "./src/utils/calculations.ts",
            "./src/utils/storage.ts",
            "./src/utils/translations.ts"
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1e3,
    target: "esnext",
    minify: "esbuild"
  },
  optimizeDeps: {
    include: ["react", "react-dom", "recharts", "lucide-react"],
    force: true
  },
  resolve: {},
  server: {
    fs: {
      strict: false
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCldLFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICAvLyBWZW5kb3IgY2h1bmtzXG4gICAgICAgICAgJ3JlYWN0LXZlbmRvcic6IFsncmVhY3QnLCAncmVhY3QtZG9tJ10sXG4gICAgICAgICAgJ2NoYXJ0LXZlbmRvcic6IFsncmVjaGFydHMnXSxcbiAgICAgICAgICAnaWNvbnMtdmVuZG9yJzogWydsdWNpZGUtcmVhY3QnXSxcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBBcHAgY2h1bmtzXG4gICAgICAgICAgJ3BvcnRmb2xpby1jb21wb25lbnRzJzogW1xuICAgICAgICAgICAgJy4vc3JjL2NvbXBvbmVudHMvQXNzZXRGb3JtLnRzeCcsXG4gICAgICAgICAgICAnLi9zcmMvY29tcG9uZW50cy9Qb3J0Zm9saW9DaGFydC50c3gnLFxuICAgICAgICAgICAgJy4vc3JjL2NvbXBvbmVudHMvQXNzZXRNb2RhbC50c3gnXG4gICAgICAgICAgXSxcbiAgICAgICAgICAnc3RyYXRlZ3ktY29tcG9uZW50cyc6IFtcbiAgICAgICAgICAgICcuL3NyYy9jb21wb25lbnRzL1N0cmF0ZWd5Q2FyZC50c3gnLFxuICAgICAgICAgICAgJy4vc3JjL2NvbXBvbmVudHMvU3RyYXRlZ3lDb21wYXJpc29uLnRzeCcsXG4gICAgICAgICAgICAnLi9zcmMvY29tcG9uZW50cy9BbGxvY2F0aW9uRWRpdG9yLnRzeCcsXG4gICAgICAgICAgICAnLi9zcmMvY29tcG9uZW50cy9Qcm9qZWN0aW9uQ2hhcnQudHN4J1xuICAgICAgICAgIF0sXG4gICAgICAgICAgJ2FpLWNvbXBvbmVudHMnOiBbXG4gICAgICAgICAgICAnLi9zcmMvY29tcG9uZW50cy9DaGF0R1BUSW50ZWdyYXRpb24udHN4JyxcbiAgICAgICAgICAgICcuL3NyYy9zZXJ2aWNlcy9jaGF0Z3B0LnRzJ1xuICAgICAgICAgIF0sXG4gICAgICAgICAgJ3VpLWNvbXBvbmVudHMnOiBbXG4gICAgICAgICAgICAnLi9zcmMvY29tcG9uZW50cy9MYW5ndWFnZVNlbGVjdG9yLnRzeCcsXG4gICAgICAgICAgICAnLi9zcmMvY29tcG9uZW50cy9DdXJyZW5jeVNlbGVjdG9yLnRzeCcsXG4gICAgICAgICAgICAnLi9zcmMvY29tcG9uZW50cy9EaXNjbGFpbWVyTW9kYWwudHN4JyxcbiAgICAgICAgICAgICcuL3NyYy9jb21wb25lbnRzL1Jlc2V0QnV0dG9uLnRzeCcsXG4gICAgICAgICAgICAnLi9zcmMvY29tcG9uZW50cy9TRU9IZWFkLnRzeCdcbiAgICAgICAgICBdLFxuICAgICAgICAgICd1dGlscyc6IFtcbiAgICAgICAgICAgICcuL3NyYy91dGlscy9jYWxjdWxhdGlvbnMudHMnLFxuICAgICAgICAgICAgJy4vc3JjL3V0aWxzL3N0b3JhZ2UudHMnLFxuICAgICAgICAgICAgJy4vc3JjL3V0aWxzL3RyYW5zbGF0aW9ucy50cydcbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCxcbiAgICB0YXJnZXQ6ICdlc25leHQnLFxuICAgIG1pbmlmeTogJ2VzYnVpbGQnXG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGluY2x1ZGU6IFsncmVhY3QnLCAncmVhY3QtZG9tJywgJ3JlY2hhcnRzJywgJ2x1Y2lkZS1yZWFjdCddLFxuICAgIGZvcmNlOiB0cnVlXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgZnM6IHtcbiAgICAgIHN0cmljdDogZmFsc2VcbiAgICB9XG4gIH1cbn0pIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLG9CQUFvQjtBQUN0UCxPQUFPLFdBQVc7QUFHbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQztBQUFBLE1BQ1gsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBO0FBQUEsVUFFWixnQkFBZ0IsQ0FBQyxTQUFTLFdBQVc7QUFBQSxVQUNyQyxnQkFBZ0IsQ0FBQyxVQUFVO0FBQUEsVUFDM0IsZ0JBQWdCLENBQUMsY0FBYztBQUFBO0FBQUEsVUFHL0Isd0JBQXdCO0FBQUEsWUFDdEI7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxVQUNBLHVCQUF1QjtBQUFBLFlBQ3JCO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFVBQ0EsaUJBQWlCO0FBQUEsWUFDZjtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsVUFDQSxpQkFBaUI7QUFBQSxZQUNmO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxVQUNBLFNBQVM7QUFBQSxZQUNQO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSx1QkFBdUI7QUFBQSxJQUN2QixRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLFNBQVMsYUFBYSxZQUFZLGNBQWM7QUFBQSxJQUMxRCxPQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsU0FBUyxDQUNUO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixJQUFJO0FBQUEsTUFDRixRQUFRO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
