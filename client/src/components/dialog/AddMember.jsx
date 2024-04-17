import React from "react";
import useGroupAddMemberDialog from "../../store/GroupAddMemberDialog";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { sampleChats } from "../../constants/sampleData";
import UserList from "../specific/UserList";
const AddMember = () => {
  const { isaddMemberDialog, toggleIsaddMemberDialog } =
    useGroupAddMemberDialog();

  return (
    <div>
      <Dialog open={isaddMemberDialog} handler={toggleIsaddMemberDialog}>
        <DialogHeader>Add Member</DialogHeader>
        <DialogBody>
          <div className="flex flex-col">
            <div className="text-xl font-medium mb-4"> Please Select Member to add in the Group.</div>
            <div className="flex flex-col gap-2 m">
                {sampleChats.map((member,index)=>{
                    return(
                        <div  className="">
                            <UserList  user= {{...member}} key={index} />
                            
                        </div>
                    )
                })}
                
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={toggleIsaddMemberDialog}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            className="bg-blue-400"
            variant="gradient"
            color="blue"
            onClick={toggleIsaddMemberDialog}
          >
            <span>Confirm Changes</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default AddMember;
