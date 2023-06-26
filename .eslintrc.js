const config = require('@lobehub/lint').eslint;

config.rules['indent'] = ['off', 2];

module.exports = {
  ...config,
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'linebreak-style': 0,
        'no-undef': 0,
        'object-curly-spacing': 0,
        'unicorn/prefer-add-event-listener': 0,
      },
    },
  ],
};
