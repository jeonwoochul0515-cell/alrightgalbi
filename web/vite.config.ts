import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2022",
    cssTarget: "chrome108",
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 250,
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-router")) return "react-router";
            if (id.includes("react-dom") || id.includes("react/")) return "react-vendor";
            if (id.includes("react-kakao-maps")) return "kakao-map";
            if (id.includes("motion")) return "motion";
            if (id.includes("firebase")) return "firebase";
          }
        },
      },
    },
  },
  server: { port: 5173, strictPort: true },
});
