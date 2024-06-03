import {validateProfileData} from "./validateProfileData";
import {profileData} from "shared/mocks/profileData";
import {ValidateProfileError} from "features/editableProfileCard/model/types/editableProfileCardSchema";

describe('validateProfileData test' , () => {

    test('success', async () => {

        const result = validateProfileData(profileData)
        expect(result).toEqual([])
    })

    test('without first and last name', async () => {

        const result = validateProfileData({
            ...profileData,
            first: '',
            lastname: ''
        })
        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA
        ])
    })

    test('incorrect age', async () => {

        const result = validateProfileData({
            ...profileData,
            age: undefined,
        })
        expect(result).toEqual([
            ValidateProfileError.INCORRECT_AGE
        ])
    })

    test('incorrect country', async () => {

        const result = validateProfileData({
            ...profileData,
            country: undefined,
        })
        expect(result).toEqual([
            ValidateProfileError.INCORRECT_COUNTRY
        ])
    })

    test('incorrect all', async () => {

        const result = validateProfileData({})
        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.INCORRECT_COUNTRY,
        ])
    })
})
