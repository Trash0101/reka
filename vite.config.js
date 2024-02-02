import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import path from "node:path";

export default defineConfig({
    plugins: [
        vue(),
        laravel({
            buildDirectory: "app/front",
            input: ["resources/front/app.js"],
        }),
    ],
    resolve: {
        alias: {
            "@": path.join(__dirname, "/resources/front"),
            "~": path.join(__dirname, "/node_modules"),
        },
    },
    build: {
        chunkSizeWarningLimit: 1600,
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@use "/resources/front/src/assets/index.scss" as *;'
            }
        }
    }
});
