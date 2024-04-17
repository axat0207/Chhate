import React, { useState } from "react";
import { Drawer, Button } from "@material-tailwind/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { FaUser, FaUserCog } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard, MdGroups, MdLogout } from "react-icons/md";
import { IoChatbox } from "react-icons/io5";
const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  const handleMobileClose = () => {
    setIsMobile(false);
  };
  const handleMobileOpen = () => {
    setIsMobile(true);
  };
  const handleToggleMobile = () => {
    setIsMobile(!isMobile);
  };

  const SidebarItem = [
    {
      path: "/admin/dashboard",
      title: "Dashboard",
      logo: <MdDashboard />,
    },
    {
      path: "/admin/user-management",
      title: "User",
      logo: <FaUser />,
    },
    {
      path: "/admin/chats-management",
      title: "Chats",
      logo: <IoChatbox />,
    },
    {
      path: "/admin/message",
      title: "message",
      logo: <MdGroups />,
    },
    {
        path : "/admin",
        title : "Logout",
        logo : <MdLogout />

    }
  ];

  return (
    <div className="grid sm:grid-cols-12 h-screen">
      <div className="hidden sm:grid sm:col-span-3">
        
        <div className="text-5xl font-serif text-blue-gray-500 flex justify-center mt-4 font-semibold">Admin</div>
        <div className="flex flex-col gap-5 items-center">
          
          {SidebarItem.map((item) => {
            return (
              <Link  key={item.path} to={item.path} className={`flex gap-3 items-center ${location.pathname === item.path && "bg-blue-gray-600 text-white px-6 py-2 rounded-full shadow-lg"} `}>
                {item.logo}
                <p className="">{item.title}</p>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="sm:col-span-9 col-span-12 w-full h-full bg-gray-200">
        {children}
      </div>
      <div className="sm:hidden flex absolute top-2 right-2">
        {!isMobile ? (
          <RxHamburgerMenu onClick={handleToggleMobile} />
        ) : (
          <IoMdClose onClick={handleToggleMobile} />
        )}
      </div>
      <Drawer open={isMobile} onClose={handleMobileClose}>
        <div className="flex text-3xl mt-2 justify-center">Admin</div>
        <div className="flex">
          <div className="flex flex-col gap-6  items-center w-full mt-10">
            {SidebarItem.map((item) => {
              return (
                <Link key={item.path} to={item.path} className=" flex   gap-2">
                  {item.logo}
                  <p className="">{item.title}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default AdminLayout;
