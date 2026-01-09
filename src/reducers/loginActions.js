import { createAsyncThunk } from '@reduxjs/toolkit'
import { setUserData } from "./employee";

export const userLogin = createAsyncThunk(
  'user/login',
  async ({ userId, userPassword }, { dispatch }) => {
    try {

      let isLogin = true;
      let message = '';

      if (userPassword === '87654321b') {
        console.log(userId + ' 密碼正確');

        switch (userId) {
          case 'jason.wang':
            break;
          case 'jessica.lee':
            break;
          case 'kevin.lin':
            break;
          case 'director1':
            break;
          case 'director2':
            break;
          case 'director3':
            break;
          case 'manager':
            break;
          case 'admin':
            break;
          default:
            isLogin = false;
            message = '無此使用者';
        }

      } else {
        isLogin = false;
        message = '密碼錯誤，請重新輸入';
      }

      if (isLogin) {
        message = userId + '登入成功';
        dispatch(setUserData({ userId }));
      }

      return { userId, userPassword, login: isLogin, message }

    } catch (error) { }
  }
)
