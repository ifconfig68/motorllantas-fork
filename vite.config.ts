import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.JPG'],
  esbuild: {
    logOverride: { 'file-not-found': 'silent' } // ignora errores de imports faltantes
  },
});
