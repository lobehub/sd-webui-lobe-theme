const { description } = require('./package.json');

const options = require('./locales/options.json');

const outputLocales = options.map((item) => item.value).filter((item) => item !== 'en_US');

module.exports = {
  reference: description,
  entry: 'locales/en_US.json',
  entryLocale: 'en_US',
  output: 'locales',
  outputLocales: outputLocales,
  modelName: 'gpt-3.5-turbo-0125',
  experimental: {
    jsonMode: true,
  },
  markdown: {
    entry: ['./README.md'],
    outputLocales: ['zh_CN'],
    outputExtensions: (locale) => {
      if (locale === 'en_US') return '.md';
      return `.${locale.replace('_', '-')}.md`;
    },
  },
};
