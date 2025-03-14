import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
<<<<<<< HEAD
        target: "http://localhost:3000", // Your backend server
=======
        target: "http://localhost:3000",
>>>>>>> eedc505a992a349b08d01a8a2b4a3aa2d5737d1f
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
