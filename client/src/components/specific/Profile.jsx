import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import moment from 'moment'

const Profile = (avatar) => {
  return (
    <div className="flex flex-col gap-10 justify-center mt-10 items-center">
      <div className="">
        <img
          className="rounded-full h-36 w-36"
          src="https://pbs.twimg.com/profile_images/1024551962291793926/Mfloojp1_400x400.jpg"
          alt="Lana Rodes"
        />
      </div>
      <div className="flex flex-col gap-6 items-center justify-center">
     
      <ProfileItem
        logo={CgProfile}
        heading={"Lana Rodes"}
        subHeading={"Big tits with rouned huge ass"}
      />
          <ProfileItem logo={MdOutlineAlternateEmail} heading={"lanarodes9192"} subHeading={"Username"}/>    
      <ProfileItem logo={FaCalendarAlt} heading={moment('2023-07-11T07:05:37.439Z').fromNow()} subHeading={"Joined"}/> 
      </div>
    </div>
  );
};

const ProfileItem = ({ logo, heading, subHeading }) => {
  return (
    <div className="flex">
      <div className="flex-col flex justify-center items-center">
        <div className="text-white flex items-center gap-2 text-xl font-semibold">
          {React.createElement(logo)}
          {heading}
        </div>
        <div className="text-gray-400 ">{subHeading}</div>
      </div>
    </div>
  );
};
export default Profile;
