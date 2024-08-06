import {StateSchema} from "@/app/providers/StoreProvider";
import {DeepPartial} from "@reduxjs/toolkit";

export const getLoginPassword = (state: DeepPartial<StateSchema>) => state.loginForm?.password || ''
