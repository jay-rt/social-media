import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://social-media-api-l2ms.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
