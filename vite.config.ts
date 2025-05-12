/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enables `describe`, `it`, `expect` as globals
    environment: "jsdom", // For DOM support
  },
});
