/* global module */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', 'simple-import-sort'],
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    curly: ['error', 'all'],
    'no-console': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_|^args$' },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^node:'],
          ['^react$', '^@?\\w'],
          ['^@bofit/'],
          ['^@bds/'],
          ['^@pages/'],
          ['^@widgets/'],
          ['^@shared/'],
          ['^\\u0000'],
          ['^\\.'],
          ['^.+\\.css$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
  },
};
