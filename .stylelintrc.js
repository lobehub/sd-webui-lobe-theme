module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-clean-order'],
  rules: {
    'declaration-block-no-duplicate-properties': null,
  },
  overrides: [
    {
      files: ['*.less', '*.css'],
      plugins: ['stylelint-order'],
      customSyntax: 'postcss-less',
      rules: {
        'no-descending-specificity': null,
      },
    },
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      plugins: ['stylelint-order'],
      customSyntax: 'postcss-styled-syntax',
    },
  ],
};
