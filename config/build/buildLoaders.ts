import webpack from "webpack";
import {BuildOptions} from "./types/config";
import {buildCssLoaders} from "./loaders/buildCssLoaders";
import {buildBabelLoader} from "./loaders/buildBabelLoader";

export function buildLoaders(options : BuildOptions): webpack.RuleSetRule[] {

    const {isDev} = options

    const babelLoader = buildBabelLoader(options)
    const cssLoader = buildCssLoaders(isDev)

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack']
    }

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    }

    return [
        fileLoader,
        svgLoader,
        babelLoader,
        typescriptLoader,
        cssLoader,
    ]
}
