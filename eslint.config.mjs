import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/**
 * Configuration ESLint à plat — voir
 * darmeuble-kit/docs/frontend/socle-frontend.md et
 * darmeuble-kit/config-templates/frontend/eslint.config.mjs.
 */
const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,

  {
    ignores: [".next/**", "node_modules/**", "coverage/**"],
  },

  {
    settings: {
      "import/resolver": {
        typescript: { project: "./tsconfig.json" },
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",

      /**
       * Un dossier `features/x` n'importe jamais depuis `features/y`.
       * Trois espaces distincts (organization/tenant/super-admin, voir
       * darmeuble-kit/docs/frontend/socle-frontend.md §1) rendent cette
       * règle encore plus importante que sur un projet à un seul espace.
       */
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              target: "./src/features/*",
              from: "./src/features/*",
              except: ["./"],
              message:
                "Un feature n'importe jamais depuis un autre feature. Remonter le code partagé dans components/shared/ ou lib/.",
            },
          ],
        },
      ],
    },
  },
];

export default config;
