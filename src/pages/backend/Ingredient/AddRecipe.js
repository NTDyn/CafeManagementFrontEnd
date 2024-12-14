import { Autocomplete, Button, FormControl, FormLabel, Modal, Stack } from "@mui/joy";
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import Add from '@mui/icons-material/Add';
import ModalDialog from '@mui/joy/ModalDialog';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Close';
import { Box } from "@mui/material";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
} from '@mui/x-data-grid';
import { addData as addRecipe } from '../../../redux/actions/recipeRaw/index'

export default function AddRecipe(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const initialRows = [];
    const [recipeRows, setRecipeRows] = useState(initialRows);
    const [rowModesModel, setRowModesModel] = useState({});
    const [currentId, setCurrentId] = useState(1);
    const dataIngredient = props.dataIngredient;
    const dataIngredientResult = dataIngredient.filter(list => list.ingredient_Type === 1);
    const dataIngredientRaw = dataIngredient.filter(list => list.ingredient_Type === 0);
    const [ingredientResultID, setIngredientResultID] = useState("");
    const [ingredientResultName, setIngredientResultName] = useState();
    const [ingredientRawID, setIngredientRawID] = useState("");
    const [ingredientRawName, setIngredientRawName] = useState();

    const checkListRecipe = () => {
        return recipeRows.find(
            row => row.ingredientName === '' || row.unit === ''
        )
    }
    const existingRecipe = () => {
        const item = dataIngredientResult.find(
            list => list.ingredient_ID === ingredientResultID
        );
        if (item && Array.isArray(item.recipeRaws) && item.recipeRaws.length === 0) {
            return false;
        } else {
            return true;
        }
    }
    async function confirmAdd(e) {
        e.preventDefault();
        console.log(recipeRows)

        if (checkListRecipe()) {
            withReactContent(Swal).fire({
                title: "There are uncompleted rows. Please complete them before submitting!",
                backdrop: false,
            });
            return;
        }

        if (existingRecipe()) {
            await withReactContent(Swal).fire({
                title: "Recipe was set before ",
                backdrop: false,
            });
        } else {
            const result = await withReactContent(Swal).fire({
                title: "Do you want to add this recipe?",
                showDenyButton: true,
                confirmButtonText: "Add",
                denyButtonText: `Cancel`,
            });

            if (result.isConfirmed) {
                try {
                    await AddRecipeRaw();
                    await Swal.fire("Saved!", "", "success");
                } catch (error) {
                    console.error("Error adding recipe:", error);
                    Swal.fire("Error!", "Could not save the recipe.", "error");
                }
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        }
    };

    function AddRecipeRaw() {

        recipeRows.forEach(element => {
            let data = {
                "ingredient_Result": ingredientResultID,
                "ingredient_Raw": element.ingredient_ID,
                "quantity": element.quantity,
                "unit": element.unit
            }
            dispatch(addRecipe(data));
        });

    };
    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const processRowUpdate = (newRow) => {


        const selectedIngredient = dataIngredientRaw.find(
            ingredient => ingredient.ingredient_Name === newRow.ingredientName
        );

        if (selectedIngredient) {
            // Cập nhật ingredient_ID nếu tìm thấy ingredientName trong danh sách
            newRow.ingredient_ID = selectedIngredient.ingredient_ID;
        } else {
            // Nếu không tìm thấy, có thể để ingredient_ID trống hoặc thực hiện xử lý khác
            newRow.ingredient_ID = null; // hoặc một giá trị mặc định
        }

        if (newRow.quantity < 1) {
            newRow.quantity = 1
        }
        if (newRow.unit) {
            if (newRow.unit === selectedIngredient.unit_Min) {
                newRow.unit = 1;
            } else if (newRow.unit === selectedIngredient.unit_Transfer) {
                newRow.unit = 2;
            } else if (newRow.unit === selectedIngredient.unit_Max) {
                newRow.unit = 3;
            }
        }
        const updatedRow = { ...newRow, isNew: false };

        setRecipeRows(recipeRows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        setRowModesModel({ ...rowModesModel, [updatedRow.id]: { mode: GridRowModes.View } });
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const getAvailableIngredients = (currentId) => {
        // Lấy danh sách các giá trị đã được chọn, ngoại trừ hàng hiện tại
        const selectedIngredients = recipeRows
            .filter(row => row.id !== currentId)
            .map(row => row.ingredientName)
            .filter(name => name); // Loại bỏ giá trị rỗng

        // Loại trừ các giá trị đã chọn khỏi danh sách gốc
        return (

            dataIngredientRaw
                .map(item => item.ingredient_Name)
                .filter(name => !selectedIngredients.includes(name))
        );
    };

    const handleRowEditStop = (params, event) => {
        handleSaveClick(params.id)

    };
    const handleDeleteClick = (id) => () => {
        setRecipeRows(recipeRows.filter((row) => row.id !== id));
    };


    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = recipeRows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRecipeRows(recipeRows.filter((row) => row.id !== id));
        }
    };

    function EditToolbar(props) {
        const { setRecipeRows, setRowModesModel } = props;


        const handleClickAdd = () => {
            setRecipeRows((oldRows) => [
                ...oldRows,
                { id: currentId, ingredient_ID: '', ingredientName: '', unit: '', quantity: '', isNew: true },
            ]);
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [currentId]: { mode: GridRowModes.Edit, fieldToFocus: 'ingredientName' },
            }));
            setCurrentId(currentId + 1); // Tăng giá trị ID sau khi sử dụng
        }

        return (
            <GridToolbarContainer
                style={
                    {
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: 5
                    }}
            >
                <Button color="primary" startDecorator={<Add />} onClick={handleClickAdd}>
                    Add record
                </Button>

            </GridToolbarContainer>
        );
    }
    const columns = [
        {
            field: 'ingredientName',
            headerName: 'Ingredient',
            width: 280,
            align: 'center',
            headerAlign: 'center',
            type: 'singleSelect',
            valueOptions: (params) => getAvailableIngredients(params.row.id),
            editable: true,
        },
        {
            field: 'unit',
            headerName: 'Unit',
            width: 300,
            editable: true,
            align: 'center',
            headerAlign: 'center',
            type: 'singleSelect',
            valueOptions: ({ row }) => {
                if (row != null) {
                    const selectedIngredient = dataIngredientRaw.find(
                        ingredient => ingredient.ingredient_Name === row.ingredientName
                    );
                    if (!selectedIngredient) {
                        return [];
                    }

                    // Danh sách các đơn vị có thể chọn
                    const units = [
                        selectedIngredient.unit_Min,
                        selectedIngredient.unit_Max,
                        selectedIngredient.unit_Transfer,

                    ];

                    // Lọc bỏ các giá trị trùng lặp
                    const uniqueUnits = [...new Set(units.filter(unit => unit !== null && unit !== undefined))];

                    return uniqueUnits;
                }
            },


        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            type: 'number',
            width: 150,
            align: 'center',
            headerAlign: 'center',
            editable: true,
        },

        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 200,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];
    return (

        <>
            <Button
                variant="outlined"
                color="neutral"
                startDecorator={<Add />}
                onClick={() => setOpen(true)}
            >
                Add Recipe Raw
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog>
                    <form onSubmit={confirmAdd}>
                        <Stack spacing={2}>
                            <FormControl
                                sx={{ marginTop: 2 }}
                            >
                                <FormLabel>Ingredient Result</FormLabel>
                                <Autocomplete

                                    disablePortal
                                    options={dataIngredientResult}
                                    getOptionLabel={(option) => option.ingredient_Name ? option.ingredient_Name : ""}
                                    name="IngredientResult"
                                    value={ingredientResultName ? { ingredient_Name: ingredientResultName } : null}
                                    onChange={(event, newValue) => {
                                        if (newValue) {
                                            setIngredientResultID(newValue.ingredient_ID);
                                            setIngredientResultName(newValue.ingredient_Name);
                                        } else {
                                            setIngredientResultID(null);
                                            setIngredientResultName('');
                                        }
                                    }}

                                    renderInput={(params) => <TextField
                                        required
                                        {...params}

                                    />}
                                />
                            </FormControl>
                            <Grid size={10} >
                                <Box
                                    sx={{

                                        width: '100%',
                                        '& .actions': {
                                            color: 'text.secondary',
                                        },
                                        '& .textPrimary': {
                                            color: 'text.primary',
                                        },
                                    }}
                                >
                                    <DataGrid
                                        sx={{ height: 400 }}
                                        rows={recipeRows}
                                        columns={columns}
                                        editMode="row"
                                        rowModesModel={rowModesModel}
                                        onRowModesModelChange={handleRowModesModelChange}
                                        onRowEditStop={handleRowEditStop}
                                        processRowUpdate={processRowUpdate}

                                        slots={{
                                            toolbar: EditToolbar,
                                        }}
                                        slotProps={{
                                            toolbar: { setRecipeRows, setRowModesModel },
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid container sx={{ justifyContent: 'center', marginTop: '1%' }}>
                                <Box container >
                                    <Button type="submit" sx={{ fontSize: '16px', fontWeight: 'bold' }} >
                                        Add recipe
                                    </Button>
                                </Box>
                            </Grid>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </>
    )
}