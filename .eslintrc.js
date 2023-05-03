module.exports = {
  extends: ['utility', 'utility/import'],
  parserOptions: {
    project: './backend/tsconfig.json'
  },
  rules: {
    'no-underscore-dangle': 'off',
  }
};
