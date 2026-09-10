import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    username: 'Guest'
}

const appSlice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true
            state.username = action.payload
        },
        logout: (state, action) => {
            state.isLoggedIn = false
            state.username = 'Guest'
        }
    }
})

const appActions = appSlice.actions;
export default appSlice.reducer
export { appActions }