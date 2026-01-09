import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userId: '',
    userPassword: '',
    userName: '',
    dept: '',
}

const employeeSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, { payload }) => {
            const { userId } = payload

            let userName = '';
            let dept = '';
            let userPassword = '87654321b';

            switch (userId) {
                case 'jason.wang':
                    userName = '王志誠';
                    dept = '資訊部';
                    break;
                case 'jessica.lee':
                    userName = '李佳玲';
                    dept = '人事部';
                    break;
                case 'kevin.lin':
                    userName = '林健宏';
                    dept = '業務部';
                    break;
                case 'director1':
                    userName = '主管';
                    dept = '資訊部';
                    break;
                case 'director2':
                    userName = '主管';
                    dept = '人事部';
                    break;
                case 'director3':
                    userName = '主管';
                    dept = '業務部';
                    break;
                case 'manager':
                    userName = '經理';
                    dept = '經理室';
                    break;
                case 'admin':
                    userName = '管理員';
                    dept = '資訊部';
                    break;
                default:
            }

            state.userId = userId;
            state.userPassword = userPassword;
            state.userName = userName;
            state.dept = dept;
        }
    },

})


export const { setUserData } = employeeSlice.actions
export default employeeSlice.reducer