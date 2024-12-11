import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getMenu } from "../../../redux/actions/menu";
import { DataGrid } from '@mui/x-data-grid';
import '../../../css/backend/product/index.css';
import { Box } from "@mui/material";
import UpdateMenu from "./updateMenu";
import MenuDetail from "./MenuDetail/menuDetail";
import { getInitialData } from "../../../redux/actions/menuDetail";


const TableMenu = (props) => {

    const dataDetail = useSelector(state => state.dataMenuDetail.data)
    const dispatch = useDispatch();


    const getMenuDetail = async (_id) => {
        return await dispatch(getInitialData(_id))

    }

    let columns = [
        {
            field: "id",
            headerName: "Num",
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 100
        },
        {
            field: "menu_Name",
            headerName: 'Menu Name',
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
                        <UpdateMenu
                            menuID={params.row.id}
                            menuName={params.row.categoryName}
                            buttonLabel={params.row.isActive ? " Lock " : "Unlock"}
                            isActive={params.row.isActive ? false : true}

                        />
                        <MenuDetail
                            menuID={params.row.menu_ID}
                            dataDetail={dataDetail}
                            getMenuDetail={getMenuDetail}
                        />
                    </Box>

                )
            }
        }
    ];
    return (
        <DataGrid

            autoHeight
            checkboxSelection
            rows={props.dataMenu}
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

export default TableMenu;