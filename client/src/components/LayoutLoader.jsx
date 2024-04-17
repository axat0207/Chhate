import React from 'react'

const LayoutLoader = () => {
  return (
    <div>
        <div className="">

          <div className="w-full  bg-gray-200 mb-3  px-6 py-2 h-12"></div>
          <div className="grid w-full gap-5  grid-flow-col h-[100vh-10rem]">
            <div className="hidden w-full rounded-md  h-[90vh] md:grid bg-gray-200 md:grid-cols-3"></div>
            <div className="grid-cols-6 w-full mx-2 rounded-md h-[90vh] bg-gray-200"> </div>
            <div className=" hidden bg-gray-200 ml-4 w-full rounded-md h-[90vh] lg:grid grid-cols-3"></div>
          
          </div>
        </div>
      
    </div>
  )
}

export default LayoutLoader
