import { createSlice } from '@reduxjs/toolkit';
import { fetchCats } from "../../api/fetchCats";

interface CatState {
    entities: any[];
    loading: boolean;
    error: string | null | undefined;
}

const initialState: CatState = {
    entities: [],
    loading: false,
    error: null,
};

export const catSlice = createSlice({
    name: 'cats',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCats.fulfilled, (state, action) => {
                state.loading = false;
                state.entities = action.payload;
            })
            .addCase(fetchCats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default catSlice.reducer;
