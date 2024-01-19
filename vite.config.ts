import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "import.meta.env.VITE_SAP_BASE_URL": JSON.stringify(
      process.env.VITE_SAP_BASE_URL
    ),
    "import.meta.env.VITE_SAP_LOGIN": JSON.stringify(
      process.env.VITE_SAP_LOGIN
    ),
    "import.meta.env.VITE_SAP_PASSWORD": JSON.stringify(
      process.env.VITE_SAP_PASSWORD
    ),
    "import.meta.env.VITE_CLIENT": JSON.stringify(process.env.VITE_CLIENT),
    "import.meta.env.VITE_AUTHORITY": JSON.stringify(
      process.env.VITE_AUTHORITY
    ),
  },
  plugins: [react()],
  build: { chunkSizeWarningLimit: 1600 },
});
