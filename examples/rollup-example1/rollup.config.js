import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

// const formats = ['es', 'cjs', 'amd', 'iife', 'umd', 'system'];

const __ENV__ = process.env.__ENV__;
const isProd = __ENV__ === 'prod';

/** @type {import('rollup').RollupOptions}*/
const config = {
  input: 'src/index.ts',
  external: ['jquery'],
  output: [
    {
      file: 'dist/bundle.iife.js',
      format: 'iife',
      name: 'libraryName', // 全局变量名称，输出格式为iife和umd格式时使用
      sourcemap: !isProd, // OutputOptions.sourcemap?: boolean | "inline" | "hidden"
      banner: '/* banner */',
      globals: {
        jquery: '$',
      },
    },
    {
      file: 'dist/bundle.es.js',
      format: 'es',
      sourcemap: !isProd,
      banner: '/* banner */',
    },
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs',
      sourcemap: !isProd,
      banner: '/* banner */',
    },
    {
      file: 'dist/bundle.umd.js',
      format: 'umd',
      name: 'libraryName', // 全局变量名称，输出格式为iife和umd格式时使用
      sourcemap: !isProd,
      banner: '/* banner */',
      globals: {
        jquery: '$',
      },
    },
  ],
  plugins: [
    typescript(),
    replace({
      __ENV__: JSON.stringify(__ENV__),
      __BUILD_DATE__: () => Date.now(),
    }),
    resolve(),
    commonjs(),
    json(),
    isProd && terser(),
  ],
};

export default config;
