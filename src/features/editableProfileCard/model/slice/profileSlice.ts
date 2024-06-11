import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Profile } from 'entities/Profile';
import { ProfileSchema } from 'features/editableProfileCard';
import {fetchProfileData} from '../services/fetchProfileData/fetchProfileData';
import {updateProfileData} from '../services/updateProfileData/updateProfileData';

const initialState: ProfileSchema = {
    isLoading: false,
    readonly: true,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setReadOnly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload
        },
        cancelEdit: (state) => {
            state.readonly = true
            state.form = state.data
            state.validateErrors = undefined
        },
        updateProfile: (state, action: PayloadAction<Profile>) => {
            state.form = {
                ...state.data,
                ...action.payload,
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // fetch
            .addCase(fetchProfileData.pending, (state, action) => {
                state.error = ''
                state.isLoading = true
            })
            .addCase(
                fetchProfileData.fulfilled,
                (state, action: PayloadAction<Profile>) => {
                    state.isLoading = false
                    state.data = action.payload
                    state.form = action.payload
                },
            )
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string | undefined
            })
            // update
            .addCase(updateProfileData.pending, (state, action) => {
                state.validateErrors = undefined
                state.isLoading = true
            })
            .addCase(
                updateProfileData.fulfilled,
                (state, action: PayloadAction<Profile>) => {
                    state.isLoading = false
                    state.data = action.payload
                    state.form = action.payload
                    state.readonly = true
                    state.validateErrors = undefined
                },
            )
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isLoading = false
                state.validateErrors = action.payload
            })
    },
})

export const {
    actions: profileActions,
    reducer: profileReducer,
} = profileSlice
