import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UISchema } from '@/features/ui';

const initialState: UISchema = {
    scroll: {},
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setScrollPosition: (
            state,
            { payload }: PayloadAction<{ path: string; position: number }>,
        ) => {
            state.scroll[payload.path] = payload.position;
        },
    },
});

export const { actions: uiActions, reducer: uiReducer } = uiSlice;
