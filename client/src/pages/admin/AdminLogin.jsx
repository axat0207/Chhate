import React, { useState } from 'react'
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const [isPassword, setIsPassword] = useState(false);
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handlelogin = ()=>{
    navigate('/admin/dashboard')    
  }
  return (
  
    <div>
         <div className="h-screen flex justify-center  items-center">
      <div className="border-2 p-10  rounded-lg  shadow-xl flex-col">
        
          <div className="flex flex-col gap-4">
            <div className="text-3xl font-semibold">Login to Admin Dashboard</div>
           
            <div className="relative">
              <input
                placeholder="Secret Key"
                className="border w-full px-2 py-1 active:border-blue-500 border-gray-500 rounded-lg"
                type={isPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              {isEyeOpen ? (
                <RiEyeFill
                  onClick={() => {
                    setIsEyeOpen(!isEyeOpen);
                    setIsPassword(!isPassword);
                  }}
                  className="absolute top-2 right-3  cursor-pointer"
                />
              ) : (
                <RiEyeCloseFill
                  onClick={() => {
                    setIsEyeOpen(!isEyeOpen);
                    setIsPassword(!isPassword);
                  }}
                  className="absolute top-2 right-3  cursor-pointer"
                />
              )}
            </div>
            <div
              onClick={handlelogin}
              className="border px-3 py-2 text-center w-full rounded-lg bg-blue-500 hover:bg-blue-600 text-white  shadow-lg "
            >
              login as Admin
            </div>
          
          
          </div>
        
      
      </div>
    </div>
      
    </div>
  )
}

export default AdminLogin
