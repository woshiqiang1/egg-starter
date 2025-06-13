'use strict';

module.exports = {
  extends: ['eslint-config-egg', 'prettier'],
  rules: {
    'no-unused-vars': 'warn',
    'jsdoc/check-tag-names': [
      'warn',
      {
        definedTags: ['router', 'request', 'response', 'controller'],
      },
    ],
  },
};
