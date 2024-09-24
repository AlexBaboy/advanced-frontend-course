import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getLoginPassword = (state: DeepPartial<StateSchema>) => state.loginForm?.password || '';
