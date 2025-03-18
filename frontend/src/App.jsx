import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import ApiHealthCheck from "./components/ApiHealthCheck";

const App = () => {
  
  const [showLogin, setshowLogin] = useState(false);
  const [showApiHealth, setShowApiHealth] = useState(true);

  return (
    <>
      {showLogin && <LoginPopup setshowLogin={setshowLogin}/>}
      <div className="app">
        <Navbar setshowLogin={setshowLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
      {showApiHealth && <ApiHealthCheck />}
      <div style={{ position: 'fixed', bottom: '10px', left: '10px', zIndex: 1000 }}>
        <button onClick={() => setShowApiHealth(!showApiHealth)}>
          {showApiHealth ? 'Hide' : 'Show'} API Status
        </button>
      </div>
    </>
  );
};

export default App;
