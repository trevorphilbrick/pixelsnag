import type { Configuration } from "webpack";
import webpack from "webpack";
import { config } from "./src/config";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

// Convert config values to process.env format for webpack
const envKeys = Object.keys(config).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(config[next]);
  return prev;
}, {} as { [key: string]: string });

rules.push({
  test: /\.css$/,
  use: [
    { loader: "style-loader" },
    { loader: "css-loader" },
    { loader: "postcss-loader" },
  ],
});

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins: [...plugins, new webpack.DefinePlugin(envKeys)],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
  },
};
