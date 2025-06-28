import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import rollupNodePolyFill from "rollup-plugin-polyfill-node";

export default defineConfig({
  plugins: [
    react(),
    rollupNodePolyFill(), // ✅ enables node core polyfills
  ],
  define: {
    global: 'globalThis', // ✅ fixes 'global is not defined'
  },
  optimizeDeps: {
    include: ['buffer', 'process', 'events'], // ✅ include polyfills for deps
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
      },
    },
  },
});
