
import { Form, Button, InputGroup, Alert } from 'react-bootstrap';

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { userLogin } from '../reducers/loginActions'
import { loginCheck } from '../common/loginCheck.js'
import { getFormTypeName, getFlowName, getStatusName, getStatusColorClass } from '../common/utils.js'
import { modifyApplyForm } from "../reducers/applyTodo";
import { getApplyDate, goNextStatus, goNextFlow, } from '../common/utils.js'
import { haveViewPermission, haveExecutionPermission } from '../common/permission.js'

const Process = () => {

    loginCheck();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userIdRef = useRef();
    const userPasswordRef = useRef();
    const { id } = useParams();

    // const [data, setData] = useState([]);
    // const state = useSelector((state) => state.login);

    const state = useSelector((state) => state.login);
    const todos = useSelector((state) => state.applyTodo.applyForm);
    const [showSuccess, setShowSuccess] = useState(false);

    const condition = (todo) => todo.sid == id
    const filterTodos = todos.filter(condition)
    const selectedTodo = filterTodos.slice(0, 1);

    const handleAgree = (data) => {
        event.preventDefault();
        console.log('handleAgree > ' + data)
        const buttonName = event.submitter.name;
        console.log('點擊的按鈕名稱：', buttonName);
        console.log('狀態是：', selectedTodo[0].status);
        console.log('流程是：', selectedTodo[0].flowId);

        if (buttonName === 'agree') {
            let newFlow = goNextFlow(selectedTodo[0].flowId)
            dispatch(modifyApplyForm({
                sid: selectedTodo[0].sid,
                status: goNextStatus(newFlow),
                flowId: newFlow,
                applyDate: getApplyDate()
            }));
        } else if (buttonName === 'reject') {
            dispatch(modifyApplyForm({
                sid: selectedTodo[0].sid,
                status: goNextStatus('r'),
                flowId: selectedTodo[0].flowId,
                applyDate: getApplyDate()
            }));
        }

        try {
            setShowSuccess(true);
            reset();
            setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
        } catch (error) {
            console.error('新增失敗:', error);
        }
    };

    const handleBack = () => {
        navigate('/todo');
    }

    return (
        < div className='container' >
            <div className="row mb-3">
                <div className="col-6">
                    {showSuccess && (
                        <Alert variant="success" className="col-6" onClose={() => setShowSuccess(false)} dismissible>
                            <Alert.Heading>處理成功！</Alert.Heading>
                            <p>您已成功處理這筆資料。</p>
                        </Alert>
                    )}
                    {haveViewPermission(state.userId, selectedTodo[0].userId, selectedTodo[0].flowId) &&
                        <Form onSubmit={handleSubmit(handleAgree)}>
                            {/* <Form.Label className="text-danger mt-2">&nbsp;&nbsp;{state.message}</Form.Label> */}

                            {/* <InputGroup className="mb-2 mt-2">
                            <Form.Label className="text-primary mt-2">&nbsp;&nbsp;{data.dept} - {data.userName}</Form.Label>
                            <Form.Label className="text-primary mt-2">&nbsp;&nbsp;{data.dept} - {data.userName}</Form.Label>
                        </InputGroup> */}

                            <InputGroup className="mb-2 mt-4">
                                <Form.Label className="text-primary ">表單號碼:</Form.Label>
                                <Form.Label className="text-primary ">{selectedTodo[0].sid}</Form.Label>
                            </InputGroup>

                            <InputGroup className="mb-2 mt-2">
                                <Form.Label className="text-primary">表單類型:</Form.Label>
                                <Form.Label className="text-primary">{getFormTypeName(selectedTodo[0].formType)} (申請日期: {selectedTodo[0].applyDate})</Form.Label>
                            </InputGroup>

                            <InputGroup className="mb-2 mt-2">
                                <Form.Label className="text-primary">表單狀態:</Form.Label>
                                <Form.Label className={getStatusColorClass(selectedTodo[0].status)}>{getStatusName(selectedTodo[0].status)}</Form.Label>
                            </InputGroup>

                            <InputGroup className="mb-2 mt-2">
                                <Form.Label className="text-primary">審核關卡:</Form.Label>
                                <Form.Label className="text-primary">{getFlowName(selectedTodo[0].flowId)}</Form.Label>
                            </InputGroup>

                            <InputGroup className="mb-2 mt-2">
                                <Form.Label className="text-primary">申請部門:</Form.Label>
                                <Form.Label className="text-primary">{selectedTodo[0].dept}</Form.Label>
                            </InputGroup>

                            <InputGroup className="mb-2 mt-2">
                                <Form.Label className="text-primary">申請人:</Form.Label>
                                <Form.Label className="text-primary">{selectedTodo[0].userName}</Form.Label>
                            </InputGroup>

                            <InputGroup className="mb-2 mt-2">
                                <Form.Label className="text-primary">事由:</Form.Label>
                                <Form.Label className="text-primary">{selectedTodo[0].reason}</Form.Label>
                            </InputGroup>

                            <InputGroup className="mt-2">
                                <Form.Label className="text-primary">意見:</Form.Label>
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <Form.Control as="textarea" rows={3} placeholder="填寫您的意見"
                                    {...register("opinion", {
                                        required: "需填寫意見",
                                    })}
                                    isInvalid={!!errors.opinion}
                                />
                                {errors.opinion && (
                                    <div className="invalid-feedback mb-3">{errors.opinion.message}</div>
                                )}
                            </InputGroup>

                            {haveExecutionPermission(state.userId, selectedTodo[0].flowId) &&
                                <>
                                    <Button variant="success" name="agree" type="submit">
                                        同意
                                    </Button>&nbsp;&nbsp;
                                    <Button variant="danger" name="reject" type="submit" >
                                        不同意
                                    </Button>&nbsp;&nbsp;
                                </>
                            }
                            <Button variant="primary" type="button" onClick={handleBack} >
                                回列表
                            </Button>&nbsp;&nbsp;
                        </Form>
                    }
                </div>
            </div>
        </div >
    );
};

export default Process;