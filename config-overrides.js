const webpack = require("webpack")

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {}
    Object.assign(fallback, {
        fs: false,
        net: false,
        tls: false,
        crypto: require.resolve("./node_modules/crypto-browserify"),
        stream: require.resolve("stream-browserify"),
    })
    config.resolve.fallback = fallback
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],
        }),
    ])

    config.module.rules.unshift({
        test: /\.m?js$/,
        resolve: {
            fullySpecified: false, // disable the behavior
        },
    })
    config.ignoreWarnings = [/Failed to parse source map/]
    return config
}