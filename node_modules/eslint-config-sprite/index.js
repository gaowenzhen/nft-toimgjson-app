module.exports = {
  globals: {
    spritejs: true
  },
  extends:  "eslint-config-75team",
  plugins: ['import', 'promise'],
  rules: {
    'semi-style': 0,
    'semi': ['error', 'always'],
    // 禁止一个文件中在忽略空行和注释之后行数超过1500行
    'max-lines': ['error', {
      max: 1500,
      skipBlankLines: true,
      skipComments: true
    }],  
    'no-loop-func': 'off',
    'guard-for-in': 'off',
    'no-multi-assign': 'warn',
    'max-params': ['warn', 10],
    'prefer-const': ['error', {destructuring: 'all'}],
    // 因为我们可能模块内定义一个 decorate，这个 decorate 有可能和变量同名
    'no-shadow': 'warn',
    // 因为函数签名中可能声明未使用的变量
    'no-unused-vars': ['error', {args: "none"}],
    'prefer-destructuring': 'off',
    'object-curly-newline': 'off',
    "semi": ["error", "always", {"omitLastInOneLineBlock": true}],
    "import/export": "error",
    "import/first": "error",
    "import/no-duplicates": "error",
    "import/no-webpack-loader-syntax": "error",
    "promise/param-names": "error",
    "qoutes": 'off',
    "import/prefer-default-export": 'off'
  },
}
