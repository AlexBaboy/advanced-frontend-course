import { StoreProvider } from '@/app/providers/StoreProvider/ui/StoreProvider';
import { AppDispatch, createReduxStore } from './config/store';
import type {
    StateSchema, ThunkConfig, ReduxStoreWithManager, StateSchemaKey,
} from './config/StateSchema';

export {
    StoreProvider,
    createReduxStore,
};

export type {
    StateSchema,
    AppDispatch,
    ThunkConfig,
    ReduxStoreWithManager,
    StateSchemaKey,
};
