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
import { GetRequest } from "../../../redux/actions/supplier";
import { GetListRequestDetail } from "../../../redux/actions/supplier";
import { GetSupplierById } from "../../../redux/actions/supplier";
import { GetWareHouse } from "../../../redux/actions/supplier";
import { getIngredientId } from "../../../redux/actions/supplier";
import { GetStaffById } from "../../../redux/actions/supplier";
import { getStaffByUserName } from "../../../redux/actions/supplier";
import {Modal,  Box,Typography, Table,TableBody,TableCell,ableContainer,TableHead,TableRow,Paper,Button, TableContainer} from "@mui/material";
import { ChangeStatusRequest } from "../../../redux/actions/requestImport";
function UpdateSupplier({onUpdate, supplier_ID, supplier_Name, buttonLabel, isActive }) {
    const [open, setOpen] = useState(false);

   
    const handleClose = () => setOpen(false);

    const [getRequest,setRequest]=useState({});
    const [getListRequestDetail,setListRequestDetail]=useState([]);
    const [getSupplier,setSupplier]=useState({});
    const [getWareHouse,setWareHouse]=useState({});
    const [getStaff,setStaff]=useState({})
    const[getIngredient,setIngredient]=useState({})
    const [supplierName, setSupplierName] = useState(supplier_Name);
    const dataSupplier = useSelector(state => state.dataSupplier.data);
    const [getStaffByUserName,setStaffByUerName]=useState({})
    const [getImportDetal,setImportDetail]=useState([]);
    
    const handleOpen = async() => {
        const request=await GetRequest(supplier_ID);
        setRequest(request.data.data);
         const importDetail=await getImportDetail(supplier_ID);
         setImportDetail(importDetail.data.data);
        const supplier=await GetSupplierById(request.data.data.supplier_ID);
        setSupplier(supplier.data.data);
        const warehouse=await GetWareHouse(request.data.data.warehouse_ID);
        setWareHouse(warehouse.data.data);
        const staff=await  GetStaffById(request.data.data.staffRequest_ID);
        setStaff(staff.data.data);
        setOpen(true);
       
    }
    
    
   

    const HandleDeny=async()=>{
       const Data={
          id:supplier_ID,
          status:2,
          id_staff:0
        }
       const change= await ChangeStatusRequest(Data);
       onUpdate();

    }
    const HandleApprove=async()=>{
        const getUserName=sessionStorage.getItem("userName");
        const staff=await getStaffByUserName(getUserName);
        const Data={
            id:supplier_ID,
            status:1,
            id_staff:staff.data.data.staff_ID
        }

        const change=await ChangeStatusRequest(Data);
        onUpdate();
    }

    const confirmApproveSwal=(e)=>{
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

    const confirmDenyNameSwal = (e) => {
        // e.preventDefault()
   

        // }
        //  else if (existingSupplier()) {
        //     Swal.fire("Supplier name is existing");
    
            withReactContent(Swal).fire({
                title: "Do you want to deny this request?",
                showDenyButton: true,
                confirmButtonText: "Change",
                denyButtonText: `Cancel`
            }).then((result) => {
                if (result.isConfirmed) {
                    
                    HandleDeny();
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
                                onClick={()=>confirmApproveSwal()}
                            >
                                Approve
                            </Button>
                            <Button
                                sx={{
                                    width: '80px',
                                    bgcolor: '#23a736',
                                }}
                                onClick={()=>confirmDenyNameSwal()}
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
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Product Details
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Supplier</TableCell>
                  <TableCell>{getSupplier?.supplier_Name}</TableCell>
                  <TableCell>WareHouse</TableCell>
                  <TableCell>{getWareHouse?.wareHouse_Name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Price (VND)</TableCell>
                  <TableCell>{getRequest.totalPrice}</TableCell>
                  <TableCell>Staff</TableCell>
                  <TableCell>{getStaff?.staff_FullName}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Ingredients Table */}
          <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
            Ingredients
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ingredient</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Unit</TableCell>
                  <TableCell>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getImportDetal.map((ingredient, index) =>
                 
                (
                    

                    
                  <TableRow key={index}>
                
                    <TableCell>{ingredient.ingredient_Name}</TableCell>
                    <TableCell>{ingredient.price}</TableCell>
                    <TableCell>{ingredient.unit===1?ingredient.unit_Min:ingredient.unit===2?ingredient.unit_Transfer:ingredient.unit_Max}</TableCell>
                    <TableCell>{ingredient.quality}</TableCell>
                    
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




export default UpdateSupplier;
