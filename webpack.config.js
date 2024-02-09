import Dotenv from 'dotenv-webpack';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  target: 'node',
  mode: 'production',
  entry: './src/server.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new Dotenv()],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    extensionAlias: {
      '.js': ['.ts', '.js'],
    },
  },
  output: {
    filename: 'bundle.cjs',
    path: path.resolve(__dirname, 'dist'),
  },
};
