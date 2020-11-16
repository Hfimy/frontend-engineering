import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

const formats = ['es', 'cjs', 'amd', 'iife', 'umd', 'system'];

export default formats.map((format) => {
  /** @type {import('rollup').RollupOptions}*/
  const config = {
    input: 'src/index.js',
    output: {
      file: `dist/bundle.${format}.js`,
      format,
      name: 'libName',
      sourcemap: false,
      banner: '/* banner */',
      footer: '/* footer */',
      intro: '/* intro */',
      outro: '/* outro */',
      globals: {},
    },
    plugins: [resolve(), commonjs(), json()],
  };
  return config;
});
