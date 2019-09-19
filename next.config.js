const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const webpack = require('webpack')
const withLess = require('@zeit/next-less')
const CopyPlugin = require('copy-webpack-plugin')
const withBundleAnalyzer = require('./config/next-bundle-analyzer')
const theme = require('./config/ant-theme.json')

// Customizing webpack config
let config = {
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      // dll - vender.[hash].js
      config.plugins.push(
        new webpack.DllReferencePlugin({
          manifest: require(path.resolve(__dirname, './assets/dll/vendor-manifest.json')),
        })
      )
      config.plugins.push(
        new CopyPlugin([
          {
            from:
              './assets/dll/' +
              require(path.resolve(__dirname, './assets/dll/assets.json')).vendor.js,
            to: './static/chunks',
          },
        ])
      )

      // optimizing moment.js
      config.plugins.push(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/))

      config.optimization.splitChunks.cacheGroups.commons = {
        name: 'commons',
        chunks: 'all',
        minChunks: 4,
      }
    }

    // antd-related configuration
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }

    return config
  },
}

// Adding less support
config = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: theme, // make your antd custom style effective
  },
  webpack: config.webpack,
})

// Analyzing the Bundle Size
config = withBundleAnalyzer({
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: './bundles/client.html',
    },
  },
  webpack: config.webpack,
})

// Adding Custom Environment Variables
const envFilePath = path.resolve(__dirname, `.env.${process.env.STAGING}`)
if (fs.existsSync(envFilePath)) {
  const envResult = dotenv.config({
    path: envFilePath,
  })
  if (envResult.error) {
    throw envResult.error
  }

  const parsedVariables = envResult.parsed || {}
  const dotEnvVariables = {}

  for (const key of Object.keys(parsedVariables)) {
    dotEnvVariables[key] = process.env[key]
  }

  config.env = { ...dotEnvVariables }
}

module.exports = config
