import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getInitialData } from "../../../redux/actions/warehouse";
import { DataGrid } from '@mui/x-data-grid';

const useTableWarehouse = () => {
    const data = useSelector(state => state.dataWarehouse.data);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInitialData())
    }, [dispatch])

    let columns = [
        {
            field: "wareHouse_ID",
            headerName: 'ID',
            headerAlign: 'right',
            align: 'right',
            flex: 1,
            minWidth: 100
        },
        {
            field: 'wareHouse_Name',
            headerName: 'Warehouse Name',
            headerAlign: 'right',
            align: 'right',
            flex: 1,
            minWidth: 100
        }
    ]

    return (
        <DataGrid
            autoHeight
            checkboxSelection
            rows={data}
            columns={columns}
            getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            initialState={{
                pagination: { paginationModel: { pageSize: 20 } },
            }}
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


export default useTableWarehouse