import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const getFiles = (dir) => {
  const files = readdirSync(dir);
  let fileList = [];
  files.forEach((file) => {
    const filePath = join(dir, file);
    if (statSync(filePath).isDirectory()) {
      fileList = fileList.concat(getFiles(filePath));
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
};

const processorFiles = getFiles('src/processor').filter((file) =>
  file.endsWith('.ts'),
);
const utilFiles = getFiles('src/util').filter((file) => file.endsWith('.ts'));

export default {
  input: {
    index: 'src/index.ts',
    processor: 'src/processor.ts',
    ...processorFiles.reduce((inputs, file) => {
      const relativePath = file.replace(/^src\//, '').replace(/\.ts$/, '');
      inputs[relativePath] = file;
      return inputs;
    }, {}),
    ...utilFiles.reduce((inputs, file) => {
      const relativePath = file.replace(/^src\//, '').replace(/\.ts$/, '');
      inputs[relativePath] = file;
      return inputs;
    }, {}),
  },
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      exports: 'named',
      entryFileNames: '[name].js',
    },
    {
      dir: 'dist',
      format: 'esm',
      entryFileNames: '[name].esm.js',
    },
  ],
  plugins: [
    nodeResolve({
      extensions: ['.ts', '.js'],
    }),
    commonjs(),
    typescript(),
    terser(),
  ],
};
