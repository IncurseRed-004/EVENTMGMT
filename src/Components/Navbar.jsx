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

function Navigationbar() {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.eventState);
  const { user, isAuthenticated } = useSelector((state) => state.userState);// Accessing the isAuthenticated state from the Redux store

  const myCart = cartItems.filter(
    (item) => item.userId === user?.id
  );
  const dispatch = useDispatch();


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
          <Navbar.Brand as={Link} to="/">
            BayyDay
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">

            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                NearYou
              </Nav.Link>
            </Nav>

            <Nav className="ms-auto">

              {!isAuthenticated ? (
                <>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>

                  <Nav.Link as={Link} to="/register">
                    Register
                  </Nav.Link>
                </>
              ) : (
                <>
                  {user?.role === "user" && (
                    <Nav.Link as={Link} to="/cart" className="position-relative">
                      <IoTicket size={22} />
                      {myCart.length > 0 && (
                        <span className="cart-count">
                          {myCart.length}
                        </span>
                      )}
                    </Nav.Link>
                  )}


                  <NavDropdown
                    title={<CgProfile size={22} />}
                    id="basic-nav-dropdown"
                  >
                    {/* Everyone */}
                    <NavDropdown.Item as={Link} to="/profile">
                      Edit Profile
                    </NavDropdown.Item>

                    {user?.role === "user" && (
                      <NavDropdown.Item as={Link} to="/previous-bookings">
                        Previous Bookings
                      </NavDropdown.Item>
                    )}

                    {/* Seller & Admin */}
                    {(user?.role === "seller" || user?.role === "admin") && (
                      <>
                        <NavDropdown.Item as={Link} to="/add-events">
                          Add Events
                        </NavDropdown.Item>

                        <NavDropdown.Item as={Link} to="/list-events">
                          List Events
                        </NavDropdown.Item>
                      </>
                    )}

                    {/* Admin Only */}
                    {user?.role === "admin" && (
                      <NavDropdown.Item as={Link} to="/list-users">
                        List Users
                      </NavDropdown.Item>
                    )}

                    <NavDropdown.Divider />

                    <NavDropdown.Item
                      as={Link}
                      to="/login"
                      onClick={handleLogout}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}

            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>


    </>
  )
}
export default Navigationbar;