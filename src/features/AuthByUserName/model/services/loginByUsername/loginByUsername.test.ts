import axios from "axios";
import {Dispatch} from "react";
import {StateSchema} from "app/providers/StoreProvider";
import {loginByUsername} from "./loginByUsername";

jest.mock('axios')

const mockedAxios = jest.mocked(axios, true)
describe('loginByUsername test' , () => {

    let dispatch: Dispatch<any>
    let getState: () => StateSchema

    beforeEach(() => {
        dispatch = jest.fn()
        getState = jest.fn()
    })

    test('', async () => {
        mockedAxios.post.mockReturnValue(Promise.resolve({
            data: {
                id: '1',
                username: '123',
            }
        }))

        const action = loginByUsername({username: '123', password: '123'})
        const result = await action(dispatch, getState, undefined)
        console.log('29 result', result)

        //expect().toEqual()
    })
})