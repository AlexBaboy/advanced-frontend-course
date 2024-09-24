import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getLoginError = (state: DeepPartial<StateSchema>) => state.loginForm?.error || undefined;
