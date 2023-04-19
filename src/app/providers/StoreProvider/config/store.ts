import {configureStore, ReducersMapObject} from '@reduxjs/toolkit'
import {StateSchema} from "./StateSchema";
import {userReducer} from "entities/User";

export const createReduxStore = (initialState?: StateSchema) => {
    const rootReducers: ReducersMapObject<StateSchema> = {
        user: userReducer
    }

    return configureStore({
        reducer: rootReducers,
        devTools: __IS_DEV__,
        preloadedState: initialState
    })
}
/*

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
*/
