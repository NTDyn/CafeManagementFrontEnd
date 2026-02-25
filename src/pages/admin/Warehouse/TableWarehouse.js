import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getInitialData } from "../../../redux/actions/warehouse";
import { DataGrid } from '@mui/x-data-grid';
import UpdateWarehouse from './UpdateWarehouse';
import { Box } from "@mui/material";
import '../../../css/backend/warehouse/index.css'
const TableWarehouse = ({ data }) => {

    console.log(data)

    const rows = data?.map(item => ({
        ...item,
        id: item.wareHouse_ID // Thêm ID cho DataGrid
    })) || [];



    let columns = [
        {
            field: "wareHouse_ID",
            headerName: 'ID',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 100
        },
        {
            field: 'wareHouse_Name',
            headerName: ' Name',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 100
        },
        {
            field: 'wareHouse_Address',
            headerName: ' Address',
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
                        <UpdateWarehouse
                            dataWarehouse={data}
                            warehouse={params.row}
                            buttonLabel={params.row.isActive ? " Lock " : "Unlock"}
                            isActive={!params.row.isActive}


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


export default TableWarehouse