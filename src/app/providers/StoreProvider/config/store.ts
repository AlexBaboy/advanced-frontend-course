import {CombinedState, configureStore, DeepPartial, Reducer, ReducersMapObject} from '@reduxjs/toolkit'
import {StateSchema} from "./StateSchema";
import {userReducer} from "entities/User";
import {createReducerManager} from "./reducerManager";
import {$api} from "shared/api/api";
import {Pathname} from "history";
import {NavigateOptions} from "react-router";

export const createReduxStore = (
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
    navigate?: (to: Pathname, options?: NavigateOptions) => void
) => {


    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        // @ts-ignore
        user: userReducer
    }

    const reducerManager = createReducerManager(rootReducers)

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: getDefaultMiddleware => getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    api: $api,
                    navigate
                }
            }
        })
    })

    // @ts-ignore
    store.reducerManager = reducerManager

    return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']