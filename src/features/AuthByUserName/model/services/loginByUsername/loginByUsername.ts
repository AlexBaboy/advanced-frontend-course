import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {User} from "entities/User";

type LoginByUsernameProps = {
    username: string
    password: string
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps>
(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        try {
            const response = await axios.post<User>(
                'http://localhost:8000/login',
                authData,
            )

            if (!response.data) {
                throw new Error('no data!')
            }

            return response.data
        } catch (e) {
            console.error(e)
            return thunkAPI.rejectWithValue('error')
        }
    }
)
