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
    files: ["**/*.{ts,js,mjs,cjs}"],
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".ts", ".mjs", ".cjs"],
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
          devDependencies: ["./src/spec/**", "./eslint.config.js"],
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
    ignores: ["node_modules", "dist", "eslint.config.*"],
  },
  tseslint.configs.recommended,
);
