import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Groups from "./pages/Groups";


function App() {
  return (
    <>
      <div>
        <BrowserRouter>
            <Toaster/>
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/login" element={<Login />} /> 
            <Route path="/chat" element={<Chat />} /> 
            <Route path="/groups" element={<Groups />} /> 
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
