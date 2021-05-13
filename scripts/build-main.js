const { run } = require('./build')

const files = [
  'dist/slovex.esm.browser.js',
  'dist/slovex.esm.js',
  'dist/slovex.js',
  'dist/slovex.min.js',
  'dist/slovex.common.js'
]

run('rollup.main.config.js', files)
