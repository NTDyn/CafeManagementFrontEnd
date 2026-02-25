import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getMenu } from "../../../redux/actions/menu";
import { DataGrid } from '@mui/x-data-grid';
import '../../../css/backend/product/index.css';
import { Box } from "@mui/material";
import { Button } from "@mui/joy";



const TableMenu = (props) => {

    const [dataTable, setDataTable] = useState([]);
    const formatData = () => {
        let data = [];
        props.batchRecipes.forEach(element => {
            let ingredient = props.ingredients.find(x => x.ingredient_ID == element.ingredient_ID);
            if (ingredient) {
                data.push({
                    price: element.price,
                    ingredient: ingredient,
                    ingredient_Name: ingredient.ingredient_Name,
                    quality: element.quality,
                    unit: ingredient.unit_Min,
                    report: element.report,
                    id: element.id
                })
            }


        });
        setDataTable(data);
    }
    useEffect(() => {
        formatData()
    }, [props.batchRecipes]);

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
            field: "ingredient_Name",
            headerName: 'Name',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 100
        },
        {
            field: "quality",
            headerName: 'Quantity',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 100
        },
        {
            field: "unit",
            headerName: 'Unit',
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
                    <Box sx={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Button
                            sx={{ width: '80px', bgcolor: '#000000' }}
                            onClick={() => props.showDetail(params.row.report)}
                        >
                            Detail
                        </Button>
                    </Box>
                )
            }
        }
    ];
    return (
        <DataGrid
            autoHeight
            checkboxSelection
            rows={dataTable}
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