import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

function preloadCssPlugin(): Plugin {
  return {
    name: "preload-css",
    transformIndexHtml(html) {
      return html.replace(
        /<link rel="stylesheet" (crossorigin )?href="([^"]+\.css)">/g,
        '<link rel="preload" as="style" $1href="$2">\n    <link rel="stylesheet" $1href="$2">'
      );
    },
  };
}

export default defineConfig(({ mode }) => ({
  base: "/",
  plugins: [react(), preloadCssPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Correctly maps the @ alias to the src folder
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) return "framer-motion";
            if (id.includes("lucide-react")) return "lucide-react";
            return "vendor";
          }
        },
      },
    },
  },
}));
