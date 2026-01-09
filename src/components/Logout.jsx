import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../reducers/login';

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    return (
        <>
            <span style={{ color: '#65b636ff', verticalAlign: 'middle' }}>{state.dept + ' - ' + state.userName}&nbsp;
                <button className="btn btn-outline-light" onClick={handleLogout}>登出</button>
            </span >
        </>
    )
}
export default Logout;