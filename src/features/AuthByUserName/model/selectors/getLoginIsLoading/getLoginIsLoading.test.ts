import {DeepPartial} from "@reduxjs/toolkit";
import {StateSchema} from "@/app/providers/StoreProvider";
import {getLoginIsLoading} from "./getLoginIsLoading";

describe('getLoginIsLoading test', () => {
    test('should return true', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                isLoading: true
            }
        }
        expect(getLoginIsLoading(state)).toEqual(true)
    })
    test('should return undefined with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getLoginIsLoading(state)).toEqual(false)
    })
})