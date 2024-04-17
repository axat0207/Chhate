import { Tooltip } from "@material-tailwind/react";
import React, { memo, useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { IoAdd, IoMenu } from "react-icons/io5";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Drawer,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Avatar from "../components/shared/Avatar";
import { sampleChats, sampleMessage } from "../constants/sampleData";
import { MdCancel, MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import UserList from "../components/specific/UserList";
import SearchDialog from "../components/specific/Search";
import useSearchDialogStore from "../store/SearchDialogStore";
import ConfirmDelete from "../components/dialog/ConfirmDelete";
import useGroupDeleteDialogStore from "../store/GroupDeleteDialogStore";
import useGroupAddMemberDialog from "../store/GroupAddMemberDialog";
import AddMember from "../components/dialog/AddMember";

const Groups = () => {
  const navigate = useNavigate();
  const chatId = useSearchParams()[0].get("group");
  const [isMobile, setIsMobile] = useState(false);
  const handleMobile = () => setIsMobile(!isMobile);
  const closeMobile = () => setIsMobile(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editedName, setEditedName] = useState("Group Name " + chatId);

  useEffect(() => {
    setEditedName("Group Name" + chatId);
    setIsEdit(false);
    return () => {
      setEditedName("");
      setIsEdit(false);
    };
  }, [chatId]);

  const { isDeleteDialog, toggleIsDeleteDialog } = useGroupDeleteDialogStore();
  const { isaddMemberDialog, toggleIsaddMemberDialog } =
    useGroupAddMemberDialog();

  return (
    <div className="">
      <div className="grid grid-cols-12 h-screen ">
        <div className="sm:col-span-3 sm:block hidden bg-white ">
          <div className="text-3xl flex mx-3 items-center my-3 font-bold">
            Groups
          </div>
          <GroupList chatId={chatId} mygrp={sampleChats} />
        </div>
        {chatId ? (
          <>
            {" "}
            <div className="sm:col-span-9 bg-gray-300 col-span-12 relative">
              <div className="flex justify-between">
                <Tooltip content="back" placement="bottom">
                  <div className="absolute top-2 left-2 rounded-full text-white p-1.5 bg-black opacity-80 hover:opacity-100 flex justify-center items-center">
                    <IoMdArrowBack onClick={() => navigate("/")} size={20} />
                  </div>
                </Tooltip>
                <Tooltip content="Menu" placement="bottom">
                  <div className="absolute sm:hidden top-1 right-0 p-1.5 flex justify-center items-center">
                    <IoMenu onClick={handleMobile} size={30} />
                  </div>
                </Tooltip>
              </div>
              <div className="flex gap-2 items-center mt-14">
                <div className="text-3xl ml-4">
                  {isEdit ? (
                    <div className="flex gap-3">
                      <input
                        value={editedName}
                        className="bg-gray-300 border border-gray-400 active:border-gray-500"
                        type="text"
                        onChange={(e) => setEditedName(e.target.value)}
                      />
                      <MdDone onClick={() => setIsEdit(false)} />
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      {editedName} <FaEdit onClick={() => setIsEdit(true)} />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center mt-6">
                <div className="bg-brown-300 flex-col h-96 w-80  flex gap-3 px-4 pt-3 rounded-lg shadow-lg ">
                  {sampleChats.map((item, index) => {
                    return (
                      <>
                        <UserList key={index} user={item} />
                      </>
                    );
                  })}
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex gap-4 mt-6">
                    <Button
                      onClick={toggleIsaddMemberDialog}
                      variant="blue"
                      className="flex items-center gap-2 bg-blue-400 text-white"
                    >
                      <IoAdd size={20} />
                      Add Member
                    </Button>
                    <Button
                      onClick={toggleIsDeleteDialog}
                      variant="red"
                      className="flex items-center gap-2 bg-red-400 border-2 border-red-400 text-white"
                    >
                      <MdDelete size={20} />
                      Delete Group
                    </Button>
                    {isDeleteDialog && <ConfirmDelete />}
                    {isaddMemberDialog && <AddMember />}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="sm:col-span-9 bg-gray-300 col-span-12 relative text-5xl flex justify-center pt-10 text-blue-400">
            Please select any group or create!!
          </div>
        )}

        <Drawer open={isMobile} onClose={closeMobile}>
          <div className="flex justify-between mx-2 items-center">
            <div className="text-3xl flex mx-3 items-center my-3 font-bold">
              Groups
            </div>
            <MdCancel onClick={closeMobile} size={25} />
          </div>

          <GroupList mygrp={sampleChats} />
        </Drawer>
      </div>
    </div>
  );
};

const GroupList = ({ mygrp, chatId, w = "100%" }) => {
  return (
    <div className="flex flex-col gap-3">
      {mygrp.map((group, index) => {
        return (
          <div key={index} className="">
            <GroupListItem chatId={chatId} mygroup={group} />
          </div>
        );
      })}
    </div>
  );
};

const GroupListItem = memo(({ mygroup, chatId }) => {
  const { avatar, name, _id } = mygroup;

  const sameSender = chatId === _id;

  return (
    <>
      <Link
        to={`?group=${_id}`}
        onClick={(e) => {
          if (chatId == _id) e.preventDefault();
        }}
        onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
        className="block"
      >
        <div
          className={`flex gap-4 items-center p-2 ${
            sameSender ? "bg-gray-300 text-white" : "bg-white text-black"
          }
        cursor-pointer 
        ${sameSender ? "" : "hover:bg-gray-100"}
         relative`}
        >
          {avatar && <Avatar avatar={avatar} />}
          <div className="flex flex-col">
            <div className="flex font-semibold items-center ">{name}</div>
            {/* {newMessagesAlert && newMessagesAlert.count > 0 && (
          <div className="  text-sm text-red-500 ">

            {newMessagesAlert.count} New Message
            {newMessagesAlert.count > 1 ? "s" : ""}
          </div>
        )} */}
          </div>
          {/* {isOnline && (
            <span className="absolute right-4 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></span> 
          )} */}
        </div>
      </Link>
    </>
  );
});

export default Groups;
