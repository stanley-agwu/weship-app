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
        "react/jsx-uses-react": "off",
        "import/extensions": "off",
        "react/react-in-jsx-scope": "off",
        "import/prefer-default-export": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "no-param-reassign": "off",
        "@typescript-eslint/no-shadow": "off",
        "no-underscore-dangle": "off",
        "no-underscore-dangle": "off",
        "@typescript-eslint/no-unused-expressions": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-misused-promises": "warn",
        "@typescript-eslint/no-floating-promises": "warn",

    }
}
