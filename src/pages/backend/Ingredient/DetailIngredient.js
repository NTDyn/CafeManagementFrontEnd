import Button from '@mui/joy/Button';
import Grid from '@mui/material/Grid2';
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';

function DetailIngredient({ ingredient }) {

    const [openDetail, setOpenDetail] = useState(false);
    const [recipeRows, setRecipeRows] = useState(ingredient.recipeRaws ? ingredient.recipeRaws : [])
    const [ingredientName, setIngredientName] = useState(ingredient.ingredient_Name);
    const [ingredientCategory, setIngredientCategory] = useState(ingredient.ingredient_Category)
    const [ingredientType, setIngredientType] = useState(ingredient.ingredient_Type);
    const [unitMin, setUnitMin] = useState(ingredient.unit_Min);
    const [unitMax, setUnitMax] = useState(ingredient.unit_Max);
    const [unitTransfer, setUnitTransfer] = useState(ingredient.unit_Transfer);
    const [transferPerMin, setTransferPerMin] = useState(ingredient.transferPerMin);
    const [maxPerTransfer, setMaxPerTransfer] = useState(ingredient.maxPerTransfer);
    const dataIngredient = useSelector(state => state.dataIngredient.data)
    const dataIngredientCategory = useSelector(state => state.dataIngredientCategory.data)

    const ingredientMap = new Map(
        dataIngredient.map(data => [data.ingredient_ID, data.ingredient_Name])
    );
    const rowsConfix = recipeRows.map(row => ({
        ...row,
        ingredient_Name: ingredientMap.get(row.ingredient_Raw) || 'Unknown',
        unit: row.unit === 1
            ? ingredient.unit_Min
            : row.unit === 2
                ? ingredient.unit_Transfer
                : row.unit === 3
                    ? ingredient.unit_Max
                    : row.unit
    }));

    const nameCate = dataIngredientCategory.find(
        cate => cate.ingredient_Category_ID === ingredientCategory
    )

    const [categoryName, setCategoryName] = useState(nameCate ? nameCate.ingredient_Category_Name : '');

    const dataIngredientType = [
        {
            ingredient_Type_ID: 1,
            ingredient_Type_Name: "Nguyên liệu thực phẩm dùng trực tiếp"
        },
        {
            ingredient_Type_ID: 2,
            ingredient_Type_Name: "Nguyên liệu thực phẩm cần qua chế biến"
        },
        {
            ingredient_Type_ID: 0,
            ingredient_Type_Name: "Không phải thực phẩm"
        }
    ]
    const typeIn = dataIngredientType.find(
        dataIngredientType => dataIngredientType.ingredient_Type_ID === ingredient.ingredient_Type)

    const [typeName, setTypeName] = useState(typeIn ? typeIn.ingredient_Type_Name : '')
    const columns = [
        {

            field: 'ingredient_Name',
            headerName: 'Ingredient Raw',
            width: 280,
            align: 'center',
            headerAlign: 'center',

        },
        {

            field: 'unit',
            headerName: 'Unit',
            width: 280,
            align: 'center',
            headerAlign: 'center',

        },
        {

            field: 'quantity',
            headerName: 'Quantity',
            width: 280,
            align: 'center',
            headerAlign: 'center',

        },
    ]

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    sx={{ width: '80px', bgcolor: '#000000' }}
                    onClick={() => setOpenDetail(true)}
                >
                    Detail
                </Button>
            </Box>

            {/* MODAL Detail */}

            <Modal open={openDetail} onClose={() => setOpenDetail(false)}>
                <ModalDialog>
                    <DialogTitle>Information of ingredient</DialogTitle>
                    <form

                    >
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>Ingredient Name</FormLabel>
                                <TextField
                                    slotProps={{
                                        input: {
                                            readOnly: true,
                                        },
                                    }}
                                    name="nameIngredient"
                                    value={ingredientName ? ingredientName : ''}
                                >
                                </TextField>
                            </FormControl>
                            <FormControl
                                sx={{ marginTop: 2 }}
                            >
                                <FormLabel>Ingredient Category</FormLabel>
                                <TextField
                                    slotProps={{
                                        input: {
                                            readOnly: true,
                                        },
                                    }}
                                    name="categoryArea"
                                    value={categoryName ? categoryName : ''}

                                >
                                </TextField>
                            </FormControl>
                            {/* Category Type */}
                            <FormControl
                                sx={{ marginTop: 2 }}
                            >
                                <FormLabel>Ingredient Type</FormLabel>
                                <TextField

                                    slotProps={{
                                        input: {
                                            readOnly: true,
                                        },
                                    }}
                                    name="categoryType"
                                    value={typeName ? typeName : ''}
                                >
                                </TextField>
                            </FormControl>
                            <Stack
                                spacing={2}
                                direction="row"
                            >
                                <FormControl>
                                    <FormLabel>Unit Min</FormLabel>
                                    <TextField
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                        }}
                                        name="unitMin"
                                        value={unitMin}

                                    >
                                    </TextField>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Unit Transfer</FormLabel>
                                    <TextField
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                        }}
                                        name="unitTransfer"
                                        value={unitTransfer}

                                    >
                                    </TextField>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Unit Max</FormLabel>
                                    <TextField
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                        }}
                                        name="unitMax"
                                        value={unitMax ? unitMax : ''}

                                    >
                                    </TextField>
                                </FormControl>
                            </Stack>
                            <Stack
                                spacing={2}
                                direction="row"
                            >
                                <FormControl>
                                    <FormLabel> 1 {unitMax} = ... {unitTransfer}</FormLabel>
                                    <TextField
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                        }}
                                        name="maxPerTransfer"
                                        value={maxPerTransfer}

                                    >
                                    </TextField>

                                </FormControl>

                                <FormControl>
                                    <FormLabel> 1 {unitTransfer} = ... {unitMin}</FormLabel>
                                    <TextField
                                        name="transferPerMin"
                                        value={parseFloat(transferPerMin)}
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                        }}

                                    >
                                    </TextField>
                                </FormControl>

                            </Stack>
                            <Stack>
                                <DataGrid
                                    rows={rowsConfix}
                                    columns={columns}
                                    getRowId={(row) => row.recipe_ID}
                                >

                                </DataGrid>
                            </Stack>
                            <Button
                                onClick={() => setOpenDetail(false)}

                            >
                                Close
                            </Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </>
    )
}

export default DetailIngredient;