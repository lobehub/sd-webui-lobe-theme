module.exports = {
  extends: require.resolve('@umijs/lint/dist/config/eslint'),
  plugins: ['simple-import-sort', 'import', 'typescript-sort-keys'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'typescript-sort-keys/interface': 'error',
    'typescript-sort-keys/string-enum': 'error',
    'react/jsx-sort-props': 'error',
    'react/jsx-no-useless-fragment': 'error',
  },
};
