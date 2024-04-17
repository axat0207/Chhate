import React, { useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { useParams } from "react-router-dom";
import { IoIosAttach } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { Button } from "@material-tailwind/react";
import ChatContent from "../components/specific/ChatContent";
import { sampleMessage } from "../constants/sampleData";

const Chat = () => {
  const { chatId } = useParams();
  const [isFileMenu, setIsFileMenu] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // Make sure this state is declared


  const handleFileOpen = () => {
    setIsFileMenu(!isFileMenu);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFileMenu(false); // Close the file menu after file selection
    // Implement file upload logic here
  };
  const User = {
    _id: "9193",
    name: "Akshat",
  };
  
  // const created_at = new Date().toISOString();
  return (
    <div className="flex flex-col h-[93vh]">

      <div className="flex-grow flex-col  overflow-auto p-4">
        {sampleMessage.map((chat, index) => {
          return (
            <div className="flex flex-col gap-y-10 mb-5">
              <ChatContent key={index} chat={chat} user={User} />
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center  flex-grow ">
        <div className="flex  cursor-pointer relative items-center">
          <IoIosAttach
            onClick={handleFileOpen}
            size={35}
            className="p-2 flex justify-center items-center "
          />
          {isFileMenu && (
            <div className="origin-top-left absolute left-3 bottom-0 mb-12 bg-white shadow-lg rounded-xl p-3">
              <ul className="list-none">
                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                  Photos & Videos
                </li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer">Camera</li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                  Document
                </li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                  Contact
                </li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer">Poll</li>
              </ul>
            </div>
          )}
        </div>

        <div className="w-full border-2 border-gray-300">
          <input
            placeholder="Type Message Here..."
            className="w-full bg-gray-200 rounded-r-full border-none px-20 pl-36 py-2 "
            type="text"
          />
        </div>
        <Button className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-400 p-2">
          <IoSend size={18} className="-rotate-45" />
        </Button>
      </div>
    </div>
  );
};

export default AppLayout(Chat);
