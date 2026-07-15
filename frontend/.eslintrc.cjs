module.exports = {
  parserOptions: { ecmaFeatures: { jsx: true } },
  env: { browser: true, es2021: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier'
  ],
  settings: { react: { version: 'detect' } },
  rules: {}
};
