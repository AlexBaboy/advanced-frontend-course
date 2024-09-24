import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getLoginIsLoading = (state: DeepPartial<StateSchema>) => state.loginForm?.isLoading || false;
