import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
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
    copy({
      targets: [
        { src: 'src/assets/recovery.png', dest: 'assets' },
      ],
    }),
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
  ],
  onwarn(warning, warn) {
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    warn(warning);
  },
};
