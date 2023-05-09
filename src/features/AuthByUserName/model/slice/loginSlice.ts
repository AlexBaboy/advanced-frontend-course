import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoginSchema} from "../types/loginSchema";

const initialState: LoginSchema = {
    isLoading: false,
    password: "",
    username: ""
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUserName: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
    }
})

export const {
    actions: loginActions,
    reducer: loginReducer
} = loginSlice
