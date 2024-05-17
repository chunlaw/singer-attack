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
    short_name: 'PWA',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'assets/meteorite2.png',
        sizes: 'any',
        purpose: 'any',
        type: "image/svg+xml"
      },
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
