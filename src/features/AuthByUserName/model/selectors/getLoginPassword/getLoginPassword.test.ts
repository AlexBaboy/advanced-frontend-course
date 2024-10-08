import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginPassword } from './getLoginPassword';

describe('getLoginPassword test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                password: '12345',
            },
        };
        expect(getLoginPassword(state)).toEqual('12345');
    });
    test('should return undefined with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginPassword(state)).toEqual('');
    });
});
