import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getLoginUsername = (state: DeepPartial<StateSchema>) => state.loginForm?.username || '';
