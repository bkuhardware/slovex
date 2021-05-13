import { createEntries } from './rollup.config'

export default createEntries([
  { input: 'src/index.js', file: 'dist/slovex.esm.browser.js', format: 'es', browser: true, transpile: false, env: 'development' },
  { input: 'src/index.js', file: 'dist/slovex.esm.browser.min.js', format: 'es', browser: true, transpile: false, minify: true, env: 'production' },
  { input: 'src/index.js', file: 'dist/slovex.esm.js', format: 'es', env: 'development' },
  { input: 'src/index.cjs.js', file: 'dist/slovex.js', format: 'umd', env: 'development' },
  { input: 'src/index.cjs.js', file: 'dist/slovex.min.js', format: 'umd', minify: true, env: 'production' },
  { input: 'src/index.cjs.js', file: 'dist/slovex.common.js', format: 'cjs', env: 'development' }
])
