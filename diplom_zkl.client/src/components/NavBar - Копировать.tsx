import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import useAuth from "../hooks/useAuth";

function NavBar() {
    const { isAuthenticated } = useAuth();
    if (isAuthenticated == true) {
        return (
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Link to="/"><Nav.Link href="/">Домой</Nav.Link></Link>
                            <Link to="/admin"><Nav.Link href="/admin">Панель администрирования</Nav.Link></Link>
                            <Link to="/passwordreset"><Nav.Link href="/passwordreset">Сброс пароля</Nav.Link></Link>
                            <NavDropdown title="Link" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">
                                    Something else here
                                </NavDropdown.Item>
                            </NavDropdown>

                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Поиск</Button>
                        </Form>
                        <div className="col-auto">
                            <Nav.Link href="/logout">Выход</ Nav.Link>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
           
        );
    }
    else
        return (<></>);
}
    export default NavBar