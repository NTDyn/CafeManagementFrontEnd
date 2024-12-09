import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
// import swal from 'sweetalert';
import dayjs from 'dayjs';
import axios from 'axios';
import Modal1 from '@mui/material/Modal';
// import { Col, Row } from 'react-bootstrap';
import { IconButton, TextareaAutosize, TextField } from '@mui/material';
import { getListRequestApprove } from '../../../redux/actions/requestImport';
import { getListRequestCheck } from '../../../redux/actions/requestImport';
import { getListRequestDeny } from '../../../redux/actions/requestImport';
import TableApproveRequest from './TableApproveRequst';
import TableDenyRequest from './TableDenyRequest';
import TableCheckRequest from './TableCheckRequest';
import SideMenu from '../../../components/Menu/SideMenu';
const BasicTabs=()=> {
  const [value, setValue] = useState(0);
  const endDate = dayjs().format('YYYY/MM/DD');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const[listRequestDeny,setListRequestDeny]=useState([])
  const[listRequestApprove,setListRequestApprove]=useState([])
  const [listRequestCheck,setListRequestCheck]=useState([])
  const [currentPage, setCurrentPage] = useState(0);  // Trang hiện tại
const [pageSize, setPageSize] = useState(5);  // 
const [totalPages, setTotalPages] = useState(1);
const[open,setOpen]=useState(false);
 
  const handleApprove=(async)=>{
     getListRequestApprove().then((res)=>{
        setListRequestApprove(res.data.data);
     })
  }
  const handleDeny =(async)=>{
    getListRequestDeny().then((res)=>{
        setListRequestDeny(res.data.data);
    })
  }
  const handleCheck= (async)=>{
    getListRequestCheck().then((res)=>{
        setListRequestCheck(res.data.data);
    })
  }
   

//   const handleAccept= async(idCampaign)=>{
//     alert(idCampaign)
//     const token=sessionStorage.getItem("token");
//     if (token){
//       const willCreate = await swal({
//         title: "Are you sure?",
//         text: "Do you want to Accept this Campaign?",
//         icon: "warning",
//         buttons: true,
//         dangerMode: true,
//       });
//       if(willCreate){  
//       try {
//         const decodedToken = jwtDecode(token);
//        const response=await getAccountByUserName(decodedToken.sub);
//     //    setAccountPresent(response.data);
//        if(response.data){
//         const res=await getEmployeeByIdAccount(response.data.idAccount);
//         // setEmployeePresent(res.data);
//         if(res.data){
//           const FormUpdate=new FormData();
//           FormUpdate.append("status",3);
//           FormUpdate.append("idEmployee",res.data.idEmployee);
//           FormUpdate.append("id",idCampaign);
//           FormUpdate.append("endDate",endDate)
//           const resUpdate=await axios.post("http://localhost:8081/api/campaign/changestatus/success",FormUpdate,{
//             headers:{
//                "Authorization":`Bearer ${token}`
//             }
//           })
//           if(resUpdate){
//             swal("Good job!", "This Campaign has been approved!", "success");
//           }
//         }
      

//        }

//       } catch (error) {
//         console.error('Invalid token:', error);
//       }
//     }
//   }
//    }

 

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

//   useEffect(()=>{
//     getListRequestApprove().then((res)=>{
//         setListRequestApprove(res.data.data);
//     })
    
//    },[])
 

  // Hàm xử lý hành động
  const handleAction = (id) => {
    alert(`Action performed on item with ID: ${id}`);
  };

  

  return (
     
    <div>
    
  
    
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Tab One" />
        <Tab label="Tab Two" />
        <Tab label="Tab Three" />
      </Tabs>
      
      <Box sx={{ p: 2 }}>
        {value === 0 && <TableApproveRequest data={listRequestApprove} onAction={handleAction} currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange} />}

{value === 1 && <TableDenyRequest data={listRequestDeny} onAction={handleAction} currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange} />}

{value === 2 && <TableCheckRequest data={listRequestCheck} onAction={handleAction} currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange} />}
       
      </Box>
    </Box> 
    </div>
  );
}
export default BasicTabs;
