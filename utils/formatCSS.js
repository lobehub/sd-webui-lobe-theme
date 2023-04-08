const fs = require('fs')
const path = require('path')

// 从本地文件读取CSS
const cssFilePath = path.resolve(__dirname, 'style.css')
const css = fs.readFileSync(cssFilePath, 'utf-8')

// 用于存储变量及其值的对象
const cssVariables = {}

// 正则表达式用于匹配CSS变量及其值
const cssVarRegex = /--\w+[^:]*:\s*([^;]*);/g
const cssVarReferenceRegex = /var\((--\w+)\)/g

// 解析CSS变量及其值
let match
while ((match = cssVarRegex.exec(css))) {
  const variable = match[0].split(':')[0].trim()
  const value = match[1].trim()
  cssVariables[variable] = value
}

// 对变量进行排序，确保被引用的变量在引用它的变量之前
const sortedVariables = Object.keys(cssVariables)

// 按类别对变量进行分组
const groups = {
  colors: [],
  typography: [],
  spacing: [],
  border: [],
  boxShadow: [],
  body: [],
  block: [],
  panel: [],
  button: [],
  checkbox: [],
  input: [],
  table: [],
  other: [],
}

sortedVariables.forEach((variable) => {
  const value = cssVariables[variable]
  const isColor =
    value.startsWith('#') ||
    value.includes('rgb') ||
    value.includes('color') ||
    variable.includes('color') ||
    variable.includes('fill') ||
    variable.includes('neutral')
  const isTypography =
    variable.includes('text') || variable.includes('font') || variable.includes('prose') || variable.includes('link')
  const isSpacing =
    variable.includes('spacing') ||
    variable.includes('padding') ||
    variable.includes('gap') ||
    variable.includes('margin')
  value.includes('padding') || value.includes('margin')
  const isBorder = variable.includes('radius') || variable.includes('border')
  const isBoxShadow = variable.includes('shadow')
  if (variable.includes('--body')) {
    groups.body.push(variable)
  } else if (variable.includes('--block')) {
    groups.block.push(variable)
  } else if (variable.includes('--panel')) {
    groups.panel.push(variable)
  } else if (variable.includes('--button')) {
    groups.button.push(variable)
  } else if (variable.includes('--checkbox')) {
    groups.checkbox.push(variable)
  } else if (variable.includes('--input')) {
    groups.input.push(variable)
  } else if (variable.includes('--table')) {
    groups.table.push(variable)
  } else if (isBorder) {
    groups.border.push(variable)
  } else if (isBoxShadow) {
    groups.boxShadow.push(variable)
  } else if (isColor) {
    groups.colors.push(variable)
  } else if (isTypography) {
    groups.typography.push(variable)
  } else if (isSpacing) {
    groups.spacing.push(variable)
  } else {
    groups.other.push(variable)
  }
})

// 生成排序后的CSS变量
const generateGroupCss = (groupName) => {
  const cache = groups[groupName].map((variable) => `${variable}: ${cssVariables[variable]};`)
  const firstPart = cache.filter((item) => item.includes('var'))
  const secondPart = cache.filter((item) => !item.includes('var'))
  return [...secondPart, ...firstPart].join('\n')
}

const sortedCss =
  '#output {\n' +
  `/* Colors */\n` +
  generateGroupCss('colors') +
  `\n\n/* Typography */\n` +
  generateGroupCss('typography') +
  `\n\n/* Spacing */\n` +
  generateGroupCss('spacing') +
  `\n\n/* Border */\n` +
  generateGroupCss('border') +
  `\n\n/* BoxShadow */\n` +
  generateGroupCss('boxShadow') +
  `\n\n/* Body */\n` +
  generateGroupCss('body') +
  `\n\n/* Block */\n` +
  generateGroupCss('block') +
  `\n\n/* Panel */\n` +
  generateGroupCss('panel') +
  `\n\n/* Button */\n` +
  generateGroupCss('button') +
  `\n\n/* Checkbox */\n` +
  generateGroupCss('checkbox') +
  `\n\n/* Input */\n` +
  generateGroupCss('input') +
  `\n\n/* Table */\n` +
  generateGroupCss('table') +
  `\n\n/* Other */\n` +
  generateGroupCss('other') +
  '}'

console.log(sortedCss)

// 将排序后的CSS变量写入文件
fs.writeFileSync('sorted-css-variables.css', sortedCss)
