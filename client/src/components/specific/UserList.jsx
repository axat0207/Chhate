import React from "react";
import Avatar from "../shared/Avatar";
import { FaPlus } from "react-icons/fa";

const UserList = (user, style) => {
  return (
    <div className="flex gap-3 cursor-pointer">
      <div className="flex justify-between w-full">
        <div className="flex gap-3">
          <img
            className="rounded-full h-6 w-6 "
            src={user.user.avatar[0]}
            alt=""
          />
          <div className="text-black font-medium">{user.user.name}</div>
        </div>
        <div className="bg-blue-400 text-white text-2xl pb-2  flex justify-center  w-8 h-8 items-center  pt-2 rounded-full">
          <FaPlus size={16}/>
        </div>
      </div>
    </div>
  );
};

export default UserList;


