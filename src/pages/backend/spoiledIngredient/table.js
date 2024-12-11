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
            let ingredient = props.ingredients.find(x => x.ingredient_ID == element.details[0].ingredient_ID);
            data.push({
                batchRecipe_ID: element.spoiled_ID,
                details: element.details,
                ingredient: ingredient,
                id: element.id,
                ingredient_Name: ingredient.ingredient_Name,
                quality: element.details[0].quality,
                unitName: element.details[0].unit == 2 ? ingredient.unit_Max : element.details[0].unit == 1 ? ingredient.unit_Transfer : ingredient.unit_Min,
                date : moment(element.createdDate).format("DD-MM-YYYY HH:mm"),
                reason: element.reason
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
            field: "reason",
            headerName: 'Reason',
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