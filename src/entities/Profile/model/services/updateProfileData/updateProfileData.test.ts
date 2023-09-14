import axios from "axios";
import {updateProfileData} from "./updateProfileData";
import {TestAsyncThunk} from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import {profileData} from "shared/mocks/profileData";
import {ValidateProfileError} from "entities/Profile";

//jest.mock('axios')

//const mockedAxios = jest.mocked(axios, true)
describe('updateProfileData test' , () => {

    test('success', async () => {

        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {form: profileData}
        })

        thunk.api.put.mockReturnValue(Promise.resolve({
            data: profileData
        }))

        const result = await thunk.callThunk()

        expect(thunk.api.put).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(profileData)
    })

    test('server error', async () => {

        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {form: profileData}
        })
        thunk.api.put.mockReturnValue(Promise.resolve({status: 403}))

        const result = await thunk.callThunk()

        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toEqual([
            ValidateProfileError.SERVER_ERROR
        ])
    })

    test('validate error', async () => {

        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: {...profileData, lastname: ''}
            }
        })
        //thunk.api.put.mockReturnValue(Promise.resolve({status: 403}))

        const result = await thunk.callThunk()

        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA
        ])
    })
})
