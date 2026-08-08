import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Static output is Astro's default; no adapter by design (hosting swappable).
export default defineConfig({
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
