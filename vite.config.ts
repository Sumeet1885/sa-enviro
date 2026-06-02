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
            if (id.includes("@radix-ui")) return "radix-ui";
            if (id.includes("three")) return "three";
            if (id.includes("recharts")) return "recharts";
            if (id.includes("react") || id.includes("react-dom") || id.includes("react-router-dom")) return "react-vendor";
            // Do not use a generic "vendor" return here; let Rollup split the rest automatically based on Route lazy imports.
          }
        },
      },
    },
  },
}));
