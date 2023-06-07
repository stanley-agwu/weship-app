module.exports = {
  extends: ['utility', 'utility/import'],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'no-underscore-dangle': 1,
    'no-console': 2,
    'react/react-in-jsx-scope': 0,
  }
};