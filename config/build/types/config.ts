export type BuildMode = 'production' | 'development'

export type BuildPaths = {
    entry: string,
    build: string,
    html: string,
    src: string,
    locales: string,
    buildLocales: string
}

export type BuildEnv = {
    mode: BuildMode,
    port: number,
    apiUrl: string
}

export interface BuildOptions {
    mode: BuildMode,
    paths: BuildPaths,
    isDev: boolean,
    port: number,
    apiUrl: string
    project: 'storybook' | 'frontend' | 'jest'
}
