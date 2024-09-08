import { FlatCompat } from '@eslint/eslintrc';
import eslint, { GLOB_SRC, renamePluginInConfigs } from '@antfu/eslint-config';

/** @type {import('@antfu/eslint-config').TypedFlatConfigItem[]} */
const inheritedConfigs = [];

// extend next eslint configs
renamePluginInConfigs(
  new FlatCompat().extends('next/core-web-vitals'),
  { react: 'react-plugin' },
).forEach((config) => {
  if (!config.rules) {
    return;
  }
  if (config.settings) {
    Object.keys(config.settings).forEach((setting) => {
      if (setting.indexOf('import/') === 0) {
        delete config.settings[setting];
      }
    });
  }
  if (config.plugins) {
    delete config.plugins.import;
    delete config.plugins['react-hooks'];
  }
  if (config.languageOptions) {
    delete config.languageOptions;
  }
  config.files = [GLOB_SRC];
  inheritedConfigs.push(config);
});

export default eslint(
  {
    react: true,
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: true,
    },
  },

  // override rules
  {
    rules: {
      'curly': ['error', 'all'],
      'no-unused-vars': 'off',
      'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
      'style/max-len': [
        'error',
        {
          code: 100,
          ignoreComments: false,
          ignoreTrailingComments: false,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
      'style/brace-style': ['error', '1tbs', { allowSingleLine: false }],
      'style/arrow-parens': ['error', 'always'],
      'style/jsx-quotes': ['error', 'prefer-double'],
      'style/multiline-ternary': ['error', 'always-multiline', { ignoreJSX: true }],
      'style/no-confusing-arrow': ['error'],
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import/order': [
        'error',
        {
          'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
          'pathGroups': [
            { pattern: '@/**', group: 'internal' },
          ],
          'newlines-between': 'always-and-inside-groups',
          'pathGroupsExcludedImportTypes': [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'type',
          ],
        },
      ],
      'ts/no-unused-vars': 'error',
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    files: [
      'tsconfig.json',
    ],
    rules: {
      'jsonc/sort-keys': 'off',
    },
  },

  // extends other configs
  ...inheritedConfigs,
);
