import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./Slice/userSlice";

 export const store = configureStore({
    reducer: { 
        users: usersReducer
    }
});