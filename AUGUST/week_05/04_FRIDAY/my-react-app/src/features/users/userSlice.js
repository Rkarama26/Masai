import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    return response.json();
}
)

const userSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    // directly give reducers to us
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true// start loading
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false,
                    state.data = action.payload
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.error.message
            })
    }
})

export default userSlice.reducer;
