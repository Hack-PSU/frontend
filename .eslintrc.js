const deepmerge = require('deepmerge');

const config = require('@dji-dev/us-web-config/eslint')({
  typescript: true,
  graphql: false,
  react: true,
  vue: false,
});

module.exports = deepmerge(config, {
  plugins: ['angular'],
  rules: {
    'no-magic-numbers': 'off',
    'no-shadow': 'off',
    'no-console': 'off',
    'no-restricted-globals': 'off',
    'prettier/prettier': 'error',
  },
});
