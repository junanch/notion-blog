module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser', // 定义ESLint的解析器
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  extends: [
    'plugin:react/recommended', // 使用推荐的React代码检测规范
    "plugin:@typescript-eslint/recommended",
    'standard',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', '@typescript-eslint'], // 定义了该eslint文件所依赖的插件
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
  },
}
