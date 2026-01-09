import { configureStore } from '@reduxjs/toolkit'
import applyTodoSlice from '../reducers/applyTodo.js'
import loginSlice from '../reducers/login.js'
import employeeSlice from '../reducers/employee.js'

export const store = configureStore({
    reducer: {
        applyTodo: applyTodoSlice,
        login: loginSlice,
        user: employeeSlice
    }
})
