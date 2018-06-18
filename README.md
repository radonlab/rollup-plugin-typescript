# rollup-plugin-typescript

Rollup plugin for TypeScript with better error reporting

### Installation

```bash
# Install with npm
npm install -D @radonlab/rollup-plugin-typescript
```

### Usage

```js
// rollup.config.js
import typescript from '@radonlab/rollup-plugin-typescript'

export default {
  input: 'src/main.ts',
  plugins: [
    typescript()
  ],
  output: {
    file: 'dist/main.js',
    format: 'umd'
  }
}
```

### License
The MIT License.
