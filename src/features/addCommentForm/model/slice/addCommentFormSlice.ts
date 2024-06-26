import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AddCommentFormSchema} from "../types/addCommentForm";

const initialState: AddCommentFormSchema = {
    text: ''
}

export const addCommentFormSlice = createSlice({
    name: 'addCommentForm',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload
        },
        /*setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },*/
    },
    /*extraReducers: builder => {
        builder
            .addCase(loginByUsername.pending, (state, action) => {
                state.error = ''
                state.isLoading = true
            })
            .addCase(loginByUsername.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(loginByUsername.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string | undefined
            })
    }*/
})

export const {
    actions: addCommentFormActions,
    reducer: addCommentFormReducer
} = addCommentFormSlice
