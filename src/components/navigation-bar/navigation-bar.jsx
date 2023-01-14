import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

 
export function NavBar ({user}) {

    const isLoggedIn = () => {
        if (localStorage.getItem('token')) {
          return localStorage.getItem('token');
        } else {
          return false;
        }
      }

    const onLoggedOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.open('/', '_self');
        };

        return (
            <Navbar expand="lg" className="navbar" collapseOnSelect bg="light" variant="light">
              <Container>
                <Navbar.Brand href="/">myFlix</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    {!isLoggedIn() && (
                    <Nav.Link as={Link} to="/">Sign in</Nav.Link>)}
                    {!isLoggedIn() && (
                    <Nav.Link as={Link} to="/register">Sign up</Nav.Link>)}
                    {isLoggedIn() && (
                    <Nav.Link as={Link} to="/">Movies</Nav.Link>)}
                    {isLoggedIn() && (
                    <Nav.Link as={Link} to={`/users/${user}`}>Profile</Nav.Link>)}
                    {isLoggedIn() && (
                    <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>)}
                </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          );
}