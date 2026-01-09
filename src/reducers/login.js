import { createSlice } from '@reduxjs/toolkit'
import { userLogin } from './loginActions'

const initialState = {
    userId: '',
    userPassword: '',
    login: false,
    message: '',
    loading: false,
}

const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        logout: (state) => {
            state.userId = '';
            state.userPassword = '';
            state.login = false;
            state.message = '';
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.userId = action.payload.userId;
                state.userPassword = action.payload.userPassword;
                state.login = action.payload.login;
                state.message = action.payload.message;
            });
    },

})

export const { logout } = loginSlice.actions
export default loginSlice.reducer