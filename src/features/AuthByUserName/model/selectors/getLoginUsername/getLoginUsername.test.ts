import {DeepPartial} from "@reduxjs/toolkit";
import {StateSchema} from "app/providers/StoreProvider";
import {getLoginUsername} from "./getLoginUsername";

describe('getLoginUsername test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                username: 'userName'
            }
        }
        expect(getLoginUsername(state)).toEqual('userName')
    })
    test('should return undefined with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getLoginUsername(state)).toEqual('')
    })
})