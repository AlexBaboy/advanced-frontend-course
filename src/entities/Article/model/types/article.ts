export enum ArticleBlockType {
    CODE = 'CODE',
    IMAGE = 'IMAGE',
    TEXT = 'TEXT',
}

export type ArticleBlockBase = {
    id: string,
    type: ArticleBlockType
}

export type ArticleCodeBlock = ArticleBlockBase & {
    type: ArticleBlockType.CODE,
    code: string
}

export type ArticleImageBlock = ArticleBlockBase & {
    type: ArticleBlockType.IMAGE
    src: string,
    title: string
}

export type ArticleTextBlock = ArticleBlockBase & {
    type: ArticleBlockType.TEXT,
    title?: string,
    paragraphs: string[]
}

export enum ArticleType {
    ALL = 'ALL',
    IT = 'IT',
    SCIENCE = 'SCIENCE',
    ECONOMICS = 'ECONOMICS',
}

export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock

export type Article = {
    id: string,
    title: string,
    subtitle: string,
    img: string,
    views: number,
    createdAt: string,
    type: ArticleType[],
    blocks: ArticleBlock[],
    user?: {
        id: string,
        username: string,
        avatar: string
    }
}

export enum ArticleView {
    BIG = 'BIG',
    SMALL = 'SMALL'
}

export enum ArticleSortField {
    VIEWS= 'views',
    TITLE = 'title',
    CREATED = 'createdAt'
}