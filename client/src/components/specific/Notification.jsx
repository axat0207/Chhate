import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { sampleChats } from "../../constants/sampleData";
import useNotificationDialogStore from "../../store/NotificationDialogStore";

const Notification = (newUsers = []) => {  
  const {isNotification ,toggleIsNotification} = useNotificationDialogStore();
  return (
    <>
      {isNotification && (
      <div
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
        aria-hidden="true"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 ">
                Conection Requests
              </h3>
              <button
                onClick={toggleIsNotification}
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7L1 13"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5">
              <div className="flex flex-col gap-4 ">
                {sampleChats.map((user, index)=>{
                  return(
                    <>
                    <div key={index}>
                      <Request avatar={user.avatar[0]}  name={user.name} />
                    </div>
                    </>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
       )} 
    </>
  );
};

const Request = ({avatar, name}) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex  items-center justify-between">
          <div className="flex gap-3">
            {" "}
            <img
              className="rounded-full h-7 w-7"
              src={avatar}
              alt="alxy tsr"
            />{" "}
            <div className="font-semibold">{name}</div>
          </div>

          <div className="flex gap-4">
            <div className="text-sm text-blue-400 border rounded-md px-2 hover:bg-gray-50 transition-all  py-1 cursor-pointer">
              Accept
            </div>
            <div className="text-sm text-red-400 border rounded-md px-2 py-1 hover:bg-gray-50 transition-all  cursor-pointer">
              Reject
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
