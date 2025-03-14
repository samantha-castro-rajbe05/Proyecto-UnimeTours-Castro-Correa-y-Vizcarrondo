import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: "./", // Debe apuntar a la raíz del proyecto
  
});