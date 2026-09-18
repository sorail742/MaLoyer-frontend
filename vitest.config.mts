import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    // `threads` plutôt que le pool par défaut (`forks`) : le fork de
    // processus par fichier de test dépasse le délai d'attente du worker
    // dans certains environnements contraints (sandbox CI), sans rapport
    // avec la validité des tests eux-mêmes.
    pool: "threads",
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
});
