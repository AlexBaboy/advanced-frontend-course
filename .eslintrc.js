module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:storybook/recommended', 'plugin:storybook/recommended'],
  overrides: [],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname
  },
  plugins: ['react', `@typescript-eslint`],
  globals: {
    __IS_DEV__: true,
    __API__: ''
  },
  rules: {
    // 'prefer-nullish-coalescing': 'off'
    'react/jsx-indent': [2, 4],
    'no-floating-promises': 'off'
    // 'react/jsx-filename.extension': [2 , { extensions: ['.js', '.jsx', '.tsx'] }]
  }
};