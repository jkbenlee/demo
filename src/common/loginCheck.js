import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const loginCheck = () => {

    const state = useSelector((state) => state.login);

    // 無登入，禁止使用該功能，導回首頁
    const navigate = useNavigate();
    useEffect(() => {
        if (!state.login) {
            console.log('你還沒登入喔~');
            navigate('/');
        }
    }, [state, navigate]);
}