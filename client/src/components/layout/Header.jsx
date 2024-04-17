import React, { Suspense, lazy, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { RiGroupFill } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import useSearchDialogStore from "../../store/SearchDialogStore";
import useNotificationDialogStore from "../../store/NotificationDialogStore";
import useGroupDialogStore from "../../store/GroupDialogStore";
import { Tooltip } from "@material-tailwind/react";
const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationDialog = lazy(() => import("../specific/Notification"));
const GroupDialog = lazy(() => import("../specific/Group"));
import { GiHamburgerMenu } from "react-icons/gi";
import useHandleChatMobileStore from "../../store/HandleChatMobileStore";

const Header = () => {
  const navigate = useNavigate();

  const { openIsMobile } = useHandleChatMobileStore();
  const { isSearch, toggleSearch } = useSearchDialogStore();
  const { isNotification, toggleIsNotification } = useNotificationDialogStore();
  const { isGroup, toggleGroup } = useGroupDialogStore();

  const handleSearch = () => {
    toggleSearch();
  };
  const handleGroup = () => {
    toggleGroup();
  };
  const handleNotification = () => {
    toggleIsNotification();
  };
  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="w-full flex items-center justify-between bg-blue-400 shadow-lg rounded-b-sm sm:px-6 px-4 py-2 text-white">
        <div className="text-white flex gap-2 md:gap-10 items-center cursor-pointer text-2xl font-semibold">
          <div className="md:hidden flex ">
            <GiHamburgerMenu onClick={openIsMobile} />
          </div>
          <Link to="/" className="">
            WhisperWave
          </Link>
        </div>
        <div className="flex items-center gap-3 sm:gap-6">
          <div onClick={handleSearch} className="">
            <Tooltip content="Search" placement="bottom">
              <div className="">
                <FaSearch size={20} />
              </div>
            </Tooltip>
          </div>
          <div onClick={handleGroup} className="">
            <Tooltip content="Add to group" placement="bottom">
              <div className="">
                <FaPlus size={20} />
              </div>
            </Tooltip>
          </div>
          <div onClick={() => navigate("/groups")} className="">
            <Tooltip content="Groups" placement="bottom">
              <div className="">
                <RiGroupFill size={20} />
              </div>
            </Tooltip>
          </div>
          <div onClick={handleNotification} className="">
            <Tooltip content="Notifications" placement="bottom">
              <div className="">
                <IoIosNotifications size={20} />
              </div>
            </Tooltip>
          </div>
          <div onClick={handleLogout} className="">
            <Tooltip content="logout" placement="bottom">
              <div>
                <FiLogOut size={20} />
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
      {isSearch && (
        <Suspense fallback={"Loading..."}>
          <SearchDialog title={"Find Members"} />
        </Suspense>
      )}
      {isGroup && (
        <Suspense fallback={"Loading..."}>
          <GroupDialog />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={"Loading..."}>
          <NotificationDialog />
        </Suspense>
      )}
    </>
  );
};

export default Header;
