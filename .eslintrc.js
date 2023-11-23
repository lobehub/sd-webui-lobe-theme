const config = require('@lobehub/lint').eslint;

config.rules['linebreak-style'] = 0;
config.rules['no-undef'] = 0;
config.rules['object-curly-spacing'] = 0;
config.rules['unicorn/prefer-add-event-listener'] = 0;

module.exports = config;
