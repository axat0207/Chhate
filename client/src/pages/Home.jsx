import React from 'react'
import AppLayout from '../components/layout/AppLayout'
  
const Home = () => {
  return (
    <div className='flex flex-col mt-10 mx-8'>
      <div className="text-5xl text-blue-600 font-bold">Welcome to WisperWave!!</div>
      <div className="text-xl mt-4 mx-2">
      Connect with you friend, Chat, Share and make Groups...     </div>
      <div className="mx-3 p-2 ">Open Chats</div>
    </div>
  )
}

export default AppLayout(Home);
