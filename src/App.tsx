import { Routes, Route } from "react-router-dom";
import {Component} from "react";
import { Container } from "react-bootstrap";
import { Homescreen } from "./pages/Homescreen";
import { Loginscreen } from "./pages/Loginscreen";
import { Navbar } from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import './App.css';
import { Registerscreen } from "./pages/Registerscreen";
import { Navigation } from "./components/Navigation";
import { Statements } from "./pages/Statements";
import { TicketPurchased } from "./pages/TicketPurchased";
import { TicketPurchasedProvider } from "./context/TicketPurchasedContext";
import { MyProfile } from "./pages/MyProfile";
function App() {
  

  return (
    <><ShoppingCartProvider>
      
      <div className="App">


        <div>


          <Navigation />
          <Container className="mb-4">
            <Routes>
              <Route path="/" element={<Loginscreen />} />
              <Route path="/home" element={<Homescreen />} />
              <Route path="/login" element={<Loginscreen />} />
              <Route path="/register" element={<Registerscreen />} />
              <Route path="/profile" element={<MyProfile/>}/>
              <Route path="/statements" element={<Statements />} />

             
            </Routes>
          </Container>
        </div>
      </div>
      
    </ShoppingCartProvider></>
  
  )
}

export default App
