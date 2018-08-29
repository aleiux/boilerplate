var path = require('path');
module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    publicPath: "/dist",
    path: __dirname + "/dist"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      src: path.resolve(__dirname, 'src'),
      common: path.resolve(__dirname, 'src/common'),
      images: path.resolve(__dirname, 'src/images')
    }
  },



  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { test: /\.less$/, loaders: ['style-loader', 'css-loader', 'less-loader']},
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.svg$/,
        use: [
          'svg-react-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },

  devServer: {
    historyApiFallback: true,
  },

  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
};