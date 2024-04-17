import React from "react";
import AdminLayout from "./AdminLayout";
import { RiShieldUserFill } from "react-icons/ri";
import { Button } from "@material-tailwind/react";
import moment from "moment";
import { IoIosNotifications, IoIosPerson } from "react-icons/io";
import { HiUserGroup } from "react-icons/hi";
import { BsChatSquareText } from "react-icons/bs";
import { IoPeople } from "react-icons/io5";
import { LineChart, DoughnutChart } from "../../components/specific/Chart";

const AdminDashboard = () => {
  return (
    <div>
      <AdminLayout>
        <div className="bg-white h-full">
          <div className="rounded-xl shadow-md border-2 flex flex-col py-6 sm:flex-row justify-center items-center gap-10 p-4 md:p-10">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-10">
              <div className="">
                <RiShieldUserFill size={40} />
              </div>
              <input
                className="rounded-lg border-none bg-gray-200 p-2 md:p-4"
                type="text"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-10 mb-4 md:mb-0">
              <Button className="text-white">Anything</Button>
              <div className="flex items-center">
                {moment().format("MMM Do YYYY")}
              </div>
              <IoIosNotifications size={30} />
            </div>
          </div>
          <div className="flex flex-wrap  justify-around p-4">
            <div className="rounded-xl px-10 border-2 shadow-xl flex flex-col justify-center items-center gap w-fit">
              <div className="text-2xl md:text-3xl font-semibold">Last Message</div>
              <div className="text-lg md:text-xl ">
                <LineChart values={[23, 45, 21, 89, 32, 76, 56]} />
              </div>
            </div>
            <div className="rounded-xl border-2 px-10 shadow-xl flex flex-col py-6 justify-center items-center gap w-fit">
              <div className="text-2xl md:text-3xl font-semibold">
                <DoughnutChart
                  labels={["Single Chats", "Group Chats"]}
                  values={[26, 36]}
                />
              </div>
              <div className="text-lg md:text-xl flex items-center gap-3">
                <IoIosPerson /> vs <HiUserGroup />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap  justify-around p-4">
            <Widgets value={10} icon={<IoIosPerson />} title={"User"} />
            <Widgets value={10} title={"Chats"} icon={<IoPeople />} />
            <Widgets value={25} icon={<BsChatSquareText />} title={"Messages"} />
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};

const Widgets = ({ title, value, icon }) => {
  return (
    <div className="flex justify-between gap-2 flex-col border-2  items-center shadow-md rounded-xl p-4 md:p-10 m-2">
      <div className="border-4 border-black px-4 py-3  md:p-3 rounded-full  flex justify-start items-center  text-lg md:text-xl">{value}</div>
      <div className="flex gap-2 items-center justify-center">
        <div className="text-lg md:text-xl">{icon}</div> 
        <div className="font-semibold underline text-base md:text-lg">{title}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
