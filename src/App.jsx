
import Container from 'react-bootstrap/Container';
import About from './components/About';
import Apply from './components/Apply';
import Login from './components/Login';
import Todos from './components/Todos';
import Process from './components/Process';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Logout from './components/Logout';
import { haveTodoPermission } from './common/permission'

function App() {

  const state = useSelector((state) => state.login);

  const [styleColor, setStyleColor] = useState([]);
  const [disabled, setDisabled] = useState('');

  const itemStyle1 = null;

  const itemStyle2 = {
    color: '#65b636ff',
    fontWeight: '500'
  };

  useEffect(() => {

    if (state.login) {
      setDisabled('disabled');
    } else {
      setDisabled('');
    }

    let selectedColors = []
    switch (state.userId) {
      case 'jason.wang': // 資訊部 - 王志誠
        selectedColors = [itemStyle2, itemStyle1, itemStyle1, itemStyle1, itemStyle1, itemStyle1, itemStyle1, itemStyle1]
        break;
      case 'jessica.lee': // 人事部 - 李佳玲
        selectedColors = [itemStyle1, itemStyle2, itemStyle1, itemStyle1, itemStyle1, itemStyle1, itemStyle1, itemStyle1]
        break;
      case 'kevin.lin': // 業務部 - 林健宏
        selectedColors = [itemStyle1, itemStyle1, itemStyle2, itemStyle1, itemStyle1, itemStyle1, itemStyle1, itemStyle1]
        break;
      case 'director1': // 資訊部 - 主管
        selectedColors = [itemStyle1, itemStyle1, itemStyle1, itemStyle2, itemStyle1, itemStyle1, itemStyle1, itemStyle1]
        break;
      case 'director2': // 人事部 - 主管
        selectedColors = [itemStyle1, itemStyle1, itemStyle1, itemStyle1, itemStyle2, itemStyle1, itemStyle1, itemStyle1]
        break;
      case 'director3': // 業務部 - 主管
        selectedColors = [itemStyle1, itemStyle1, itemStyle1, itemStyle1, itemStyle1, itemStyle2, itemStyle1, itemStyle1]
        break;
      case 'manager': // 經理室 - 經理
        selectedColors = [itemStyle1, itemStyle1, itemStyle1, itemStyle1, itemStyle1, itemStyle1, itemStyle2, itemStyle1]
        break;
      case 'admin': // 資訊部 - 管理員
        selectedColors = [itemStyle1, itemStyle1, itemStyle1, itemStyle1, itemStyle1, itemStyle1, itemStyle1, itemStyle2]
        break;
      default:
        selectedColors = []
    }
    setStyleColor(selectedColors)

  }, [state]);

  return (
    <>
      <Router>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container fluid>
            <Navbar.Brand as={Link} to="/">資訊服務單</Navbar.Brand>
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              =
              {/* Nav Link 沒有 to ，只有 href，所以會導頁，有問題，使用 redux 應避免 */}
              {/* <Nav.Link href="/">首頁</Nav.Link> */}
              {/* <Nav.Link as={NavLink} to="/">首頁</Nav.Link> */}

              <NavDropdown title="角色切換">
                <NavDropdown.Item as={itemStyle1 == null ? NavLink : 'span'} to="/login/1" style={styleColor[0]} disabled={disabled}>資訊部 - 王志誠</NavDropdown.Item>
                <NavDropdown.Item as={itemStyle1 == null ? NavLink : 'span'} to="/login/2" style={styleColor[1]} disabled={disabled}>人事部 - 李佳玲</NavDropdown.Item>
                <NavDropdown.Item as={itemStyle1 == null ? NavLink : 'span'} to="/login/3" style={styleColor[2]} disabled={disabled}>業務部 - 林健宏</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={itemStyle1 == null ? NavLink : 'span'} to="/login/4" style={styleColor[3]} disabled={disabled}>資訊部 - 主管</NavDropdown.Item>
                <NavDropdown.Item as={itemStyle1 == null ? NavLink : 'span'} to="/login/5" style={styleColor[4]} disabled={disabled}>人事部 - 主管</NavDropdown.Item>
                <NavDropdown.Item as={itemStyle1 == null ? NavLink : 'span'} to="/login/6" style={styleColor[5]} disabled={disabled}>業務部 - 主管</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={itemStyle1 == null ? NavLink : 'span'} to="/login/7" style={styleColor[6]} disabled={disabled}>經理室 - 總經理</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={itemStyle1 == null ? NavLink : 'span'} to="/login/9" style={styleColor[7]} disabled={disabled}>資訊部 - 管理員</NavDropdown.Item>
              </NavDropdown>
              {state.login &&
                <NavDropdown title="案件">
                  <NavDropdown.Item as={NavLink} to="/apply">申請</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/todo">查詢</NavDropdown.Item>
                </NavDropdown>
              }

              {state.login && haveTodoPermission(state.userId) && <Nav.Link as={NavLink} to="/todo">待辦</Nav.Link>}
            </Nav>
            <Nav>{state.login && <Logout />}</Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/login/:id" element={<Login />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/todo" element={<Todos />} />
          <Route path="/process/:id" element={<Process />} />
          <Route path="*" element={<p>找不到頁面</p>} />
        </Routes>
      </Router >
    </>
  );
}

export default App
