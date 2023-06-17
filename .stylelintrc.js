module.exports = {
  ...require('@lobehub/lint').stylelint,
  rules: {
    'selector-class-pattern': null,
    'selector-id-pattern': null,
    'no-descending-specificity': [
      true,
      {
        severity: 'warning',
      },
    ],
  },
};
