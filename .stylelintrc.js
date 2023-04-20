module.exports = {
  plugins: ['stylelint-less'],
  customSyntax: 'postcss-less',
  rules: {},
  ...require.resolve('@umijs/lint/dist/config/stylelint'),
}
