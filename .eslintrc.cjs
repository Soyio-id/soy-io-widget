module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: './',
  },
  settings: {
    'import/resolver': {
      typescript: { },
      node: { },
    },
  },
  env: { es6: true },
  ignorePatterns: ['node_modules', 'dist', 'coverage'],
  plugins: ['import', 'eslint-comments', 'eslint-plugin-tsdoc', '@typescript-eslint'],
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:eslint-comments/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  globals: { BigInt: true, console: true, WebAssembly: true },
  rules: {
    'max-len': ['error', { code: 120, ignoreUrls: true }],
    'tsdoc/syntax': 'warn',
    'lines-between-class-members': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'import/extensions': 'off',
    'import/no-cycle': 'off',
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['./src/spec/**'],
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'eslint-comments/disable-enable-pair': [
      'error',
      { allowWholeFile: true },
    ],
    'eslint-comments/no-unused-disable': 'error',
    'import/order': [
      'error',
      { 'newlines-between': 'always', alphabetize: { order: 'asc' } },
    ],
    'sort-imports': [
      'error',
      { ignoreDeclarationSort: true, ignoreCase: true },
    ],
  },
};
