const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("../package.json").dependencies;
module.exports = (env) => {
  
  return {
    // output: {
    //   publicPath: "http://localhost:3001/",
    // },
  
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
      alias: {
        // 设置 '@' 为 src 目录的别名
        '@': path.resolve(__dirname, '..' , 'src')
      },
    },
  
    devServer: {
      // port: 3001,
      port: 4002,
      historyApiFallback: true,
    },
  
    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
  
    plugins: [
      new ModuleFederationPlugin({
        name: "remoteReactTs",
        filename: "remoteReactTsEntry.js",
        remotes: {},
        exposes: {
          './MyButton':'./src/MyButton',
          './VanillaMyButton':'./src/VanillaMyButton.tsx',
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, '..', './src/index.html'),
      }),
    ],
  }
} 
