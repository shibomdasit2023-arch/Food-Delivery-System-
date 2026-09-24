import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOders/MyOrders'
import Profile from './pages/Profile/Profile'
import ChangePassword from "./pages/ChangePassword/ChangePassword"
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword"
import ResetPassword from "./pages/ResetPassword/ResetPassword";

const App = () => {

  const [showLogin, setShowLogin] = useState(false);

  // Search State
  const [search, setSearch] = useState("");

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className='app'>

        <Navbar
          setShowLogin={setShowLogin}
          search={search}
          setSearch={setSearch}
        />

        <Routes>

          <Route
            path='/'
            element={
              <Home
                search={search}
              />
            }
          />

          <Route path='/cart' element={<Cart />} />

          <Route path='/order' element={<PlaceOrder />} />

          <Route path='/verify' element={<Verify />} />

          <Route path='/myorders' element={<MyOrders />} />

          <Route path='/profile' element={<Profile />} />

          <Route path="/change-password" element={<ChangePassword/>} />

          <Route
    path="/forgot-password"
    element={<ForgotPassword />}
/>
          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />

        </Routes>

      </div>

      <Footer />

    </>
  )
}

export default App