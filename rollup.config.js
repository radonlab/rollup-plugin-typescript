export default {
  input: 'src/index.js',
  external: [
    'fs',
    'path',
    'rollup-pluginutils',
    'typescript'
  ],
  output: {
    file: 'dist/rollup-plugin-typescript.js',
    format: 'cjs'
  }
}
