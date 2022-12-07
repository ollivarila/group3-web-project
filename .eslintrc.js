module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:react/recommended',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  parser: '@babel/eslint-parser',
  rules: {
    indent: [
      'error',
      2,
    ],
    semi: 0,
    'no-restricted-syntax': [
      'error', 'ForInStatement', 'LabeledStatement', 'WithStatement',
    ],
    'arrow-parens': 0,
    'consistent-return': 0,
    'no-plusplus': 0,
    'no-await-in-loop': 0,
    'no-underscore-dangle': 0,
    'react/prop-types': 0,
    'arrow-body-style': 0,
    'import/prefer-default-export': 0,
    'no-undef': 0,
    'no-param-reassign': 0,
    'no-console': 0,
  },
};
