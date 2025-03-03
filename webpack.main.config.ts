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

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: "./src/index.ts",
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [...plugins, new webpack.DefinePlugin(envKeys)],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
};
