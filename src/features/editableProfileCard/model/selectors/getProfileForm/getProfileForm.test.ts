import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { profileData } from '@/shared/mocks/profileData';
import { getProfileForm } from './getProfileForm';

describe('getProfileForm test', () => {
    test('should work with filled state', () => {
        const data = profileData

        const state: DeepPartial<StateSchema> = {
            profile: {
                data,
            },
        }
        expect(getProfileForm(state as StateSchema)).toEqual(data)
    })
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileForm(state as StateSchema)).toEqual(undefined)
    })
})
