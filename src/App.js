import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AddChannel from './pages/AddChannel';
import { ToastContainer } from "react-toastify";
import Channel from './pages/Channel';
import EditChannel from './pages/EditChannel';
const App =()=>{
   
  return(
          <>
          <ToastContainer />
          <Routes>
              <Route path ="/" element={<Home/>}/>
              <Route path ="/channel" element={<Channel/>}/>
              <Route path ="/edit-channel/:id" element={<EditChannel/>}/>


              <Route path="/add-channel" element={<AddChannel/>} />
          </Routes>
        
         
        </>);
}

export default App;
