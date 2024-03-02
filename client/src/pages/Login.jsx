import React, { useState } from "react";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
const endpoint = 'http://localhost:9999/api/v1'
const Login = () => {
    const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isPassword, setIsPassword] = useState(false);
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const login = async()=>{
    try {
      
      const loginData = {email, password};
      const response = await axios.post(endpoint+'/user/login', loginData);
      toast.success("Welcome "+ email);
      
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
    
    
  }
  const Register = async()=>{
    try {
      console.log(fullName + userName + email + password);
      const registerdata = {fullName,username:userName, email, password};
      const response = await axios.post(endpoint + '/user/register', registerdata);
      
      toast.success('Welcome '+ fullName);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      console.log(error)
    }
  }
  return (
    <div className="h-screen flex justify-center  items-center">
      <div className="border-2 p-10  rounded-lg w-1/4 shadow-xl flex-col">
        {isLogin && (
          <div className="flex flex-col gap-4">
            <div className="text-3xl font-semibold">Login to chattu</div>
            <input
              placeholder="username or Email"
              className="border w-full px-2 py-1 active:border-blue-500 border-gray-500 rounded-lg"
              type="text"
              onChange={(e)=>setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                placeholder="password"
                className="border w-full px-2 py-1 active:border-blue-500 border-gray-500 rounded-lg"
                type={isPassword ? "text" : "password"}
                onChange={(e)=>setPassword(e.target.value)}
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
            <div onClick={login} className="border px-3 py-2 text-center w-full rounded-lg bg-blue-500 hover:bg-blue-600 text-white  shadow-lg ">
              login
            </div>
            <button className="text-sm text-gray-400" onClick={() => setIsLogin(false)}>
              Create a account? Register.
            </button>
          </div>
        )}
        {!isLogin && (
          <div className="flex flex-col gap-4">
            <div className="text-3xl font-semibold">Register to chattu</div>
            <input
              placeholder="Full Name"
              className="border w-full px-2 py-1 active:border-blue-500 border-gray-500 rounded-lg"
              type="text"
              onChange={(e)=>setFullName(e.target.value)}
            />
            <input
              placeholder="username"
              className="border w-full px-2 py-1 active:border-blue-500 border-gray-500 rounded-lg"
              type="text"
              onChange={(e)=>setUserName(e.target.value)}
            />
            <input
              placeholder="Email"
              className="border w-full px-2 py-1 active:border-blue-500 border-gray-500 rounded-lg"
              type="text"
              onChange={(e)=>setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                placeholder="password"
                className="border w-full px-2 py-1 active:border-blue-500 border-gray-500 rounded-lg"
                type={isPassword ? "text" : "password"}
                onChange={(e)=>setPassword(e.target.value)}
              />
              {isEyeOpen ? (
                <RiEyeFill
                  onClick={() => {
                    setIsEyeOpen(!isEyeOpen);
                    setIsPassword(!isPassword);
                  }}
                  className="absolute top-2 right-3 cursor-pointer"
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
            <div onClick={Register} className="border px-3 py-2 text-center w-full rounded-lg bg-blue-500 hover:bg-blue-600 text-white  shadow-lg ">
              Register
            </div>
            <button className="text-sm text-gray-400" onClick={() => setIsLogin(true)}>
              Already a User? Login.
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
