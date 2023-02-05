module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "jest": true,
    },
    "extends": [
        "airbnb-base",
        "airbnb-typescript",
        "plugin:import/typescript",
        "plugin:import/errors",
        "plugin:import/warnings",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended",
        "plugin:@typescript-eslint/recommended",
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": "./backend/tsconfig.json"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "import",
        "prettier"
    ],
    "rules": {
        "prettier/prettier": "error",
        "react/jsx-uses-react": "off",
        "import/extensions": "off",
        "react/react-in-jsx-scope": "off",
        "import/prefer-default-export": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "no-param-reassign": "off",
        "@typescript-eslint/no-shadow": "off",
        "no-console": "off",
        "no-underscore-dangle": "off",
        "@typescript-eslint/no-unused-expressions": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-misused-promises": "warn",
        "@typescript-eslint/no-floating-promises": "warn",
        "import/order": [
            "error",
            {
                "newlines-between": "never",
                groups: [
                    ["builtin", 'external'],
                    ["internal", "parent", "sibling", "index"],
                ],
            }
        ],
        "@typescript-eslint/naming-convention": [
            "warn",
            {
                "selector": "variable",
                "format": [
                    "camelCase",
                    "PascalCase",
                    "UPPER_CASE"
                ],
                "leadingUnderscore": "allow"
            },
        ],
    },
    "settings": {
        "react": {
            "version": "detect"
        },
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
        },
        "import/resolver": {
            "typescript": {
                "alwaysTryTypes": true,
                "project": "./backend/tsconfig.json",
            },
        },
    },
}
