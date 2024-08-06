import {StateSchema} from "@/app/providers/StoreProvider";
import {DeepPartial} from "@reduxjs/toolkit";

export const getLoginIsLoading = (state: DeepPartial<StateSchema>) => state.loginForm?.isLoading || false
