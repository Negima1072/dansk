import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import simpleImportSort from "eslint-plugin-simple-import-sort";
import prettierConfig from 'eslint-config-prettier';
import eslintPluginReact from 'eslint-plugin-react/configs/recommended.js';
import globals from "globals";

export default tseslint.config(
    {
        ignores: ["**/*.js", "**/*.mjs", "**/*.cjs", "**/*.ts"],
    },
    {
        files: ["src/**/*.ts", "src/**/*.tsx"],
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2017,
            },
            parserOptions: {
                sourceType: "module",
                tsconfigRootDir: import.meta.dirname,
                project: "./tsconfig.eslint.json",
                ecmaFeatures: {
                    jsx: true,
                }
            }
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    eslintPluginReact,
    prettierConfig,
    {
        plugins: {
            "simple-import-sort": simpleImportSort,
        },
    },
    {
        rules: {
            "@typescript-eslint/restrict-template-expressions": "off",
            "@typescript-eslint/unbound-method": "off",
            "@typescript-eslint/consistent-type-imports": "error",
            "@typescript-eslint/no-unused-vars": "error",
            "no-unused-vars": "off",
            "no-control-regex": "off",
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
            "@typescript-eslint/typedef": "error",
            "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off"
        }
    }
)
