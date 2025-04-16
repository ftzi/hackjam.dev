import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import biome from "eslint-config-biome";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  biome,
  {
    ignores: ["src/server/db/schema/auth.ts", ".next", ".vercel"],
  },
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
          args: "after-used",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
          args: "after-used",
        },
      ],
      "a11y": {
        "useValidAriaRole": "warn",
      }
    },
  },
];

export default eslintConfig;
