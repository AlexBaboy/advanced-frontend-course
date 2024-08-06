import {StateSchema} from "@/app/providers/StoreProvider";
import {DeepPartial} from "@reduxjs/toolkit";

export const getLoginError = (state: DeepPartial<StateSchema>) => state.loginForm?.error || undefined
