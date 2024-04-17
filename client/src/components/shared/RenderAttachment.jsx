import React from "react";
import { MdFileOpen } from "react-icons/md";


const RenderAttachment = ({ file, url }) => {
    // console.log(file+url)
  switch (file) {
    case "image":
      return <img src={url} alt="attachment" width={"200px"} height={"150px"} style={{objectFit:"contain"}}/>;
      
    case "video":
      return <video src={url} preload="none" width={"200px"} controls  />;
      
    case "audio":
      return <audio src={url} preload="none" controls />;
      
    default:
      return <MdFileOpen/>;
  }
};

export default RenderAttachment;
