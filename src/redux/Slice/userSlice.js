import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "https://jsonplaceholder.typicode.com/users";
export const fetchUsers = createAsyncThunk(
    "users/addUser",
    async (newUser, { rejectWithValue }) => {
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser),
            });
            if (!res.ok) {
                return rejectWithValue({ status: res.status, message: "Ошибка при добавлении пользователя" });
            }
            const data = await res.json();
            return data;
        } catch (error) {
            return rejectWithValue({ status: 500, message: error.message || "Что-то пошло не так" });
        }
    }
);

const initialState = {
    list: [],
    addState: 'idle',
    addError: null,
    addedUser: null,
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        resetAddState(state) {
            state.addState = 'idle';
            state.addError = null;
            state.addedUser = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.addState = 'loading';
                state.addError = null;
                state.addedUser = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.addState = 'succeeded';
                state.addedUser = action.payload;
                state.list.push(action.payload);
            })  
            .addCase(fetchUsers.rejected, (state, action) => {
                state.addState = 'failed';
                state.addError = action.payload || { status: 0, message: 'Неизвестная ошибка' };
            });
    }
});

export const { resetAddState } = userSlice.actions;
export default userSlice.reducer;
