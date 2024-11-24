import Button from '@mui/joy/Button';
import Grid from '@mui/material/Grid2';
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import TextField from '@mui/material/TextField';


function DetailProduct({ product }) {
    const [openDetail, setOpenDetail] = useState(false);
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    sx={{ width: '80px', bgcolor: '#a79c9c' }}
                    onClick={() => setOpenDetail(true)}
                >
                    Detail
                </Button>
            </Box>
        </>
    )
}

export default DetailProduct;