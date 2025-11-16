import { Container, Nav, NavItem, NavLink, Navbar, NavbarBrand } from 'reactstrap';
import { Link, Outlet } from 'react-router-dom';
import { FaGraduationCap, FaUserGraduate, FaClipboardList } from 'react-icons/fa';

const Layout = () => {
    return (
        <>
            <Navbar color="primary" dark expand="md" className="mb-4">
                <Container>
                    <NavbarBrand tag={Link} to="/">
                        <FaGraduationCap className="me-2" />
                        Sistema de Matrículas
                    </NavbarBrand>
                    <Nav className="ms-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/cursos" className="text-white">
                                <FaClipboardList className="me-1" />
                                Cursos
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/alunos" className="text-white">
                                <FaUserGraduate className="me-1" />
                                Alunos
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/matriculas" className="text-white">
                                <FaClipboardList className="me-1" />
                                Matrículas
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Container>
            </Navbar>

            <Container>
                <Outlet />
            </Container>
        </>
    );
};

export default Layout;