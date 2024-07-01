import {StoreProvider} from "app/providers/StoreProvider/ui/StoreProvider";
import {createReduxStore, AppDispatch} from "app/providers/StoreProvider/config/store";
import type { StateSchema, ReduxStoreWithManager, ThunkConfig } from './config/StateSchema'

export {
    StoreProvider,
    createReduxStore,
    StateSchema, ThunkConfig
};

export type { AppDispatch };

