import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // `npm run build:artifact`: relative, URL-safe asset paths for hosting as a Claude artifact
  ...(mode === 'artifact' && {
    base: './',
    build: {
      outDir: 'dist-artifact',
      rollupOptions: { output: { entryFileNames: 'assets/[hash].js', assetFileNames: 'assets/[hash][extname]' } },
    },
  }),
}));
