import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getMenu } from "../../../redux/actions/menu";
import { DataGrid } from '@mui/x-data-grid';
import '../../../css/backend/product/index.css';
import { Box } from "@mui/material";
import { Button } from "@mui/joy";
import moment from "moment";


const TableMenu = (props) => {

    const [dataTable, setDataTable] = useState([]);
    const formatData = () => {
        let data = [];
        props.batchRecipes.forEach(element => {
            let ingredient = props.ingredients.find(x => x.ingredient_ID == element.ingredientResult_ID);
            data.push({
                batchRecipe_ID: element.batchRecipe_ID,
                ingredientResult_ID: element.ingredientResult_ID,
                quality: element.quality,
                unit: element.unit,
                staff_ID: element.staff_ID,
                ingredient_Name: ingredient.ingredient_Name,
                isActive: element.isActive,
                createdDate: element.createdDate,
                details: element.details,
                ingredient: ingredient,
                id: element.id,
                date : moment(element.createdDate).format("DD-MM-YYYY HH:mm"),
                unitName: element.unit == 2 ? ingredient.unit_Max : element.unit == 1 ? ingredient.unit_Transfer : ingredient.unit_Min
            })

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
            field: "unitName",
            headerName: 'Unit',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 100
        },
        {
            field: "date",
            headerName: 'Date',
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
                    <Box sx={{ display: 'flex', justifyContent: 'center', verticalAlign: 'middle' , alignItems: 'center'}}>
                    <Button
                        sx={{ width: '80px', bgcolor: '#000000' }}
                        onClick={() => props.showDetail(params.row)}
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