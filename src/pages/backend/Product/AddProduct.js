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
import { useDispatch, useSelector } from "react-redux";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AddProduct() {
    const [open, setOpen] = useState(false);
    const top100Films = [
        {
            label: "f1",
            id: 1
        },
        {
            label: "f2",
            id: 2
        }
    ]
    return (
        <>
            <Stack
                direction="row"
                justifyContent="end"
            >
                <Button

                    variant="outlined"
                    color="neutral"
                    startDecorator={<Add />}
                    onClick={() => setOpen(true)}
                >
                    Add Product
                </Button>
            </Stack>


            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog>
                    <DialogTitle>Add a product</DialogTitle>
                    <DialogContent>Fill in the information.</DialogContent>
                    <form
                    // onSubmit={confirmChangeNameSwal}
                    >
                        <Stack spacing={2}>
                            <FormControl>
                                <Stack
                                    direction="row"
                                    spacing={4}
                                >
                                    <Stack>
                                        <FormLabel>Name</FormLabel>
                                        <Input
                                            autoFocus
                                            required
                                            name="nameCategory"
                                        // value={categoryName}
                                        //onChange={(e) => setNameChange(e.target.value)}
                                        />
                                    </Stack>
                                    <Stack>
                                        <FormLabel>Category</FormLabel>
                                        <Autocomplete
                                            disablePortal
                                            options={top100Films}
                                            sx={{ width: 300 }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Stack>

                                </Stack>


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
        </>
    )
}