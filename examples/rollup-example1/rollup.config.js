import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

const formats = ['es', 'cjs', 'amd', 'iife', 'umd', 'system'];

export default formats.map((format) => ({
  input: 'src/index.js',
  output: {
    file: `dist/bundle.${format}.js`,
    format,
    name: 'hello',
  },
  plugins: [resolve(), commonjs(), json()],
}));
