import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      external: ["react", "react-router", "react-router-dom"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "./private.key")),
      cert: fs.readFileSync(path.resolve(__dirname, "./certificate.crt")),
    },
  },
});
