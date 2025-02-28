import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/user';
import {
    LOCAL_STORAGE_LAST_DESIGN_KEY,
    USER_LOCALSTORAGE_KEY,
} from '@/shared/const/localStorage';
import { setFeatureFlags } from '@/shared/lib/features';
import { saveJsonSettings } from '@/entities/User/model/services/saveJsonSettings';
import { JsonSettings } from '@/entities/User/model/types/jsonSettings';
import { initAuthData } from '@/entities/User/model/services/initAuthData';

const initialState: UserSchema = {
    _inited: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, { payload }: PayloadAction<User>) => {
            state.authData = payload;
            setFeatureFlags(payload.features);

            localStorage.setItem(USER_LOCALSTORAGE_KEY, payload.id);
            localStorage.setItem(
                LOCAL_STORAGE_LAST_DESIGN_KEY,
                payload?.features?.isAppRedesigned ? 'new' : 'old',
            );
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
    },

    extraReducers: (builder) => {
        builder.addCase(
            saveJsonSettings.fulfilled,
            (state, { payload }: PayloadAction<JsonSettings>) => {
                if (!state.authData) return;
                state.authData.jsonSettings = payload;
            },
        );

        builder.addCase(
            initAuthData.fulfilled,
            (state, { payload }: PayloadAction<User>) => {
                if (!state.authData) return;
                state.authData = payload;
                setFeatureFlags(payload.features);
                state._inited = true;
            },
        );

        builder.addCase(initAuthData.rejected, (state) => {
            state._inited = true;
        });
    },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
