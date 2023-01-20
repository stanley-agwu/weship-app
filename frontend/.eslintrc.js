module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "jest": true,
    },
    "extends": [
        "react-app",
        "react-app/jest",
        "airbnb-base",
        "airbnb-typescript",
        "plugin:import/typescript",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        "prettier"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "prettier"
    ],
    "rules": {
        "import/extensions": "off",
        "react/react-in-jsx-scope": "off",
    }
}
