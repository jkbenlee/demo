import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sn: 1,

    // applyForm: []
    applyForm: [
        {
            sid: '9999',
            flowId: '12',
            userId: 'jason.wang',
            userName: '王志誠',
            dept: '資訊部',
            formType: '1',
            status: '1',
            reason: 'test',
            applyDate: '115/01/07 00:00:00'
        }
    ]
}

const applyTodoSlice = createSlice({
    name: 'applyTodo',
    initialState: initialState,
    reducers: {
        addApplyForm: (state, action) => {
            const { userId, userName, dept, flowId, formType, reason, applyDate } = action.payload
            // return [
            // ...state.applyForm,
            // {
            //     "sid": Date.now(), "flowId": Date.now(), "flowSetId": Date.now(),
            //     "eidNo": "陳東", "status": "審核完成", "dept": "業務部add",
            //     "reason": reason, "applyDate": applyDate
            // }
            // ]

            // state.applyForm.push(action.payload);

            state.applyForm.push({
                "sid": state.sn++,
                "flowId": flowId,
                "userId": userId,
                "userName": userName,
                "dept": dept,
                "formType": formType,
                "status": "1",
                "reason": reason,
                "applyDate": applyDate
            })
        },

        modifyApplyForm: (state, action) => {
            console.log('1 >> ' + action.payload.sid)
            const item = state.applyForm.find(i => i.sid === action.payload.sid);
            if (item) {
                console.log('2 >> ' + item.sid)
                console.log('3 >> ' + action.payload.flowId)
                console.log('4 >> ' + action.payload.status)
                item.flowId = action.payload.flowId;
                item.status = action.payload.status;
            }
        },
    },
}
)

export const { addApplyForm, modifyApplyForm } = applyTodoSlice.actions
export default applyTodoSlice.reducer