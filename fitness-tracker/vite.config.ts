import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/my-app/", // Set the base URL for deployment
  plugins: [
    react(), // Enable React support
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Define aliases for commonly used directories
    },
  },
  build: {
    outDir: "dist", // Specify the output directory for the production build
  },
});
