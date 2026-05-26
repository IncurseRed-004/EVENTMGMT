import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { CgProfile } from "react-icons/cg";
import { IoTicket } from "react-icons/io5";
import "./Navbar.css"

function Navigationbar({cartitems}){
    return(
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

              <Nav.Link as={Link} to='/login'>Login</Nav.Link>
              


              <Nav.Link as={Link} to='' className="position-relative">
                <IoTicket  size={22} />
                <span className="cart-count">{cartitems}</span>
              </Nav.Link>



              <NavDropdown title={<CgProfile size={22} />} id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Purchase Score</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Edit Profile
                </NavDropdown.Item>
                <NavDropdown.Item >LogOut</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>


        </>
    )
}
export default Navigationbar;