import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';
import antdPackage from './antdPackage';
import { version } from './package.json';

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/index.js',
    format: 'cjs',
    exports: 'named',
    banner: `/** \n * \n * @license antd-table-config  v${version} \n * Copyright (c) yupeilin \n * \n */`,
  },
  external: [...antdPackage, 'react'],
  plugins: [
    postcss({
      extensions: ['.css', '.less'],
      extract: './style/css.css',
      use: [
        ['less', { javascriptEnabled: true }],
      ],
    }),
    resolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    copy({
      targets: [
        { src: 'src/assets/background.svg', dest: 'assets' },
        { src: 'src/index.d.ts', dest: 'lib' },
      ],
    }),
  ],
  onwarn(warning, warn) {
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    warn(warning);
  },
};
