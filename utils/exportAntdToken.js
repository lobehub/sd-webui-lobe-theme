const { theme } = require('antd')
const { toCustomPropertiesString } = require('object-to-css-variables')
const fs = require('fs')

const { defaultAlgorithm, darkAlgorithm, defaultSeed } = theme

const mapToken = defaultAlgorithm(defaultSeed)
const mapDarkToken = darkAlgorithm(defaultSeed)

const cssVariables = toCustomPropertiesString(mapToken)
const cssDarkVariables = toCustomPropertiesString(mapDarkToken)

fs.writeFileSync('src/theme/var/antd-light.less', cssVariables)
fs.writeFileSync('src/theme/var/antd-dark.less', cssDarkVariables)
