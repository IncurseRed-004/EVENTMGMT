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
import axios from "axios";
import { useEffect, useState } from "react";


function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get(
          "https://dummyjson.com/products"
        );

        const formattedEvents = data.products.map((product) => ({
          id: product.id,
          name: product.title,
          price: product.price,
          location: product.brand,
          description: product.description,
          image: product.thumbnail
        }));

        setEvents(formattedEvents);

      } catch (error) {
        console.log(error);
      }
    };

    fetchEvents();
  }, []);


  return (
    <>
      <BrowserRouter>
        <Navigationbar />
        <ToastContainer position="top-right" autoClose={2000} />
        <Routes>

          <Route path="/" element={<Home events={events} />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/events" element={<Eventpage events={events} />} />
          <Route
            path="/eventdetails/:id"
            element={<Eventdetails events={events} />}
          />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/add-events"
            element={
              <ProtectedRoute requiredRole={["admin", "seller"]}>
                <Addevents />
              </ProtectedRoute>
            }
          />
          <Route path="/list-events" element={<ProtectedRoute requiredRole={["admin", "seller"]}>
            <Listevents events={events} />
          </ProtectedRoute>} />
          <Route path="/edit-events/:id" element={<ProtectedRoute requiredRole={["admin", "seller"]}>
            <Editevents />
          </ProtectedRoute>} />
          <Route path="/list-users" element={<ProtectedRoute requiredRole={["admin"]}>
            <ListUsers />
          </ProtectedRoute>} />
          <Route
            path="/admin/edit-user/:id"
            element={
              <ProtectedRoute requiredRole={["admin", "user", "seller"]}>
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