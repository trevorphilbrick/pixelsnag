import type { Configuration } from "webpack";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";
import Dotenv from "dotenv-webpack";

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
  plugins: [...plugins, new Dotenv()],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
  },
};
