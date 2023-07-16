const { description } = require('./package.json');
const { defineConfig } = require('@lobehub/i18n-cli');
const options = require('./locales/options.json');

const outputLocales = options.map((item) => item.value).filter((item) => item !== 'en_US');

module.exports = defineConfig({
  reference: description,
  entry: 'locales/en_US.json',
  entryLocale: 'en_US',
  output: 'locales',
  outputLocales: outputLocales,
  splitToken: 2500,
  temperature: 0,
  modelName: 'gpt-3.5-turbo',
});
