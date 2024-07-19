import antfu from '@antfu/eslint-config'
import format from 'eslint-plugin-format'

export default antfu({
  // Enable stylistic formatting rules

  // stylistic: true,

  // Or customize the stylistic rules
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
    semi: false,
  },

  // TypeScript and Vue are auto-detected, you can also explicitly enable them:
  typescript: true,
  vue: true,
  formatters: true,
  css: true,

}, {
  files: ['*/.vue'],
  rules: {

    'vue/block-order': ['error', {
      order: ['template', 'script', 'style'],
    }],
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 3,
      },
      multiline: {
        max: 1,
      },
    }],
    'vue/no-unused-vars': 'warn',
  },

}, {
  files: ['*/.css'],
  languageOptions: {
    parser: format.parserPlain,
  },
  plugins: {
    format,
  },
  rules: {
    'format/prettier': ['error', { parser: 'css', tabWidth: 2 }],
  },
}, {

  rules: {
    'no-console': 'warn',
    'unused-imports/no-unused-vars': 'warn',
  },

})
