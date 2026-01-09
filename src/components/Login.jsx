import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../reducers/loginActions'

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userIdRef = useRef();
    const userPasswordRef = useRef();
    const userPassword = "87654321b";
    const { id } = useParams();

    const [data, setData] = useState([]);
    const state = useSelector((state) => state.login);

    useEffect(() => {

        if (state.login) {
            navigate('/')
        }

        switch (id) {
            case '1':
                setData({ userId: 'jason.wang', dept: '資訊部', userName: '王志誠' })
                break;
            case '2':
                setData({ userId: 'jessica.lee', dept: '人事部', userName: '李佳玲' })
                break;
            case '3':
                setData({ userId: 'kevin.lin', dept: '業務部', userName: '林健宏' })
                break;
            case '4':
                setData({ userId: 'director1', dept: '資訊部', userName: '主管' })
                break;
            case '5':
                setData({ userId: 'director2', dept: '人事部', userName: '主管' })
                break;
            case '6':
                setData({ userId: 'director3', dept: '業務部', userName: '主管' })
                break;
            case '7':
                setData({ userId: 'manager', dept: '經理室', userName: '經理' })
                break;
            case '9':
                setData({ userId: 'admin', dept: '資訊部', userName: '管理員' })
                break;
            default:
                setData({ userId: 'guest', dept: '無此部門', userName: '訪客' })
        }

    }, [navigate, id, state.login])

    const handleLogin = () => {
        const userId = userIdRef.current.value;
        dispatch(userLogin({ userId: userId, userPassword: userPasswordRef.current.value }));
    };

    return (
        < div className='container' >
            <div className="row mb-3">
                <div className="col-6">
                    <Form>
                        {!state.login && <>
                            <Form.Label className="text-danger mt-2">&nbsp;&nbsp;{state.message}</Form.Label>

                            <InputGroup className="mb-2 mt-2">
                                <Form.Label className="text-primary mt-2">&nbsp;&nbsp;{data.dept} - {data.userName}</Form.Label>
                            </InputGroup>

                            <InputGroup className="mb-2">
                                <InputGroup.Text >帳號</InputGroup.Text>
                                <Form.Control
                                    placeholder="輸入帳號"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    defaultValue={data.userId}
                                    ref={userIdRef}
                                    required
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text >密碼</InputGroup.Text>
                                <Form.Control
                                    type="password"
                                    placeholder="輸入密碼"
                                    aria-describedby="passwordHelpBlock"
                                    defaultValue={userPassword}
                                    ref={userPasswordRef}
                                    required
                                />
                            </InputGroup>

                            {/* <Button variant="primary" type="submit"> */}
                            <Button variant="primary" type="button" onClick={handleLogin} >
                                登入
                            </Button>&nbsp;&nbsp;
                            <Button variant="primary" type="reset" >
                                重置
                            </Button>
                        </>}
                    </Form>
                </div>
            </div>
        </div >
    );
};

export default Login;