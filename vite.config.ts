import { ConfigEnv, defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig(({mode}: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), eslint({}), VitePWA(pwaOptions)],
    server: {
      host: true,
      // port: parseInt(env.PORT ?? "9100", 10),
      // strictPort: true,
    },
  }
});

const pwaOptions: Partial<VitePWAOptions> = {
  mode: "development",
  base: "/",
  includeAssets: ["assets/meteorite2.png"], // as favicon.ico
  manifest: {
    name: 'Singer Attack',
    short_name: 'singer-attack',
    theme_color: '#000000',
    icons: [
      {
        src: "assets/favicon.ico",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon"
      }, {
        src: "assets/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192"
      }, {
        src: "assets/android-chrome-256x256.png",
        type: "image/png",
        sizes: "256x256"
      }
    ],
    display: 'standalone',
  },
  devOptions: {
    enabled: process.env.SW_DEV === "true",
    type: "module",
    navigateFallback: "index.html"
  },
  registerType: "autoUpdate",
  workbox: {
    runtimeCaching: [
      // for lazy caching anything
      // reference to https://vite-pwa-org.netlify.app/workbox/generate-sw.html#cache-external-resources 
      {
        urlPattern: ({url}) => (
          url.origin === self.location.origin && url.pathname.startsWith("/assets")
        ),
        handler: "CacheFirst",
        options: {
          cacheName: "app-runtime",
          cacheableResponse: {
            statuses: [0, 200],
          }
        }
      },
    ]
  }
}
