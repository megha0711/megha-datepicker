// Karma configuration
const path = require("path");

module.exports = function (config) {
  config.set({
    frameworks: ["mocha", "sinon", "chai"],

    browsers: ["FirefoxHeadless"],

    files: ["test/index.js"],

    preprocessors: {
      "test/index.js": ["webpack", "sourcemap"],
    },

    reporters: ["mocha", "coverage"],

    webpack: {
      mode: "development",
      devtool: "inline-source-map",
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
              presets: ["airbnb"],
            },
          },
          {
            test: /\.jsx?$/,
            include: path.resolve(__dirname, "src"),
            loader: "istanbul-instrumenter-loader",
            enforce: "post",
            options: { esModules: true },
          },
          {
            test: /\.scss$/,
            include: path.resolve(__dirname, "src", "stylesheets"),
            use: ["style-loader", "css-loader", "sass-loader"],
          },
        ],
      },
      resolve: {
        extensions: [".jsx", ".js"],
      },
      externals: {
        cheerio: "window",
        "react/addons": true,
        "react/lib/ExecutionEnvironment": true,
        "react/lib/ReactContext": true,
      },
    },

    coverageReporter: {
      reporters: [
        { type: "text-summary" },
        { type: "html", dir: "coverage/" },
        { type: "lcov" },
      ],
    },

    webpackServer: {
      noInfo: true,
    },
  });
};
