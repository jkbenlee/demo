import { Form, Button, Alert } from 'react-bootstrap';
import { useState } from "react";
import { useForm } from 'react-hook-form'
import { addApplyForm } from "../reducers/applyTodo";
import { loginCheck } from '../common/loginCheck.js'
import { useDispatch, useSelector } from 'react-redux'
import { getApplyDate, startDeptFlowMap } from '../common/utils.js'

function Apply() {

    loginCheck();
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const state = useSelector((state) => state.user);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleAddApplyForm = (data) => {
        event.preventDefault();
        dispatch(addApplyForm({
            userId: state.userId,
            userName: state.userName,
            dept: state.dept,
            flowId: startDeptFlowMap[state.userId],
            formType: data.formType,
            reason: data.reason,
            applyDate: getApplyDate()
        }));

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

    return (
        <>
            <div className='container'>
                {showSuccess && (
                    <Alert variant="success" className="col-6" onClose={() => setShowSuccess(false)} dismissible>
                        <Alert.Heading>新增成功！</Alert.Heading>
                        <p>您已成功新增一筆資料。</p>
                    </Alert>
                )}
                <Form onSubmit={handleSubmit(handleAddApplyForm)}>
                    <div className="row mb-4 mt-3">
                        <div className="col-2" style={{ color: 'blue', verticalAlign: 'middle' }}>{state.dept + ' - ' + state.userName}</div>
                    </div>
                    <p />
                    <Form.Label>申請類別:</Form.Label>
                    <Form.Group className="mb-3 col-6">
                        <Form.Select
                            {...register("formType", {
                                required: "需選擇一個申請類別",
                            })}
                            isInvalid={!!errors.formType}
                        >
                            <option value="">請選擇</option>
                            <option value="1">帳號申請</option>
                            <option value="2">資料服務單</option>
                            <option value="3">變更單</option>
                        </Form.Select>
                        {errors.formType && (
                            <div className="invalid-feedback mb-3">{errors.formType.message}</div>
                        )}

                        <Form.Label>申請事由:</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="填寫申請事由"
                            {...register("reason", {
                                required: "需填寫申請事由",
                                // minLength: {
                                //     value: 6, message: "密碼至少6個字"
                                // }
                            })}
                            isInvalid={!!errors.reason}
                        />
                        {errors.reason && (
                            <div className="invalid-feedback mb-3">{errors.reason.message}</div>
                        )}

                    </Form.Group>

                    <Button variant="primary" type="submit">
                        送出申請
                    </Button>
                </Form >
            </div >
        </>
    );
}

export default Apply;