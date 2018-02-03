export default {
  input: 'src/index.js',
  external: [
    'fs',
    'fs-extra',
    'lodash',
    'rollup-pluginutils',
    'typescript'
  ],
  output: {
    file: 'dist/main.js',
    format: 'cjs'
  }
}
