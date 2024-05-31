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
            isLoading: true,
            validateErrors: undefined
        })
    })

    test('test update profile service fulfilled', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
        }
        expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.fulfilled(profileData, '')
        )).toEqual({
            isLoading: false,
            validateErrors: undefined,
            readonly: true,
            validateError: undefined,
            form: profileData,
            data: profileData
        })
    })
})