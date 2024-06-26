import axios from "axios";
import {loginByUsername} from "./loginByUsername";
import {userActions} from "entities/User";
import {TestAsyncThunk} from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";

jest.mock('axios')

const mockedAxios = jest.mocked(axios, { shallow: false })
describe('loginByUsername test' , () => {

    test('success login', async () => {

        const userValue = {
            id: '1',
            username: '123',
        }

        const thunk = new TestAsyncThunk(loginByUsername)
        thunk.api.post.mockReturnValue(Promise.resolve({
            data: userValue
        }))

        const result = await thunk.callThunk({username: '123', password: '123'})

        const action = loginByUsername({
            username: '123', password: '123'
        })

        expect(thunk.dispatch)
            .toHaveBeenCalledWith(
                userActions
                    .setAuthData(userValue)
            )

        expect(thunk.dispatch).toHaveBeenCalledTimes(3)
        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(userValue)
    })

    test('error login', async () => {

        mockedAxios.post.mockReturnValue(Promise.resolve({
            status: 403
        }))

        const thunk = new TestAsyncThunk(loginByUsername)
        const result = await thunk.callThunk({username: '123', password: '123'})

        expect(thunk.dispatch).toHaveBeenCalledTimes(2)
        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toBe('error')
    })
})
