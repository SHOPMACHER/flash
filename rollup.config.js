import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import nodeResolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const isDevelopment = process.env.NODE_ENV === 'development';

const input = 'src/index.js';

const plugins = [
    babel({
        exclude: 'node_modules/**',
    }),
    postcss({
        extract: true,
    }),
    nodeResolve({
        jsnext: true,
    }),
];

const external = [
    ...Object.keys(pkg.dependencies || {}),
];

const umdDev = {
    input,
    output: {
        file: 'dist/sm-flash.js',
        format: 'umd',
        name: 'SmFlash',
        sourcemap: true,
    },
    plugins: [
        ...plugins,
        ...(isDevelopment ? [
            serve(),
            livereload({
               watch: 'dist',
            }),
        ] : [])
    ],
};

const umdProd = {
    input,
    output: {
        file: 'dist/sm-flash.min.js',
        format: 'umd',
        name: 'SmFlash',
        sourcemap: true,
    },
    plugins: [
        ...plugins,
        terser({
            compress: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                warnings: false,
            },
        }),
    ],
};

const cjs = {
    input,
    output: {
        file: 'lib/sm-flash.js',
        format: 'cjs',
    },
    external,
    plugins,
};

const es = {
    input,
    output: {
        file: 'es/sm-flash.js',
        format: 'es',
        sourcemap: true,
    },
    external,
    plugins,
};

const esm = {
    input,
    output: {
        file: 'es/sm-flash.mjs',
        format: 'es',
        sourcemap: true,
    },
    external,
    plugins: [
        ...plugins,
        terser({
            compress: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                warnings: false,
            },
        }),
    ],
};

export default [
    umdDev,
    umdProd,
    cjs,
    es,
    esm,
];
