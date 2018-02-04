export default {
  input: 'src/index.js',
  external: [
    'fs',
    'fs-extra',
    'lodash',
    'path',
    'rollup-pluginutils',
    'typescript'
  ],
  output: {
    file: 'dist/main.js',
    format: 'cjs'
  }
}
