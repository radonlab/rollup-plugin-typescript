export default {
  input: 'src/index.js',
  external: [
    'fs',
    'path',
    'chalk',
    'rollup-pluginutils',
    'typescript'
  ],
  output: {
    file: 'dist/rollup-plugin-typescript.js',
    format: 'cjs'
  }
}
