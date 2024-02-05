import {TestAsyncThunk} from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import {fetchNextArticlesPage} from "./fetchNextArticlesPage";
import {fetchArticlesList} from "../fetchArticlesList/fetchArticlesList";
import {ArticleSortField, ArticleType} from "entities/Article/model/types/article";

jest.mock('../fetchArticlesList/fetchArticlesList')
describe('fetchNextArticlesPage test' , () => {

    test('success', async () => {

        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: true,
                search: '',
                order: 'asc',
                sort: ArticleSortField.CREATED,
                type: ArticleType.IT
            }
        })

        await thunk.callThunk()

        expect(thunk.dispatch).toBeCalledTimes(4)
        expect(fetchArticlesList).toHaveBeenCalledWith({page: 3})
    })

    test('fetchArticlesList', async () => {

        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: false,
                search: '',
                order: 'asc',
                sort: ArticleSortField.CREATED,
                type: ArticleType.ECONOMICS
            }
        })

        await thunk.callThunk()

        expect(thunk.dispatch).toBeCalledTimes(2)
        expect(fetchArticlesList).not.toHaveBeenCalled()
    })
})
