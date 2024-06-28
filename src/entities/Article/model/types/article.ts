import {ArticleBlockType, ArticleType} from "entities/Article/model/constants/constants";

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
