import { ChangeStatusReceipt, getImportDetail, getInitialData, updateData } from "../../../redux/actions/supplier";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
// import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
// import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import { HandleDeny } from "../../../redux/actions/supplier";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import Grid from '@mui/material/Grid2';
// import { Box } from "@mui/material";
import { getDetailReceipt } from "../../../redux/actions/supplier";
import { Modal, Box, Typography, Table, TableBody, TableCell, ableContainer, TableHead, TableRow, Paper, Button, TableContainer, TableFooter } from "@mui/material";
function DetailReceipt({ onUpdate, receipt, productData }) {
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);

    const [detailReceipt, setReceiptDetail] = useState(receipt?.details);

    const handleOpen = async () => {

        setOpen(true);
        setReceiptDetail(receipt.details);
    }

    const getProduct = (id) => {
        return productData.find(product => product.product_ID === id)
    }

    const formatCurrency = (number) => {
        return number.toLocaleString('vi-VN');
    }
    return (
        <  >
            <React.Fragment>
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            sx={
                                { width: '80px', bgcolor: '#185ea5', color: 'white' }
                            }
                            onClick={() => handleOpen()}
                        >
                            Detail
                        </Button>
                    </Box>


                </Stack>
            </React.Fragment>




            <div>

                <Modal open={open} onClose={handleClose}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 600,
                            bgcolor: "background.paper",
                            borderRadius: 2,
                            boxShadow: 24,
                            p: 4,
                        }}
                    >


                        {/* Ingredients Table */}
                        <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                            Receipt Detail
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>

                                        <TableCell sx={{ textAlign: 'center' }}>Product Name</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>Quantity</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {detailReceipt?.map((detail, index) =>

                                    (
                                        <TableRow key={index}>

                                            <TableCell sx={{ textAlign: 'center' }}>{getProduct(detail.product_ID)?.product_Name}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>{detail.quantity}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>{formatCurrency(detail.price)}</TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter sx={{ display: 'flex', justifyContent: 'end', margin: '2%' }}>Total: {formatCurrency(receipt.totalPrice.toLocaleString())} đ</TableFooter>
                            </Table>
                        </TableContainer>

                        {/* Close Button */}
                        <Box sx={{ textAlign: "center", mt: 3 }}>
                            <Button variant="contained" color="primary" onClick={handleClose}>
                                Close
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </div>
        </ >
    );
};




export default DetailReceipt;
