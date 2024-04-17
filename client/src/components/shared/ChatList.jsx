import React from "react";
import ChatItem from "../ChatItem";

const ChatList = ({
  w = "full",
  chats,
  chatId,
  onlineUsers = [],
  newMessagesAlert = [],
  handleDeleteChat
}) => {
 
  return (
    <div className= 'chat-list w-full'>
      {chats.map((item) => {
        const { _id, name, groupChat, avatar, member } = item;
        const isOnline = member.includes(_id);
        const newMessageAlert = newMessagesAlert.find(({chatId}) => chatId === _id);
        return (
          <div key={_id}> 
            <ChatItem 
              _id={_id} 
              name={name} 
              groupChat={groupChat} 
              avatar={avatar} 
              sameSender={chatId === _id}
              isOnline={isOnline} 
              newMessagesAlert={newMessageAlert} 
              handleDeleteChat={handleDeleteChat}
            />
          </div>
        );
      })}
    </div>
  );
};



export default ChatList;
