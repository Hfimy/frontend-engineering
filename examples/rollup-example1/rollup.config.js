import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

// const formats = ['es', 'cjs', 'amd', 'iife', 'umd', 'system'];

const __ENV__ = process.env.__ENV__;
const isProd = __ENV__ === 'prod';

/** @type {import('rollup').RollupOptions}*/
const config = {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/bundle.iife.js',
      format: 'iife',
      name: 'globalVarName', // 全局变量名称，输出格式为iife和umd格式时使用
      sourcemap: !isProd, // OutputOptions.sourcemap?: boolean | "inline" | "hidden"
      banner: '/* banner */',
      globals: {},
    },
    {
      file: 'dist/bundle.es.js',
      format: 'es',
      sourcemap: !isProd,
      banner: '/* banner */',
      globals: {},
    },
    {
      file: 'dist/bundle.umd.js',
      format: 'umd',
      name: 'globalVarName', // 全局变量名称，输出格式为iife和umd格式时使用
      sourcemap: !isProd,
      banner: '/* banner */',
      globals: {},
    },
  ],
  plugins: [resolve(), commonjs(), json(), isProd && terser()],
};

export default config;
