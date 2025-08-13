import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // optional: set your dev port
  },
  build: {
    outDir: 'dist', // Vercel looks for this by default
  },
  resolve: {
    alias: {
      '@': '/src', // optional: easier imports
    },
  },
});
