import { useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import UpdateSupplier from "./UpdateSupplier";
import '../../../css/backend/product/index.css';
import { useState } from "react";
import { getInitialData } from "../../../redux/actions/supplier";
import { Box } from "@mui/material";


const TableSuppliers = ({ dataSupplier }) => {

    const rows = dataSupplier?.map(item => ({
        ...item,
        id: item.supplier_ID // Thêm ID cho DataGrid
    })) || [];

    let columns = [
        {
            field: "supplier_ID",
            headerName: "Num",
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 5,

        },
        {
            field: "supplier_Name",
            headerName: 'Supplier Name',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 200
        },
        {
            field: "supplier_Address",
            headerName: 'Address',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 350,

        },
        {
            field: "supplier_Phone",
            headerName: 'Phone',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 100,

        },
        {
            field: "supplier_Email",
            headerName: 'Email',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 250,

        },
        {
            field: "features",
            headerName: "Features",
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 200,
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
                            dataSupplier={dataSupplier}
                            supplier={params.row}
                        />
                    </Box>

                )

            }
        }
    ]



    return (
        <DataGrid

            autoHeight
            rows={rows}
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