// import React from 'react';
import Header from "./Header";
import Notification from "../specific/Notification";
import ChatList from "../shared/ChatList";
import { sampleChats } from "../../constants/sampleData";
import { useParams } from "react-router-dom";
import React from "react";
import Profile from "../specific/Profile";
import useHandleChatMobileStore from "../../store/HandleChatMobileStore";
import { MdCancel } from "react-icons/md";
import { Drawer } from "@material-tailwind/react";
const AppLayout = (WrappedComponent) => {
  return (props) => {
    const { chatId } = useParams();
    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log(_id, groupChat);
    };
    const { isMobile, toggleIsMobile, closeIsMobile } =
      useHandleChatMobileStore();
    return (
      <div>
        <Drawer open={isMobile} onClose={closeIsMobile}>
          <div className="flex flex-col">
            <div className="flex justify-between mx-2 items-center">
              <div className="text-3xl flex  items-center my-3 font-bold">
                Groups
              </div>
              <MdCancel onClick={closeIsMobile} size={25} />
            </div>
            <div className="">
              <ChatList
                
                chats={sampleChats}
                chatId={chatId}
                newMessagesAlert={[{ chatId, count: 4 }]}
                handleDeleteChat={handleDeleteChat}
              />
            </div>
          </div>
        </Drawer>
        <div className="min-h-screen">
          <Header />
          {/* <Notification /> */}
          <div className="grid grid-flow-col h-[93vh]  md:grid-cols-12 ">
            <div className="md:col-span-3 lg:col-span-3 hidden md:block">
              <ChatList
                w="full"
                chats={sampleChats}
                chatId={chatId}
                newMessagesAlert={[{ chatId, count: 4 }]}
                handleDeleteChat={handleDeleteChat}
              />
            </div>
            <div className="w-full col-span-9 lg:col-span-6 bg-gray-200">
              <WrappedComponent {...props} />
            </div>
            <div className="col-span-3 bg-gray-600 hidden lg:block h-full">
              <Profile />
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default AppLayout;
