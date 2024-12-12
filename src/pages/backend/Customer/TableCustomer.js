import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getInitialData } from "../../../redux/actions/customer";
import { DataGrid } from '@mui/x-data-grid';
import UpdateCustomer from "./UpdateCustomer";
import DetailCustomer from "./DetailCustomer"
import { Box } from "@mui/material";

const TableCustomer = (dataCustomerLevel) => {
    const data = useSelector(state => state.dataCustomer.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInitialData())
    }, [dispatch]);

    let columns = [
        {
            field: "id",
            headerName: "Num",
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 20,
            maxWidth: 50
        },
        {
            field: "customer_Name",
            headerName: 'Customer Name',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 100
        },
        {
            field: "customer_Phone",
            headerName: ' Phone Number',
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
                return params.value ? "Using" : "Unused";
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
                        <UpdateCustomer
                            dataCustomer={data}
                            customer={params.row}
                            dataCustomerLevel={dataCustomerLevel}
                            buttonLabel={params.row.isActive ? " Lock " : "Unlock"}
                        />
                        <DetailCustomer
                            customer={params.row}
                            dataCustomerLevel={dataCustomerLevel}
                        />
                    </Box>

                )
            }
        }
    ]



    return (
        <DataGrid

            autoHeight
            rows={data}
            columns={columns}
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

export default TableCustomer;