import React, { useState, useEffect } from "react"
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../../../../redux/actions/staffGroup";
import Swal from 'sweetalert2'
import FormControl from '@mui/material/FormControl';
import PermissionSelector from "./PermissionSelector";
import { Container, Button } from "@mui/material";
import withReactContent from 'sweetalert2-react-content'

export default function AddStaffGroup({ dataPermission, dataStaffGroup }) {

    const [groupName, setGroupName] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedPermissions, setSelectedPermissions] = useState([]);

    const dispatch = useDispatch()

    function existingLevel() {

        return dataStaffGroup.find(
            data => data.staffGroup_Name === groupName
        )
    };



    function handleSubmit(e) {
        e.preventDefault()

        if (existingLevel()) {
            Swal.fire("Group name is existing", "", "error");
            return;
        } else {

            confirmSwal()
        }
    }

    function addStaffGroup() {
        let data = {
            staffGroup_Name: groupName,
            permissions: selectedPermissions,
        }
        console.log(data)
        dispatch(addData(data));
    }


    function confirmSwal() {
        withReactContent(Swal).fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            if (result.isConfirmed) {
                handleClose()
                addStaffGroup()
                Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }

        })
    }

    function handleClose() {
        setGroupName("");
        setSelectedPermissions([])
        setOpen(false);
    };

    return (
        <React.Fragment>

            <Button
                variant="outlined"
                color="neutral"
                startIcon={<Add />}
                onClick={() => setOpen(true)}
            >
                Add Position
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog>
                    <DialogTitle>Add new position </DialogTitle>
                    <DialogContent>Fill in the information.</DialogContent>
                    <form
                        onSubmit={handleSubmit}
                    >
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>Name Position</FormLabel>
                                <Input
                                    autoFocus
                                    required
                                    name="nameGroup"
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                />
                            </FormControl>

                            <Container sx={{ mt: 5 }}>
                                <PermissionSelector
                                    dataPermission={dataPermission}
                                    selectedPermissions={selectedPermissions}
                                    onChange={setSelectedPermissions}
                                />
                            </Container>
                            <Button
                                type="submit"

                            >
                                Add Position
                            </Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
