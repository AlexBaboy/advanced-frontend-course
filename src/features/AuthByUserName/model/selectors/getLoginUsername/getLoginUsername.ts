import {StateSchema} from "@/app/providers/StoreProvider";
import {DeepPartial} from "@reduxjs/toolkit";

export const getLoginUsername = (state: DeepPartial<StateSchema>) => state.loginForm?.username || ''
