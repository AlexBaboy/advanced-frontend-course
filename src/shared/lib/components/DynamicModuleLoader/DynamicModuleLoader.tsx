import {FC, useEffect} from "react";
import {useDispatch, useStore} from "react-redux";
import {ReduxStoreWithManager, StateSchemaKey} from "app/providers/StoreProvider/config/StateSchema";
import {Reducer} from "@reduxjs/toolkit";

interface DynamicModuleLoaderProps {
    name: StateSchemaKey
    reducer: Reducer
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {

    const {children, name, reducer} = props

    const store = useStore() as ReduxStoreWithManager
    const dispatch = useDispatch()

    useEffect(() => {
        store.reducerManager.add(
            name,
            reducer
        )

        dispatch({
            type: `@INIT ${name} reducer`
        })

        return () => {
            store.reducerManager.remove(name)
            dispatch({
                type: `@DESTROY ${name} reducer`
            })
        }
    }, [])

    return (
        <>
            {children}
        </>
    );
};
