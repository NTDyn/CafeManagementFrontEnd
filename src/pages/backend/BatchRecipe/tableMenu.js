import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getMenu } from "../../../redux/actions/menu";
import { DataGrid } from '@mui/x-data-grid';
import '../../../css/backend/product/index.css';
import { Box } from "@mui/material";


const TableMenu = (props) => {

    const [dataTable, setDataTable] = useState([]);
    const formatData = () => {
        let data = [];
        props.batchRecipes.forEach(element => {
            let ingredient = props.ingredients.find(x=>x.ingredient_ID == element.ingredientResult_ID);
            data.push({
                batchRecipe_ID: element.batchRecipe_ID,
                ingredientResult_ID: element.ingredientResult_ID,
                quality: element.quality,
                unit: element.unit,
                staff_ID: element.staff_ID,
                ingredient_Name: ingredient.ingredient_Name,
                isActive: element.isActive,
                createdDate: element.createdDate,
                details : element.details,
                ingredient: ingredient,
                id: element.id
            })
            
        });
        setDataTable(data);
    }
    useEffect(() => {
        formatData()
    }, [props.batchRecipes]);
    console.log(dataTable);
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