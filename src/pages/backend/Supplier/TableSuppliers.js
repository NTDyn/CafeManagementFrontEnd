import { useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import UpdateSupplier from "./UpdateSupplier";
import '../../../css/backend/product/index.css';
import { useState } from "react";
import { getAllSuppliers } from "../../../redux/actions/supplier";
import { Box } from "@mui/material";


const TableSuppliers = (async) => {
    const [suppliers,setSuppliers]=useState([]);
    useEffect(()=>{
        getAllSuppliers().then((res)=>{
            setSuppliers(res.data.data);
            console.log(res.data.data);
          })
    },[]);
    
    let columns = [
        {
            field: "supplier_ID",
            headerName: "Num",
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 100,
          
        },
        {
            field: "supplier_Name",
            headerName: 'Supplier Name',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 100
        },
        {
            field: "isActive",
            headerName: 'Status',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 100,
            renderCell: (params) => {
                const supplier = params.row;
                return supplier.isActive ? "Using" : "Unused";
            }
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
                        supplier_ID={supplier.supplier_ID}
                        supplier_Name={supplier.supplier_Name}
                        buttonLabel={supplier.isActive ? " Lock " : "Unlock"}
                        isActive={supplier.isActive ? false: true}
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
            rows={suppliers}
            columns={columns}
            getRowId={(row) => row.supplier_ID}
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

export default TableSuppliers;