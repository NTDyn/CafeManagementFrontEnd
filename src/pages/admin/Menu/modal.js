import React, { useState, useEffect } from "react"
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';

export default function ModalMenu(props) {
    const [menuName, setMenuName] = useState(props.data.menuName);
    const handleClickButtonConfirm = () => {
        let data = {};
        props.update(data);
    }
    return (
        <React.Fragment>
            <Modal open={props.openModal}>
                <ModalDialog>
                    <DialogTitle>Create new</DialogTitle>
                    <DialogContent>Fill in the information.</DialogContent>
                    <form
                    // onSubmit={}
                    >
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    autoFocus
                                    required
                                    name="menuName"
                                    value={menuName}
                                    placeholder="Nhập tên Menu"
                                    onChange={(e) => {
                                        setMenuName(e.target.value);
                                    }}
                                />
                            </FormControl>

                            <Button
                                type="submit"

                            >
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
