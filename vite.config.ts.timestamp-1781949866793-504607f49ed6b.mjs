// vite.config.ts
import { defineConfig } from "file:///D:/Dev/saEnviro/sa-environment/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Dev/saEnviro/sa-environment/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
var __vite_injected_original_dirname = "D:\\Dev\\saEnviro\\sa-environment";
function preloadCssPlugin() {
  return {
    name: "preload-css",
    transformIndexHtml(html) {
      return html.replace(
        /<link rel="stylesheet" (crossorigin )?href="([^"]+\.css)">/g,
        '<link rel="preload" as="style" $1href="$2">\n    <link rel="stylesheet" $1href="$2">'
      );
    }
  };
}
var vite_config_default = defineConfig(({ mode }) => ({
  base: "/",
  plugins: [react(), preloadCssPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
      // Correctly maps the @ alias to the src folder
    }
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
          }
        }
      }
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxEZXZcXFxcc2FFbnZpcm9cXFxcc2EtZW52aXJvbm1lbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXERldlxcXFxzYUVudmlyb1xcXFxzYS1lbnZpcm9ubWVudFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovRGV2L3NhRW52aXJvL3NhLWVudmlyb25tZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBQbHVnaW4gfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5cclxuZnVuY3Rpb24gcHJlbG9hZENzc1BsdWdpbigpOiBQbHVnaW4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiBcInByZWxvYWQtY3NzXCIsXHJcbiAgICB0cmFuc2Zvcm1JbmRleEh0bWwoaHRtbCkge1xyXG4gICAgICByZXR1cm4gaHRtbC5yZXBsYWNlKFxyXG4gICAgICAgIC88bGluayByZWw9XCJzdHlsZXNoZWV0XCIgKGNyb3Nzb3JpZ2luICk/aHJlZj1cIihbXlwiXStcXC5jc3MpXCI+L2csXHJcbiAgICAgICAgJzxsaW5rIHJlbD1cInByZWxvYWRcIiBhcz1cInN0eWxlXCIgJDFocmVmPVwiJDJcIj5cXG4gICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiICQxaHJlZj1cIiQyXCI+J1xyXG4gICAgICApO1xyXG4gICAgfSxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xyXG4gIGJhc2U6IFwiL1wiLFxyXG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBwcmVsb2FkQ3NzUGx1Z2luKCldLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLCAvLyBDb3JyZWN0bHkgbWFwcyB0aGUgQCBhbGlhcyB0byB0aGUgc3JjIGZvbGRlclxyXG4gICAgfSxcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBvdXREaXI6IFwiZGlzdFwiLFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICBtYW51YWxDaHVua3M6IChpZCkgPT4ge1xyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwibm9kZV9tb2R1bGVzXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcImZyYW1lci1tb3Rpb25cIikpIHJldHVybiBcImZyYW1lci1tb3Rpb25cIjtcclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwibHVjaWRlLXJlYWN0XCIpKSByZXR1cm4gXCJsdWNpZGUtcmVhY3RcIjtcclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiQHJhZGl4LXVpXCIpKSByZXR1cm4gXCJyYWRpeC11aVwiO1xyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJ0aHJlZVwiKSkgcmV0dXJuIFwidGhyZWVcIjtcclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwicmVjaGFydHNcIikpIHJldHVybiBcInJlY2hhcnRzXCI7XHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcInJlYWN0XCIpIHx8IGlkLmluY2x1ZGVzKFwicmVhY3QtZG9tXCIpIHx8IGlkLmluY2x1ZGVzKFwicmVhY3Qtcm91dGVyLWRvbVwiKSkgcmV0dXJuIFwicmVhY3QtdmVuZG9yXCI7XHJcbiAgICAgICAgICAgIC8vIERvIG5vdCB1c2UgYSBnZW5lcmljIFwidmVuZG9yXCIgcmV0dXJuIGhlcmU7IGxldCBSb2xsdXAgc3BsaXQgdGhlIHJlc3QgYXV0b21hdGljYWxseSBiYXNlZCBvbiBSb3V0ZSBsYXp5IGltcG9ydHMuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxufSkpO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9SLFNBQVMsb0JBQTRCO0FBQ3pULE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFGakIsSUFBTSxtQ0FBbUM7QUFJekMsU0FBUyxtQkFBMkI7QUFDbEMsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sbUJBQW1CLE1BQU07QUFDdkIsYUFBTyxLQUFLO0FBQUEsUUFDVjtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQUVBLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsTUFBTTtBQUFBLEVBQ04sU0FBUyxDQUFDLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQztBQUFBLEVBQ3JDLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQTtBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYyxDQUFDLE9BQU87QUFDcEIsY0FBSSxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBQy9CLGdCQUFJLEdBQUcsU0FBUyxlQUFlLEVBQUcsUUFBTztBQUN6QyxnQkFBSSxHQUFHLFNBQVMsY0FBYyxFQUFHLFFBQU87QUFDeEMsZ0JBQUksR0FBRyxTQUFTLFdBQVcsRUFBRyxRQUFPO0FBQ3JDLGdCQUFJLEdBQUcsU0FBUyxPQUFPLEVBQUcsUUFBTztBQUNqQyxnQkFBSSxHQUFHLFNBQVMsVUFBVSxFQUFHLFFBQU87QUFDcEMsZ0JBQUksR0FBRyxTQUFTLE9BQU8sS0FBSyxHQUFHLFNBQVMsV0FBVyxLQUFLLEdBQUcsU0FBUyxrQkFBa0IsRUFBRyxRQUFPO0FBQUEsVUFFbEc7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
