import {UserSchema} from "entities/User";
import {LoginSchema} from "features/AuthByUserName";
import {AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject} from "@reduxjs/toolkit";
import {ProfileSchema} from "entities/Profile";
import {AxiosInstance} from "axios";
import {Pathname} from "history";
import {NavigateOptions} from "react-router";
import {ArticleDetailsSchema} from "entities/Article";
import {ArticleDetailsCommentSchema} from "pages/ArticleDetailsPage";
import {AddCommentFormSchema} from "features/addCommentForm";

export type StateSchema = {
    user?: UserSchema

    // Асинхронные редьюсеры !!!
    loginForm?: LoginSchema
    profile?: ProfileSchema
    articleDetails?: ArticleDetailsSchema
    articleDetailsComments?: ArticleDetailsCommentSchema
    addCommentForm?: AddCommentFormSchema
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
    navigate?: (to: Pathname, options?: NavigateOptions) => void
}

export type ThunkConfig<T> = {
    rejectValue: T,
    extra: ThunkExtraArg
    state: StateSchema
}