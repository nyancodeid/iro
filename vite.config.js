import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      manifest: {
        name: "IRO - Amazing Color Tools",
        shortName: "IRO",
        theme_color: "#212121",
      }
    })
  ],
});
