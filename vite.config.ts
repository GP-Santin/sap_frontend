import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react({ include: "**/*.tsx" })],
  build: {
    chunkSizeWarningLimit: 1000,
  },
});
