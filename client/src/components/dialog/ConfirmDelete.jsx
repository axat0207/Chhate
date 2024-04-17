import React from 'react'
import useGroupDeleteDialogStore from '../../store/GroupDeleteDialogStore';
import useGroupAddMemberDialog from '../../store/GroupAddMemberDialog';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const ConfirmDelete = () => {
  const { isDeleteDialog, toggleIsDeleteDialog } = useGroupDeleteDialogStore();
  // const { isaddMemberDialog, toggleIsaddMemberDialog} = useGroupAddMemberDialog();
  // handleDeleteOpen()=>
  return (
    <div>
       <Dialog open={isDeleteDialog} handler={toggleIsDeleteDialog}>
                <DialogHeader>Confirm Delete!!</DialogHeader>
                <DialogBody>
                  Are you sure You want to Delete, Once deleted cannot be
                  recovered!!
                </DialogBody>
                <DialogFooter>
                  <Button
                    variant="text"
                    color="red"
                    onClick={toggleIsDeleteDialog}
                    className="mr-1"
                  >
                    <span>Cancel</span>
                  </Button>
                  <Button
                    className="bg-red-400"
                    variant="gradient"
                    color="red"
                    onClick={toggleIsDeleteDialog}
                  >
                    <span>Confirm</span>
                  </Button>
                </DialogFooter>
              </Dialog>
    </div>
  )
}

export default ConfirmDelete
