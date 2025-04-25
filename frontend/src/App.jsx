import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Verify from "./pages/Verify";
import Footer from "./components/Footer";
import { useState } from "react";
import LoginPopup from "./components/LoginPopup";
import MyOrders from "./pages/MyOrders";
import Reward from "./pages/Reward";

const App = () => {

  const [showLogin, setShowLogin] = useState(false);
  
  return (
    <div>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <></>}
      <div className="w-[80%] m-auto">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart setShowLogin={setShowLogin}/>} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myOrders" element={<MyOrders />} />
          <Route path="/reward" element={<Reward />}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App
