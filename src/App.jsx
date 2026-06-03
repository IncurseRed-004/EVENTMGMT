import React, { useState } from "react";
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
import Deals from "./Pages/Dealspage";
import { ToastContainer } from "react-toastify";


function App() {
  const events = [
    {
      id: 1,
      name: "Beach Party",
      price: 2000,
      location: "Kozhikode beach",
      description: "Experience an unforgettable beachside celebration filled with live music, cultural performances, delicious food stalls, fun games, and breathtaking sunset views. This all-out festival at Kozhikode Beach brings together music lovers, families, and travelers for a vibrant evening packed with entertainment, local art, and energetic performances.",
      image: "https://images.unsplash.com/photo-1560359614-870d1a7ea91d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 2,
      name: "Rock Band Concert",
      price: 2500,
      location: "kolkata",
      description: "Get ready for an electrifying night of loud guitars, powerful vocals, and unforgettable energy at this massive rock band concert in Kolkata. Featuring popular bands, dazzling stage effects, food courts, and a crowd full of music lovers, this event promises a thrilling live music experience for every rock fan.",
      image: "https://images.unsplash.com/photo-1603190287605-e6ade32fa852?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 3,
      name: "College Cultural Fest",
      price: 1000,
      location: "Erode",
      description: "Join one of the most exciting college festivals in Erode featuring dance battles, music performances, gaming competitions, cultural programs, workshops, and celebrity appearances. A perfect event for students to showcase talent, make memories, and enjoy a fun-filled campus atmosphere.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 4,
      name: "Youtuber Meetup",
      price: 5000,
      location: "Chennai",
      description: "Meet your favorite content creators and influencers at this exciting YouTuber meet-up in Chennai. Enjoy live Q&A sessions, fan interactions, creator panels, games, exclusive merchandise, photo opportunities, and entertainment performances in an energetic and engaging environment.",
      image: "https://images.unsplash.com/photo-1759701547797-15ee208edc40?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 5,
      name: "ComiCon kochi",
      price: 1300,
      location: "Kochi",
      description: "Step into the ultimate world of comics, anime, gaming, cosplay, and pop culture at Comi-Con Kerala in Kochi. Featuring cosplay competitions, artist booths, gaming zones, comic exhibitions, celebrity guests, and fan meet-ups, this event is a paradise for every geek and pop culture enthusiast.",
      image: "https://images.unsplash.com/photo-1697480157582-43d68447f959?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 6,
      name: "ISL KBFC vs FCMB",
      price: 3000,
      location: "New Delhi",
      description: "Witness an intense football showdown in New Delhi featuring top teams, roaring crowds, energetic chants, and an electrifying stadium atmosphere. Enjoy live entertainment, food courts, fan activities, and the thrill of professional football action in one unforgettable sporting experience.",
      image: "https://plus.unsplash.com/premium_photo-1733313613724-3ea5f9eec5ca?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ]

  const [cartitems, setCartitems] =useState(0)
  return (
    <>
      <BrowserRouter>
        <Navigationbar cartitems={cartitems}/>
        <ToastContainer position="top-right" autoClose={2000} />
        <Routes>

          <Route path="/" element={<Home events={events} />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/Evn" element={<Eventpage events={events}/>} />
          <Route path="/eventdetails/:id" element={<Eventdetails 
          events ={events}
          setCartitems ={setCartitems}
          cartitems ={cartitems}
          />} />
          <Route path="/login" element={<Loginpage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/deals" element={<Deals />} />
        </Routes>
        <Footer />
      </BrowserRouter>


    </>
  )
}
export default App;