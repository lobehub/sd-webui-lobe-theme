module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-prettier'],
  plugins: ['stylelint-less', 'stylelint-order'],
  customSyntax: 'postcss-less',
  rules: {
    'selector-id-pattern': null,
    'selector-class-pattern': null,
    'number-max-precision': null,
    'font-family-no-duplicate-names': null,
    'no-descending-specificity': null,
    'declaration-block-no-duplicate-properties': null,
  },
}
