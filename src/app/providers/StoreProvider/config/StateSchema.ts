import {UserSchema} from "entities/User";
import {LoginSchema} from "features/AuthByUserName";
import {AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject} from "@reduxjs/toolkit";
import {ProfileSchema} from "entities/Profile";
import {AxiosInstance} from "axios";
import {ArticleDetailsSchema} from "entities/Article";
import {ArticleDetailsCommentSchema, ArticleDetailsRecommendationsSchema} from "pages/ArticleDetailsPage";
import {AddCommentFormSchema} from "features/addCommentForm";
import {ArticlesPageSchema} from "pages/ArticlesPage";
import {UISchema} from "features/ui";

export type StateSchema = {
    user?: UserSchema
    ui: UISchema

    // Асинхронные редьюсеры !!!
    loginForm?: LoginSchema
    profile?: ProfileSchema
    articleDetails?: ArticleDetailsSchema
    articleDetailsComments?: ArticleDetailsCommentSchema
    articleDetailsRecommendations?: ArticleDetailsRecommendationsSchema
    addCommentForm?: AddCommentFormSchema
    articlesPage?: ArticlesPageSchema
}

export type StateSchemaKey = keyof StateSchema

export type ReducerManager = {
    getReducerMap: () => ReducersMapObject<StateSchema>,
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
    add: (key: StateSchemaKey, reducer: Reducer) => void
    remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager
}

export type ThunkExtraArg = {
    api: AxiosInstance,
}

export type ThunkConfig<T> = {
    rejectValue: T,
    extra: ThunkExtraArg
    state: StateSchema
}