import React from 'react'
import {useNavigate} from 'react-router-dom';
const NotFound = () => {
    const  navigate = useNavigate();
  return (
    <div className='flex justify-center pt-20'>
      <span className="text-red-500 text-3xl font font-semibold">Page not found </span> 
      <span onClick={()=>navigate('/')} className="text-blue-500 text-3xl underline cursor-pointer font-bold mx-1"> Home</span>
    </div>
  )
}

export default NotFound;
