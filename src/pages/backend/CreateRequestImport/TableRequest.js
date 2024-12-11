import { useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import '../../../css/backend/product/index.css';
import { useState } from "react";
import { getListRequestStart } from "../../../redux/actions/requestImport";
import { Box } from "@mui/material";
import UpdateSupplier from "./UpdateRequest";


const TableRequest = (async) => {
    const [refreshKey, setRefreshKey] = useState(0);
    const [request,setRequest]=useState([]);
    const handleStateChange = () => {
        setRefreshKey((prev) => prev + 1); // Tăng giá trị trigger để reload dữ liệu
    };
    useEffect(()=>{
        getListRequestStart().then((res)=>{
            setRequest(res.data.data);
            console.log(res.data.data);
          })
    },[refreshKey]);
    
    let columns = [
        {
            field: "link_ID",
            headerName: "Num",
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 100,
          
        },
        {
            field: "totalPrice",
            headerName: 'totalPrice',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 100
        },
        {
            field: "features",
            headerName: "Features",
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 100,
            renderCell: (params) => {
                const supplier = params.row;
                return (


                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%",
                            overflow: "hidden", // Đảm bảo không bị tràn
                        }}
                    >
                        
                    <UpdateSupplier
                    onUpdate={handleStateChange}
                        supplier_ID={params.row.link_ID}
                        // supplier_Name={supplier.supplier_Name}
                        // buttonLabel={supplier.isActive ? " Lock " : "Unlock"}
                        // isActive={supplier.isActive ? false: true}
                    />
                    </Box>

                )

            }
        }
    ]



    return (
        <DataGrid

            autoHeight
            checkboxSelection
            rows={request}
            columns={columns}
            getRowId={(row) => row.link_ID}
            getRowClassName={(params) =>
               
                params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            initialState={{
                pagination: { paginationModel: { pageSize: 20 } },
            }}
            getRowHeight={() => 100}
            pageSizeOptions={[10, 20, 50]}
            disableColumnResize
            density="compact"
            slotProps={{
                filterPanel: {
                    filterFormProps: {
                        logicOperatorInputProps: {
                            variant: 'outlined',
                            size: 'small',
                        },
                        columnInputProps: {
                            variant: 'outlined',
                            size: 'small',
                            sx: { mt: 'auto' },
                        },
                        operatorInputProps: {
                            variant: 'outlined',
                            size: 'small',
                            sx: { mt: 'auto' },
                        },
                        valueInputProps: {
                            InputComponentProps: {
                                variant: 'outlined',
                                size: 'small',
                            },
                        },
                    },
                },
            }}
        />
    )
}

export default TableRequest;