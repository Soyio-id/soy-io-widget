import js from '@eslint/js'
import importPlugin from "eslint-plugin-import";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  importPlugin.flatConfigs.recommended,
  js.configs.recommended,
  {
    files: ["**/*.{ts,js,mjs,cjs,tsx,jsx}"],
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
        node: {
          extensions: [".js", ".ts", ".mjs", ".cjs", ".tsx", ".jsx"],
        },
      },
    },
    rules: {
      "import/prefer-default-export": "off",
      "import/extensions": "off",
      "import/no-cycle": "off",
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: ["./src/spec/**", "./eslint.config.js", "./smoke-test/**", "./vite.smoke.config.ts"],
        },
      ],
      "import/order": [
        "error",
        { "newlines-between": "always", "alphabetize": { order: "asc" } },
      ],
      "import/no-unresolved": [
        "error",
        {
          ignore: ["^@/"],
        },
      ],
    },
  },
  {
    ignores: ["node_modules", "dist", "eslint.config.*", "smoke-test/**"],
  },
  tseslint.configs.recommended,
);
