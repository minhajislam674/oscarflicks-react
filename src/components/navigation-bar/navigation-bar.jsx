import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import './navigation-bar.scss';
require( './../../assets/site-icon.png')


 
export const NavBar = ({user}) => {

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
              <Navbar.Brand href="/">
                <img
                  alt="myflix icon"
                  src={require( './../../assets/favicon-32x32.png')}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />{' '}
                OscarFlicks
            </Navbar.Brand>
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
                    <Nav.Link as={Link} to={`/users/${user.Username}}`}>Profile</Nav.Link>)} 
                    {isLoggedIn() && (
                    <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>)}
                </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          );
}