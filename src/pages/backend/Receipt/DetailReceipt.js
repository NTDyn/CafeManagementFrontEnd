import { getImportDetail, getInitialData, updateData } from "../../../redux/actions/supplier";
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import Grid from '@mui/material/Grid2';
// import { Box } from "@mui/material";
import { getDetailReceipt } from "../../../redux/actions/supplier";
import { Modal, Box, Typography, Table, TableBody, TableCell, ableContainer, TableHead, TableRow, Paper, Button, TableContainer } from "@mui/material";
function DetailReceipt({ onUpdate,receiptId}) {
  const [open, setOpen] = useState(false);


  const handleClose = () => setOpen(false);

 
 const [detailReceipt,setReceiptDetail]=useState([]);
  const [getStaff, setStaff] = useState({})
  // const [getStaffByUserName,setStaffByUerName]=useState({})


  const handleOpen = async () => {

    setOpen(true);
    const res=await getDetailReceipt(receiptId);
    setReceiptDetail(res.data.data);


  }




  const HandleDeny = async () => {
    
    onUpdate();

  }
  const HandleApprove = async () => {
  
    onUpdate();
  }

  const confirmApproveSwal = (e) => {
    withReactContent(Swal).fire({
      title: "Do you want to approve this request?",
      showDenyButton: true,
      confirmButtonText: "Change",
      denyButtonText: `Cancel`
    }).then((result) => {
      if (result.isConfirmed) {

        HandleApprove();
        handleClose();

        Swal.fire("Successfully", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }

    })
  }



   


  


  const theme = createTheme({
    palette: {
      primary: {
        light: blue[300],
        main: blue[500],
        dark: blue[700],
        darker: blue[900],
      },
    },
  });


  return (
    <  >
      <React.Fragment>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Grid container spacing={2} justifyContent="center">
            <Grid xs={3}>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <Button
                  sx={{
                    width: '80px',
                    bgcolor: '#23a736',
                  }}
                  onClick={() => confirmApproveSwal()}
                >
                  Approve
                </Button>
                <Button
                  sx={{
                    width: '80px',
                    bgcolor: '#23a736',
                  }}
                
                >
                  Deny
                </Button>
              </Box>
            </Grid>

            <Grid xs={3}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  sx={
                    { width: '80px', bgcolor: '#185ea5' }
                  }
                  onClick={() => handleOpen()}
                >
                  Detail
                </Button>
              </Box>
            </Grid>
          </Grid>
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
            {/* Product Details */}
            {/* <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Customer Information
            </Typography> */}
            {/* <TableContainer component={Paper} sx={{ mb: 2 }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Supplier</TableCell>
                    <TableCell></TableCell>
                    <TableCell>WareHouse</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Price (VND)</TableCell>
                    <TableCell></TableCell>
                    <TableCell>Staff</TableCell>
                    <TableCell>{getStaff?.staff_FullName}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer> */}

            {/* Ingredients Table */}
            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
              Receipt Detail 
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
        
                    <TableCell>Product Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {detailReceipt?.map((detail, index) =>

                  (



                    <TableRow key={index}>

                      <TableCell>{detail.productName}</TableCell>
                      <TableCell>{detail.quantity}</TableCell>
                      <TableCell>{detail.price}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
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
