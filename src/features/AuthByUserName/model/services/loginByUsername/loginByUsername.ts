import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {User, userActions} from "entities/User";
import i18n from "i18next";
import {USER_LOCALSTORAGE_KEY} from "shared/const/localStorage";

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

            localStorage.setItem(
                USER_LOCALSTORAGE_KEY,
                JSON.stringify(response.data)
            )
            thunkAPI.dispatch(
                userActions.setAuthData(response.data)
            )

            return response.data
        } catch (e) {
            console.error(e)
            return thunkAPI.rejectWithValue(
                i18n.t('Некорректный логин или пароль')
            )
        }
    }
)
