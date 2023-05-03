module.exports = {
  extends: ['utility'],
  parserOptions: {
    project: './backend/tsconfig.json'
  },
  rules: {
    'no-underscore-dangle': 'off',
  }
};
