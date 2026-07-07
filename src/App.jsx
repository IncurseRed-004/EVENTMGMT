import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Homepage";
import Navigationbar from "./Components/Navbar";
import NotFound from "./Pages/Notfoundpage";
import Footer from "./Components/Footer";
import Eventpage from "./Pages/Eventpage";
import Eventdetails from "./Pages/Eventdetails";
import Loginpage from "./Pages/Loginpage";
import RegisterPage from "./Pages/Registrationpage";
import { ToastContainer } from "react-toastify";
import Addevents from "./admin/AddEvents";
import Listevents from "./admin/Listevents";
import Editevents from "./admin/EditEvent";
import ProtectedRoute from "./utils/ProtectedRoute";
import ListUsers from "./admin/ListUsers";
import EditUser from "./admin/EditUser";
import Cartpage from "./Pages/CartPage";
import UserProfile from "./Pages/UserProfile";



function App() {
 


  return (
    <>
      <BrowserRouter>
        <Navigationbar />
        <ToastContainer position="top-right" autoClose={2000} />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/events" element={<Eventpage />} />
          <Route
            path="/eventdetails/:id"
            element={<Eventdetails />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/add-events" element={<ProtectedRoute
            requiredRole={["admin", "seller"]}>
            <Addevents />
          </ProtectedRoute>
          } />
          <Route path="/list-events" element={<ProtectedRoute requiredRole={["admin", "seller"]}>
            <Listevents />
          </ProtectedRoute>} />
          <Route path="/edit-events/:id" element={<ProtectedRoute requiredRole={["admin"]}>
            <Editevents />
          </ProtectedRoute>} />
          <Route path="/list-users" element={<ProtectedRoute requiredRole={["admin"]}>
            <ListUsers />
          </ProtectedRoute>} />
          <Route
            path="/admin/edit-user/:id"
            element={
              <ProtectedRoute requiredRole={["admin"]}>
                <EditUser />
              </ProtectedRoute>
            }
          />
          <Route path="/cart" element={<Cartpage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute requiredRole={["admin", "seller", "user"]}>
                <UserProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>


    </>
  )
}
export default App;