import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
      }
    ],
    plugins: [
      resolve(),
      typescript({ tsconfig: './tsconfig.json' }),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/lite-embed.min.js',
      format: 'umd',
      name: 'LiteEmbed',
      sourcemap: false,
    },
    plugins: [
      resolve(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser()
    ],
  }
];