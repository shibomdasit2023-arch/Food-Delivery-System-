import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/add'
import List from './pages/List/list'
import Orders from './pages/Orders/Orders'
import Edit from './pages/Edit/Edit'
import Dashboard from "./pages/Dashboard/Dashboard"
import Analytics from "./pages/Analytics/Analytics";
 import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const App = () => {


  const url= "https://food-delivery-system-eight-gamma.vercel.app"

  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard url={url} />} />
          <Route path='/add' element={<Add url={url}/>}/>
          <Route path='/list' element={<List url={url}/>}/>
          <Route path='/orders' element={<Orders url={url}/>}/>
          <Route path='/edit/:id' element={<Edit url={url}/>}/>
          <Route path="/analytics" element={<Analytics url={url} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
