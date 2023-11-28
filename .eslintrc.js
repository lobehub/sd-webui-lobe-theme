const config = require('@lobehub/lint').eslint;

config.rules['unicorn/prefer-add-event-listener'] = 0;
config.rules['unicorn/no-negated-condition'] = 0;
config.rules['unicorn/prefer-type-error'] = 0;
config.rules['unicorn/prefer-logical-operator-over-ternary'] = 0;
config.rules['unicorn/no-null'] = 0;
config.rules['unicorn/no-typeof-undefined'] = 0;
config.rules['unicorn/explicit-length-check'] = 0;
config.rules['unicorn/prefer-code-point'] = 0;
config.rules['no-extra-boolean-cast'] = 0;
config.rules['unicorn/no-useless-undefined'] = 0;
config.rules['react/no-unknown-property'] = 0;
config.rules['unicorn/prefer-ternary'] = 0;
config.rules['unicorn/prefer-spread'] = 0;

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
