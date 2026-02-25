import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { DataGrid } from '@mui/x-data-grid';
import UpdateStaff from "./UpdateStaff";
import DetailStaff from "./DetailStaff"
import { Box } from "@mui/material";
import { getInitialData as getHistory } from "../../../redux/actions/historyDiscount";
import { Button } from "@mui/joy";
import { PropaneSharp } from "@mui/icons-material";

const TableStaff = (props) => {

    const [openModal, setOpenModal] = useState(false);
    const data = props.staffData;
    // const [dataHistory, setDataHistory] = useState({
    //     "customer_ID": 0,
    //     "cuppon_ID": 0,
    //     "priceDiscount": 0,
    //     'receipt_ID': -1,
    //     'createdDate': '0000-00-00'
    // })
    const dispatch = useDispatch();



    // const getDataHistory = (_data) => {
    //     setDataHistory(_data);

    // }
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
            field: "staff_FullName",
            headerName: 'Staff Name',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 100
        },
        {
            field: "staff_Phone",
            headerName: ' Phone Number',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 100,
            maxWidth: 150,
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
                        <UpdateStaff
                            dataStaff={data}
                            customer={params.row}
                            dataCustomerLevel={props.dataCustomerLevel}
                            buttonLabel={params.row.isActive ? " Lock " : "Unlock"}
                        />
                        <DetailStaff
                            dataPermission={props.dataPermission}
                            staff={params.row}
                            dataStaffGroup={props.dataStaffGroup}
                        />
                        {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                sx={{ width: '80px', }}
                                variant="outlined"
                                onClick={() => props.showHistory(params.row.customer_Id)}
                            >
                                
                            </Button>
                        </Box> */}
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

export default TableStaff;