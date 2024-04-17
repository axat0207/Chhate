import React, { memo } from "react";
import { Link } from "react-router-dom";
import Avatar from "./shared/Avatar";

const ChatItem = ({
  avatar,
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessagesAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
      className="block"
    >
      <div
        className={`flex gap-4 items-center p-2 ${
          sameSender ? "bg-gray-300 text-white" : "bg-white text-black"
        }
        cursor-pointer 
        ${
          sameSender ? "" : "hover:bg-gray-100"
        }
         relative`}
      >
        {avatar && (
          <Avatar avatar={avatar}/>
        )}
        <div className="flex flex-col">
        <div className="flex font-semibold items-center ">
          {name}
          
        </div>
        {newMessagesAlert && newMessagesAlert.count > 0 && (
          <div className="  text-sm text-red-500 ">

            {newMessagesAlert.count} New Message
            {newMessagesAlert.count > 1 ? "s" : ""}
          </div>
        )}
        </div>
        {isOnline && (
            <span className="absolute right-4 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></span> 
          )}
      </div>
    </Link>
  );
};

export default memo(ChatItem);
