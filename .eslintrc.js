module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true
  },
  parser: '@typescript-eslint/parser', // 定义ESLint的解析器
  parserOptions: {
    ecmaVersion: 2020, // 允许解析现代 ECMAScript 功能
    sourceType: 'module', // 允许使用导入
    ecmaFeatures: {
      jsx: true // 允许解析 JSX
    }
  },
  extends: [
    'plugin:react/recommended', // 使用 @eslint-plugin-react 中的推荐规则
    'plugin:@typescript-eslint/recommended', // 使用 @typescript-eslint/eslint-plugin 中的推荐规则
    'standard',
    'plugin:prettier/recommended' // 启用 eslint-plugin-prettier 和 eslint-config-prettier, 这会将 prettier 的错误显示为 ESLint 错误, 确保这是 Array 最后一个配置
  ],
  plugins: ['react', '@typescript-eslint'], // 定义了该eslint文件所依赖的插件
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/no-var-requires': 0
  }
}
