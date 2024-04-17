import moment from 'moment'
import React, { memo } from 'react'
// import fileFormat from '../../lib/features';
import RenderAttachment from '../shared/RenderAttachment';

const ChatContent = ({chat, user}) => {
    const {sender, content, createdAt, attachments} = chat
    const date = moment(createdAt).fromNow();
    const sameSender = user._id == sender._id;
    const fileFormat = (url) => {    

        const fileExt = url.split(".").pop();

        if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg") {
            return "video";
        }
        if (fileExt === "mp3" || fileExt === "wav") {
            return "audio";
        }
        if (fileExt === "png" || fileExt === "jpg" || fileExt === "jpeg" || fileExt === "gif") {
            return "image";
        }
        return "file";
        
    }
// console.log(chat)
  return (
    <div className={`flex  ${sameSender ? "justify-end" : "justify-start"}`}>
               
        <div className={`bg-white  flex  flex-col p-3  shadow-lg rounded-md w-fit`}>
        {attachments.length > 0 && attachments.map((attach, index)=>{
            // console.log(JSON.stringify(attach.url))
            const url = attach.url
            const file = fileFormat(url);
            return(
                <div key={index}>
                    <a href={url} target='_blank' download >
                        <RenderAttachment file={file} url={url} />
                    </a>
                </div>
            )
        })}
            <div className="font-semibold mt-1 text-xs text-blue-600">{sameSender ? "You" : sender.name}</div> 
            <div className="leading-tight w-[200px] mt-1">{content}</div>
            <div className="flex text-xs  text-gray-400 items-end mt-1">{date}</div>
        </div> 

    </div>
  )
}

export default memo(ChatContent) 
