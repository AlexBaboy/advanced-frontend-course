import {DeepPartial} from "@reduxjs/toolkit";
import {StateSchema} from "app/providers/StoreProvider";
import {getProfileData} from "./getProfileData";
import {profileData} from "shared/mocks/profileData";

describe('getProfileData test', () => {
    test('should work with filled state', () => {

        const data = profileData

        const state: DeepPartial<StateSchema> = {
            profile: {
                data
            }
        }
        expect(getProfileData(state as StateSchema)).toEqual(data)
    })
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileData(state as StateSchema)).toEqual(undefined)
    })
})