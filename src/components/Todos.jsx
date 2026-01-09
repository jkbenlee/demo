import Table from 'react-bootstrap/Table';
import { useSelector } from "react-redux";
import { useState } from "react";
import Pagination from 'react-bootstrap/Pagination';
import { loginCheck } from '../common/loginCheck.js'
import { getFormTypeName, getFlowName, getStatusName, getStatusColorClass } from '../common/utils.js'
import { getActionButtonName } from '../common/permission.js'
import { useNavigate } from 'react-router-dom';

function TableResults() {

    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate('/process/' + id);
    }

    loginCheck();
    const todos = useSelector((state) => state.applyTodo.applyForm);
    const state = useSelector((state) => state.user);

    // 1. 狀態管理：目前頁碼、每頁顯示幾筆
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // 2. 計算邏輯
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const condition = (todo) => {
        return (state.userId === todo.userId || state.userId === 'admin') ||
            (state.userId === 'director1' && todo.flowId === '12') ||
            (state.userId === 'director2' && todo.flowId === '22') ||
            (state.userId === 'director3' && todo.flowId === '32') ||
            (state.userId === 'manager' && ['13', '23', '33'].includes(todo.flowId))
    }
    const filterTodos = todos.filter(condition)
    const currentItems = filterTodos.slice(indexOfFirstItem, indexOfLastItem); // 當前頁面顯示的資料

    const totalPages = Math.ceil(filterTodos.length / itemsPerPage);

    // 3. 處理頁碼切換
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0); // 切換頁面時回到頂部
    };

    // 4. 產生分頁按鈕清單
    let paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => handlePageChange(number)}
            >
                {number}
            </Pagination.Item>
        );
    }

    return (
        <section>
            <div className="table-responsive">
                <Table className="table table-striped" style={{ width: '80%', margin: '20px auto', tableLayout: 'fixed' }}>
                    <thead className="table-primary">
                        <tr>
                            <th>單號</th>
                            <th>類型</th>
                            <th>表單狀態</th>
                            <th>審核關卡</th>
                            <th>申請部門</th>
                            <th>申請人</th>
                            <th>事由</th>
                            <th>申請日期</th>
                            <th>動作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItems.map((todo) => (
                                <tr key={todo.sid} className="align-middle">
                                    <td >{todo.sid}</td>
                                    <td >{getFormTypeName(todo.formType)}</td>
                                    <td className={getStatusColorClass(todo.status)}>{getStatusName(todo.status)}</td>
                                    <td style={{ 'color': 'orange' }}>{getFlowName(todo.flowId)}</td>
                                    <td >{todo.dept}</td>
                                    <td >{todo.userName}</td>
                                    <td >{todo.reason}</td>
                                    <td >{todo.applyDate}</td>
                                    <td ><button className='btn btn-outline-primary btn-sm' onClick={() => handleClick(todo.sid)}>{getActionButtonName(state.userId, todo.userId, todo.flowId)}</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table >

                <div className="d-flex justify-content-center">
                    {/* 分頁控制元件 */}
                    <Pagination className="text-center">
                        <Pagination.First
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1}
                        />
                        <Pagination.Prev
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        />

                        {paginationItems}

                        <Pagination.Next
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        />
                        <Pagination.Last
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages}
                        />
                    </Pagination>
                </div>
            </div>
        </section >
    );
}

export default TableResults;    