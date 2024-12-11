import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
// import swal from 'sweetalert';
import dayjs from 'dayjs';
import Swal from 'sweetalert2'
import axios from 'axios';
import Modal1 from '@mui/material/Modal';
// import { Col, Row } from 'react-bootstrap';
import { Button, Checkbox, IconButton, Input, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextareaAutosize, TextField, Typography } from '@mui/material';
import { getListRequestApprove, UpdateDetailInteredientandSupplier } from '../../../redux/actions/requestImport';
import { getListRequestCheck } from '../../../redux/actions/requestImport';
import { getListRequestDeny } from '../../../redux/actions/requestImport';
import TableApproveRequest from './TableApproveRequst';
import TableDenyRequest from './TableDenyRequest';
import TableCheckRequest from './TableCheckRequest';
import SideMenu from '../../../components/Menu/SideMenu';
import { getImportDetail, GetRequest, GetStaffById, getStaffByUserName, GetSupplierById, GetWareHouse } from '../../../redux/actions/supplier';
import withReactContent from 'sweetalert2-react-content';


const BasicTabs=()=> {
  const [refreshKey, setRefreshKey] = useState(0);
  const [value, setValue] = useState(0);
  const endDate = dayjs().format('YYYY/MM/DD');
  const [tempId,setTempId]=useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleStateChange = () => {
    setRefreshKey((prev) => prev + 1); // Tăng giá trị trigger để reload dữ liệu
};
  
const [getRequest,setRequest]=useState({});
  const [openModal, setOpenModal] = useState(false);
  const[listRequestDeny,setListRequestDeny]=useState([])
  const[listRequestApprove,setListRequestApprove]=useState([])
  const [listRequestCheck,setListRequestCheck]=useState([])
  const [currentPage, setCurrentPage] = useState(0);  // Trang hiện tại
const [pageSize, setPageSize] = useState(5);  // 
const [totalPages, setTotalPages] = useState(1);
const[open,setOpen]=useState(false);
const [change,setChange]=useState();
const [getImportDetal,setImportDetail]=useState([]);
const [backupImportDetail,setBackUpImportDetail]=useState([])
const [getSupplier,setSupplier]=useState({});
const [getWareHouse,setWareHouse]=useState({});
const [getStaff,setStaff]=useState({})
const [openDetail,setOpenDetail]=useState(false);
  useEffect(() => {
    // Gọi dữ liệu cho mỗi tab khi tab thay đổi
    if (value === 0) {
      getListRequestApprove().then((res) => {
        setListRequestApprove(res.data.data);
        if(res.data.data===null){
          setListRequestApprove(null);
        }
      });
    } else if (value === 1) {
      getListRequestDeny().then((res) => {
        setListRequestDeny(res.data.data);
      });
    } else if (value === 2) {
      getListRequestCheck().then((res) => {
        setListRequestCheck(res.data.data);
        if(res.data.data===null){
          setListRequestCheck(null);
        }
      });
    }
  }, [value],[refreshKey]);
   



 

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(()=>{
    getListRequestApprove().then((res)=>{
        setListRequestApprove(res.data.data);
        setBackUpImportDetail(res.data.data);
    })
    
   },[])

   const handleOpenModal = (data) => {
    setImportDetail(data);

    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
   
  };

  const handleCheckboxChange = (index) => {
    const updatedData = [...getImportDetal];
    updatedData[index].isValid = !updatedData[index].isValid; // Toggle trạng thái hợp lệ
    setImportDetail(updatedData);
  };

  const handleInputChangeQuality = (index, field, value) => {
  
    const updatedData = [...getImportDetal];
    updatedData[index].quality = value; // Cập nhật trường được sửa
    setImportDetail(updatedData);
  
  };

  const handleInputChangePrice = (index, field, value) => {
  
    const updatedData = [...getImportDetal];
    updatedData[index].price = value; // Cập nhật trường được sửa
    setImportDetail(updatedData);
    console.log(getImportDetal);
  };
 

  

  const handleInputChangeUnit = (index, field, value) => {
  
    const updatedData = [...getImportDetal];
    updatedData[index].unit = value; // Cập nhật trường được sửa
    setImportDetail(updatedData);
  
  };
 
 

  // Hàm xử lý hành động
  const handleActionViewDetail = async(id) => {
    setOpenDetail(true);
    const request=await GetRequest(id);
        setRequest(request.data.data);
         const importDetail=await getImportDetail(id);
         setImportDetail(importDetail.data.data);
        const supplier=await GetSupplierById(request.data.data.supplier_ID);
        setSupplier(supplier.data.data);
        const warehouse=await GetWareHouse(request.data.data.warehouse_ID);
        setWareHouse(warehouse.data.data);
        const staff=await  GetStaffById(request.data.data.staffRequest_ID);
        setStaff(staff.data.data);
  };
  const handleActionDetail=(id)=>{
alert(id);
  }
  const handleActionAccept=async(id)=>{
    
    setOpenModal(true);
    const importDetail=await getImportDetail(id);
    setImportDetail(importDetail.data.data);
    setBackUpImportDetail(importDetail.data.data)
  }

  const handleupdateDetailIngredient = async() => {
    const getUserName=sessionStorage.getItem("userName");
    const staff=(await getStaffByUserName(getUserName)).data.data
    const data = {
      supplierLink: {
        link_ID: getImportDetal[0].header_ID,
        supplierID: 0,
        staffRequestID: 0,
        staffApprovedID: 0,
        staffReceivedID: staff.staff_ID,
        totalPrice: 0,
        warehouseID: 0,
        isActive: true
      },
      supplierDetail: getImportDetal.map((item) => {
        return {
          link_ID: item.header_ID,
          detail_Id: item.detail_ID,
          ingredientID: 0, // Đây có thể là một giá trị cần thay đổi tuỳ vào dữ liệu của bạn
          price: parseInt(item.price),
          quality: parseInt(item.quality),
          unit: parseInt(item.unit),
          isActive: true
        };
      })
    };
    const update=await UpdateDetailInteredientandSupplier(data);
    handleStateChange();
  
    console.log(data);
  };
  
  const confirmUpdateSupplierAndIngredient=(e)=>{
    withReactContent(Swal).fire({
        title: "Do you want to approve this request?",
        showDenyButton: true,
        confirmButtonText: "Change",
        denyButtonText: `Cancel`
    }).then((result) => {
        if (result.isConfirmed) {
            
          handleupdateDetailIngredient();
          handleCloseModal();
           
            Swal.fire("Successfully", "", "success");
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }

    })
}
const handleCloseDetail=()=>{
  setOpenDetail(false);
 
}
  

  return (
     
    <div>
    
  
    
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Approve" />
        <Tab label="Deny" />
        <Tab label="Check" />
      </Tabs>
      
      <Box sx={{ p: 2 }}>
      {value === 0 && (listRequestApprove ? (
  <TableApproveRequest data={listRequestApprove} onActionDetail={handleActionViewDetail}  onActionAccept={handleActionAccept} currentPage={currentPage}
    totalPages={totalPages} onPageChange={handlePageChange} />
) : (
  <div>No data available</div> // Thông báo nếu không có dữ liệu
))}

{value === 1 && (listRequestDeny ? (
  <TableDenyRequest data={listRequestDeny} onActionDetail={handleActionViewDetail} currentPage={currentPage}
    totalPages={totalPages} onPageChange={handlePageChange} />
) : (
  <div>No data available</div>
))}

{value === 2 && (listRequestCheck ? (
  <TableCheckRequest data={listRequestCheck} onActionDetail={handleActionViewDetail} currentPage={currentPage}
    totalPages={totalPages} onPageChange={handlePageChange} />
) : (
  <div>No data available</div>
))}



<Modal1 open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 800,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <h3>Detail Information</h3>
            
              <Table>
                <TableBody>
                  {backupImportDetail.map((row, index) => (
                    <TableRow >
                   
                  
                      <TableCell>

                        <Checkbox
                          checked={row.isValid || false}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      </TableCell>

                      <TableCell>
                        <TextField
                          label="Ingredient"
                          type="text"
                          value={row.ingredient_Name || ''}
                          disabled={row.isValid}
                        
                        />
                        </TableCell>


                      <TableCell>
                        <TextField
                          label="Quantity"
                          type="number"
                          value={row.quality || ''}
                          disabled={row.isValid}
                          onChange={(e) =>
                            handleInputChangeQuality(index, 'quality', e.target.value)
                          }
                        />

                      </TableCell>
                    
                      <TableCell>
                      <Select
                      label="Unit Price"
                      value={
                        row.unit === 1
                          ? row.unit_Min || ''
                          : row.unit === 3
                          ? row.unit_Max || ''
                          : row.unit_Transfer || ''
                      }
                      disabled={row.isValid}
                      onChange={(e) => handleInputChangeUnit(index,"unit", e.target.value)}
                      fullWidth
                    >
                      <MenuItem value={1 || ''}>Min Unit ({row.unit_Min})</MenuItem>
                      <MenuItem value={3 || ''}>Max Unit ({row.unit_Max})</MenuItem>
                      <MenuItem value={2 || ''}>Transfer Unit ({row.unit_Transfer})</MenuItem>
                    </Select>
                      </TableCell>
                      <TableCell>
                        <TextField
                          label="Price"
                          type="number"
                          value={row.price || ''}
                          disabled={row.isValid}
                          onChange={e=>handleInputChangePrice (index,"price",e.target.value)}
                         
                        />
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            
            
            <Button onClick={handleCloseModal}>Close</Button>
            <Button onClick={confirmUpdateSupplierAndIngredient}>Accept</Button>
          </Box>
        </Modal1>

        <Modal open={openDetail} onClose={handleCloseDetail}>
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
            <Button variant="contained" color="primary" onClick={handleCloseDetail}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

       
      </Box>
    </Box> 
    </div>
  );
}
export default BasicTabs;
