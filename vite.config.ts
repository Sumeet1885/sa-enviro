import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  base: "/",
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Correctly maps the @ alias to the src folder
    },
  },
  build: {
    outDir: "dist", // Explicitly define the output directory for Vercel
  },
}));
