import {StoreProvider} from "app/providers/StoreProvider/ui/StoreProvider";
import {AppDispatch, createReduxStore} from "app/providers/StoreProvider/config/store";
import type {StateSchema, ThunkConfig} from './config/StateSchema'

export {
    StoreProvider,
    createReduxStore,
}

export type {
    StateSchema,
    AppDispatch,
    ThunkConfig
}
