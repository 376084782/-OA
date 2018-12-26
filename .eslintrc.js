module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'standard',
  plugins: [
    'html'
  ],
  /**
   * 覆盖standard风格中的规则：https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
   * 0: 关闭规则
   * 1：打开规则，警告，检查通过
   * 2：打开规则，错误，检查不通过
   */
  rules: {
    'arrow-parens': 0, // 非空数组里面有多余的空格
    'generator-star-spacing': 0, // 生成器函数*的前后空格
    'comma-dangle': [2, 'only-multiline'], // 数组和对象键值对最后一个逗号
    'semi': [2, 'always'], // 语句强制分号结尾
    'no-useless-escape': 0, // 转义字符
  },
  /**
   * 全局变量，eslint遇到如下的全局变量则不会抛出错误
   * 如果有使用jQuery，则需要在下方填入
   */
  globals: {
    'window': true,
    '$': true
  },
  /**
   * 定义预定义的宿主环境
   */
  env: {
    browser: true
  }
}
