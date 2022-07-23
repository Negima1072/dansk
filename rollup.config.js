import babel from '@rollup/plugin-babel';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import typescript from "@rollup/plugin-typescript";
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';

const plugins = [
	typescript(),
	json(),
	image(),
	postcss({
		extensions: [".css"],
		modules: true,
	}),
	nodeResolve({
		extensions: [".js"],
		browser:true
	}),
	replace({
		preventAssignment: true,
		'process.env.NODE_ENV': JSON.stringify('production'),
	}),
	babel({
		presets: ["@babel/preset-react"],
	}),
	commonjs(),
];

export default [
	{
		input: 'src/index.tsx',
		output: {
			file: `dist/index.js`,
			format: 'umd',
			name: 'DanSukuMizu'
		},
		plugins: plugins,
	},
	{
		input: 'src/Root.tsx',
		output: {
			file: `dist/main.js`,
			format: 'umd',
			name: 'DanSukuMizu'
		},
		plugins: plugins,
	},
	{
		input: 'src/popup/popup.ts',
		output: {
			file: `dist/popup/popup.js`,
			format: 'umd',
			name: 'DanSukuMizu'
		},
		plugins: plugins
	},
	{
		input: 'src/options/options.ts',
		output: {
			file: `dist/options/options.js`,
			format: 'umd',
			name: 'DanSukuMizu'
		},
		plugins: plugins
	}]