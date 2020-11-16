module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'require-await': ['error'],
    'arrow-parens': ['error', 'as-needed'],
    curly: ['error', 'all'],
    'no-useless-rename': ['error', {
      'ignoreDestructuring': false,
      'ignoreImport': false,
      'ignoreExport': false
    }],
    'object-shorthand': ['error'],
    'one-var': ['error', 'never'],
    'object-curly-spacing': ['error', 'always', {
      'arraysInObjects': false,
      'objectsInObjects': true
    }],
    'padded-blocks': ['error', 'never', { 'allowSingleLineBlocks': false }],
    'prefer-destructuring': ['error', {
      'VariableDeclarator': {
        'array': true,
        'object': true
      },
      'AssignmentExpression': {
        'array': true,
        'object': false
      }
    }, {
      'enforceForRenamedProperties': false
    }],
    'object-curly-newline': ['error', {
      'ObjectExpression': { 'consistent': true },
      'ObjectPattern': { 'consistent': true },
      'ImportDeclaration': { 'consistent': true },
      'ExportDeclaration': { 'consistent': true }
    }],
    'brace-style': ['error', '1tbs', { 'allowSingleLine': false }]
  }
};

