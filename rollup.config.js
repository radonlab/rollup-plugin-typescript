export default {
  input: 'src/index.js',
  external: [
    'fs',
    'path',
    'rollup-pluginutils',
    'typescript'
  ],
  output: {
    file: 'dist/main.js',
    format: 'cjs'
  }
}
