import {DeepPartial} from "@reduxjs/toolkit";
import {profileActions, profileReducer} from "./profileSlice";
import {ProfileSchema, updateProfileData, ValidateProfileError} from "entities/Profile";
import {profileData} from "shared/mocks/profileData";

describe('profileSlice test', () => {
    test('test readonly state', () => {
        const state: DeepPartial<ProfileSchema> = { readonly: false }
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.setReadOnly(true)
        )).toEqual({readonly: true})
    })

    test('test cancel edit', () => {
        const state: DeepPartial<ProfileSchema> = { data: profileData, form: {username: ''} }
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.cancelEdit()
        )).toEqual({
            readonly: true,
            validateErrors: undefined,
            data: profileData,
            form: profileData
        })
    })

    test('test update profile', () => {
        const state: DeepPartial<ProfileSchema> = { form: {username: 'test'} }
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.updateProfile({
                username: 'testname'
            })
        )).toEqual({
            form: {username: 'testname'}
        })
    })

    test('test update profile service pending', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            validateErrors: [ValidateProfileError.SERVER_ERROR]
        }
        expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.pending
        )).toEqual({
            form: {username: 'testname'}
        })
    })
})