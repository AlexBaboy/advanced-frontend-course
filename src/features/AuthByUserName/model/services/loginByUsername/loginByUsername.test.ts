import axios from "axios";
import {Dispatch} from "@reduxjs/toolkit";
import {StateSchema} from "app/providers/StoreProvider";
import {loginByUsername} from "./loginByUsername";
import {userActions} from "entities/User";

jest.mock('axios')

const mockedAxios = jest.mocked(axios, true)
describe('loginByUsername test' , () => {

    let dispatch: Dispatch<any>
    let getState: () => StateSchema

    beforeEach(() => {
        dispatch = jest.fn()
        getState = jest.fn()
    })

    test('success login', async () => {

        const userValue = {
            id: '1',
            username: '123',
        }

        mockedAxios.post.mockReturnValue(Promise.resolve({
            data: userValue
        }))

        const action = loginByUsername({
            username: '123', password: '123'
        })
        const result = await action(
            dispatch, getState, undefined
        )

        expect(dispatch)
            .toHaveBeenCalledWith(
                userActions
                    .setAuthData(userValue)
            )

        expect(mockedAxios.post).toHaveBeenCalledTimes(3)
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(userValue)
    })

    test('error login', async () => {

        mockedAxios.post.mockReturnValue(Promise.resolve({
            status: 403
        }))

        const action = loginByUsername({
            username: '123', password: '123'
        })
        const result = await action(
            dispatch, getState, undefined
        )

        expect(mockedAxios.post).toHaveBeenCalledTimes(2)

        expect(result.meta.requestStatus).toBe('rejected')
    })
})
