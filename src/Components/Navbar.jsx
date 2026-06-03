import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { CgProfile } from "react-icons/cg";
import { IoTicket } from "react-icons/io5";
import "./Navbar.css"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userLogout } from "../Redux/userSlice";

function Navigationbar({ cartitems }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.userState);// Accessing the isAuthenticated state from the Redux store

  const handleLogout = () => {
    dispatch(userLogout());
    toast.success("Logged out successfully");
    setTimeout(() => {
      navigate("/login")
    }, 1000)
  }
  return (
    <>

      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">BayyDay</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" >NearYou</Nav.Link>
              <Nav.Link as={Link} to="/deals">Deals</Nav.Link>
            </Nav>

            <Nav className="ms-auto">

              {!isAuthenticated && ( // Conditionally render the Login link if the user is not authenticated
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )} 
                
              



              <Nav.Link as={Link} to='' className="position-relative">
                <IoTicket size={22} />
                <span className="cart-count">{cartitems}</span>
              </Nav.Link>


              {isAuthenticated && ( // Conditionally render the dropdown menu if the user is authenticated
                <NavDropdown title={<CgProfile size={22} />} id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="">Purchase Score</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="">
                    Edit Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} onClick={handleLogout}>LogOut</NavDropdown.Item>
                  <NavDropdown.Divider />
                </NavDropdown>
              )}

            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>


    </>
  )
}
export default Navigationbar;