import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getInitialData } from "../../../../redux/actions/customerLevel";
import { DataGrid } from '@mui/x-data-grid';
import UpdateCustomerLevel from "./UpdateCustomerLevel";
//import DetailCustomer from "./DetailCustomer"
import { Box } from "@mui/material";

const TableCustomerLevel = () => {
    const data = useSelector(state => state.dataCustomerLevel.data);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInitialData())
    }, [dispatch]);

    let columns = [
        {
            field: "id",
            headerName: "",
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 100
        },
        {
            field: "level_Name",
            headerName: 'Level Name',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 100
        },
        {
            field: "pointApply",
            headerName: 'Point',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 100,

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
                        <UpdateCustomerLevel
                            customerLevel={params.row}
                            buttonLabel={params.row.isActive ? " Lock " : "Unlock"}
                        />
                        {/* <DetailCustomer
                            customer={params.row}
                        /> */}
                    </Box>

                )
            }
        }
    ]



    return (
        <div style={{ width: '100%' }}>
            <div style={{ width: '100%' }}>
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
            </div>
        </div>


    )
}

export default TableCustomerLevel;