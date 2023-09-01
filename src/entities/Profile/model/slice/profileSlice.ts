import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Profile, ProfileSchema} from "../types/profile";
import {fetchProfileData} from "../services/fetchProfileData/fetchProfileData";

const initialState: ProfileSchema = {
    isLoading: false,
    readonly: true
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
        },
        updateProfile: (state, action: PayloadAction<Profile>) => {
            state.form = {
                ...state.data,
                ...action.payload
            }
        }
    },
    extraReducers: builder => {
        builder
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
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string | undefined
            })
    }
})

export const {
    actions: profileActions,
    reducer: profileReducer
} = profileSlice
