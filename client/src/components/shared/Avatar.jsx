import React from "react";

const Avatar = (Avatar = [], max = 4) => {
  return (
    <div className="flex ">
      {Avatar.avatar.map((ava, index) => {
        return (
          <div
            key={ava}
            className=""
            style={{
              marginLeft: index === 0 ? "0" : "-25px",
            }}
          >
            <img
              key={ava}
              src={ava}
              alt="Chat Avatar"
              className="w-10 h-10 rounded-full"
            />
          </div>
        );
      })}
    </div>
  );
};

export default Avatar;
