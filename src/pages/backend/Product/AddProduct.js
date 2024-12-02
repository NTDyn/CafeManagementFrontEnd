import React, { useState, useEffect } from "react"
import Button from '@mui/joy/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from "react-redux";
import { getInitialData } from "../../../redux/actions/productCategory";
import { addData as addDataProduct, getInitialData as dataProduct } from "../../../redux/actions/products";
import { getInitialData as dataIngredient } from "../../../redux/actions/ingredient"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from "@mui/material";
import Swal from 'sweetalert2'
import Grid from '@mui/material/Grid2';
import withReactContent from 'sweetalert2-react-content';
import '../../../css/backend/product/index.css'
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    Unstable_NumberInput as BaseNumberInput,
    numberInputClasses,
} from '@mui/base/Unstable_NumberInput';
import { useTheme } from '@mui/material/styles';
import { color, maxWidth, styled, width } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import '../../../css/backend/product/index.css?v=19'
import ImageUpload from './ImageUpload'

export default function AddProduct() {

    const dispatchCategory = useDispatch()
    useEffect(() => {
        dispatchCategory(getInitialData())
    }, [dispatchCategory])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(dataProduct())
    }, [dispatch])

    const initialRows = [];
    const [recipeRows, setRecipeRows] = useState(initialRows);
    const [currentId, setCurrentId] = useState(1); // Bắt đầu từ ID 1
    const [rowModesModel, setRowModesModel] = useState({});
    const [open, setOpen] = useState(false);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productPoint, setProductPoint] = useState(0);
    const [productCategory, setProductCategory] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [productImage, setProductImage] = useState('');
    const [recipeIngredientID, setRecipeIngredientID] = useState(0);
    const [recipeQuantity, setRecipeQuantity] = useState(0);
    const [recipeUnit, setRecipeUnit] = useState(0);
    const listProductCategory = useSelector(state => state.dataProductCategory.data);
    const listProduct = useSelector(state => state.dataProduct.data)
    const existingProduct = () => {
        return listProduct.find(
            listProduct => listProduct.product_Name === productName
        )
    }
    const listIngredient = useSelector(state => state.dataIngredient.data)
    useEffect(() => {
        dispatch(dataIngredient())
    }, [dispatch])

    const checkListRecipe = () => {
        return recipeRows.find(
            row => row.ingredientName === '' || row.unit === ''
        )
    }
    const confirmAdd = async (e) => {
        e.preventDefault();

        if (checkListRecipe()) {
            withReactContent(Swal).fire({
                title: "There are uncompleted rows. Please complete them before submitting!",
                backdrop: false,
            });
            return;
        }

        if (existingProduct()) {
            await withReactContent(Swal).fire({
                title: "Product name is existing!",
                backdrop: false,
            });
        } else {
            const result = await withReactContent(Swal).fire({
                title: "Do you want to add this product?",
                showDenyButton: true,
                confirmButtonText: "Add",
                denyButtonText: `Cancel`,
            });

            if (result.isConfirmed) {
                try {
                    await AddProductFunction();
                    await Swal.fire("Saved!", "", "success");
                    setCategoryName("");
                    setProductName("");
                } catch (error) {
                    console.error("Error adding product:", error);
                    Swal.fire("Error!", "Could not save the product.", "error");
                }
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        }
    };

    const AddProductFunction = async () => {

        let data = {
            "product_Name": productName,
            "product_Category": productCategory,
            "price": productPrice,
            "point": productPoint,
            "product_Image": productImage,
            "isActive": true,
        }
        console.log("pImage: " + data)
        dispatch(addDataProduct(data, recipeRows));
    };



    const blue = {
        100: '#DAECFF',
        200: '#80BFFF',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        700: '#0059B2',
    };

    const grey = {
        50: '#F3F6F9',
        100: '#E5EAF2',
        200: '#DAE2ED',
        300: '#C7D0DD',
        400: '#B0B8C4',
        500: '#9DA8B7',
        600: '#6B7A90',
        700: '#434D5B',
        800: '#303740',
        900: '#1C2025',
    };

    const StyledInputRoot = styled('div')(
        ({ theme }) => `
        font-family: 'IBM Plex Sans', sans-serif;
        font-weight: 400;
        border-radius: 8px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
            };
        display: grid;
        grid-template-columns: 1fr 19px;
        grid-template-rows: 1fr 1fr;
        overflow: hidden;
        column-gap: 8px;
        padding: 4px;
      
        &.${numberInputClasses.focused} {
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
        }
      
        &:hover {
          border-color: ${blue[400]};
        }
      
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `,
    );

    const StyledInputElement = styled('input')(
        ({ theme }) => `
        font-size: 0.875rem;
        font-family: inherit;
        font-weight: 400;
        line-height: 1.5;
        grid-column: 1/2;
        grid-row: 1/3;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: inherit;
        border: none;
        border-radius: inherit;
        padding: 8px 12px;
        outline: 0;
      `,
    );

    const StyledButton = styled('button')(
        ({ theme }) => `
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        appearance: none;
        padding: 0;
        width: 19px;
        height: 19px;
        font-family: system-ui, sans-serif;
        font-size: 0.875rem;
        line-height: 1;
        box-sizing: border-box;
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 0;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 120ms;
        type: "button";
        
        &:hover {
          background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
          border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
          cursor: pointer;
        }
      
        &.${numberInputClasses.incrementButton} {
          grid-column: 2/3;
          grid-row: 1/2;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          border: 1px solid;
          border-bottom: 0;
          border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
          background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
          color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
      
          &:hover {
            cursor: pointer;
            color: #FFF;
            background: ${theme.palette.mode === 'dark' ? blue[600] : blue[500]};
            border-color: ${theme.palette.mode === 'dark' ? blue[400] : blue[600]};
          }
        }
      
        &.${numberInputClasses.decrementButton} {
          grid-column: 2/3;
          grid-row: 2/3;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          border: 1px solid;
          border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
          background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
          color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
        }
      
        &:hover {
          cursor: pointer;
          color: #FFF;
          background: ${theme.palette.mode === 'dark' ? blue[600] : blue[500]};
          border-color: ${theme.palette.mode === 'dark' ? blue[400] : blue[600]};
        }
      
        & .arrow {
          transform: translateY(-1px);
        }
      
        & .arrow {
          transform: translateY(-1px);
        }
      `,
    );

    const StyledBox = styled('div')(({ theme }) => ({
        height: 300,
        width: '100%',
        '& .MuiDataGrid-cell--editing': {
            backgroundColor: 'rgb(255,215,115, 0.19)',
            color: '#1a3e72',
            '& .MuiInputBase-root': {
                height: '100%',
            },
        },
        '& .Mui-error': {
            backgroundColor: 'rgb(126,10,15, 0.1)',
            color: '#1a3e55',
            ...theme.applyStyles('dark', {
                backgroundColor: 'rgb(126,10,15, 0)',
            }),
        },
    }));


    const processRowUpdate = (newRow) => {


        const selectedIngredient = listIngredient.find(
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

            listIngredient
                .map(item => item.ingredient_Name)
                .filter(name => !selectedIngredients.includes(name))
        );
    };

    const handleRowEditStop = (params, event) => {
        handleSaveClick(params.id)

    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
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
                    const selectedIngredient = listIngredient.find(
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
            <Stack
                direction="row"
                justifyContent="end"
            >
                <Button

                    variant="outlined"
                    color="neutral"
                    startDecorator={<Add />}
                    onClick={() => handleClickOpen()}
                >
                    Add Product
                </Button>
            </Stack>

            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                disablePortal
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Add Product
                        </Typography>

                    </Toolbar>
                </AppBar>
                <Box>
                    <form
                        onSubmit={confirmAdd}
                    >
                        <Grid container spacing={2} justifyContent="center" >

                            <Grid
                                xs={2}
                                md={4}
                                sx={
                                    {
                                        marginTop: 5
                                    }
                                }
                            >
                                <ImageUpload
                                    onChange={(file) => setProductImage(file)}
                                />
                            </Grid>
                            <Grid
                                xs={10}
                                md={8}
                            >

                                <Box
                                    sx={{
                                        marginTop: 5,
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Grid
                                        container
                                        spacing={2}
                                        sx={
                                            {
                                                justifyContent: 'center'
                                            }
                                        }
                                    >
                                        <Grid
                                            xs={5}
                                        >
                                            <FormLabel>Name</FormLabel>
                                            <Input
                                                autoFocus
                                                required
                                                name="nameProduct"
                                                value={productName}
                                                sx={{
                                                    height: 50,
                                                    width: 300
                                                }}
                                                onChange={(e) => setProductName(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid
                                            xs={7}
                                        >
                                            <FormLabel>Category</FormLabel>
                                            <Autocomplete
                                                sx={{
                                                    height: 50,
                                                    width: 300,
                                                }}
                                                disablePortal
                                                options={listProductCategory}
                                                getOptionLabel={(option) => option.category_Name ? option.category_Name : ""}
                                                name="categoryProduct"
                                                value={categoryName ? { category_Name: categoryName } : null}
                                                onChange={(event, newValue) => {
                                                    if (newValue) {
                                                        setProductCategory(newValue.category_ID); // Lấy category_ID từ mục được chọn
                                                        setCategoryName(newValue.category_Name); // Cập nhật categoryName để hiển thị
                                                    } else {
                                                        setProductCategory(null); // Xử lý khi không có mục nào được chọn
                                                        setCategoryName('')
                                                    }
                                                }}

                                                renderInput={(params) => <TextField
                                                    required
                                                    {...params}

                                                />}
                                            />
                                        </Grid>

                                    </Grid>
                                    <Grid
                                        container
                                        spacing={4}
                                        sx={{
                                            marginTop: 2,
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Grid
                                            xs={5}
                                        >
                                            <FormLabel>Price (VND) </FormLabel>
                                            <BaseNumberInput
                                                min={0}
                                                step={1000}
                                                sx={{
                                                    height: 50,
                                                    width: 300,
                                                }}
                                                slots={{
                                                    root: StyledInputRoot,
                                                    input: StyledInputElement,
                                                    incrementButton: (props) => <StyledButton {...props} type="button" />,
                                                    decrementButton: (props) => <StyledButton {...props} type="button" />,
                                                }}
                                                slotProps={{
                                                    incrementButton: {
                                                        children: '▴',
                                                    },
                                                    decrementButton: {
                                                        children: '▾',
                                                    },
                                                }}
                                                required
                                                name="priceProduct"
                                                value={productPrice}
                                                onChange={(event, val) => setProductPrice(val)}
                                            ></BaseNumberInput>

                                        </Grid>

                                        <Grid
                                            xs={7}
                                        >
                                            <FormLabel>Point</FormLabel>
                                            <BaseNumberInput
                                                min={0}
                                                step={1}
                                                sx={{
                                                    height: 50,
                                                    width: 300,
                                                }}
                                                slots={{
                                                    root: StyledInputRoot,
                                                    input: StyledInputElement,
                                                    incrementButton: (props) => <StyledButton {...props} type="button" />,
                                                    decrementButton: (props) => <StyledButton {...props} type="button" />,
                                                }}
                                                slotProps={{

                                                    incrementButton: {
                                                        children: '▴',
                                                    },
                                                    decrementButton: {
                                                        children: '▾',
                                                    },
                                                }}
                                                required
                                                name="pointProduct"
                                                value={productPoint}
                                                onChange={(event, val) => setProductPoint(val)}
                                            ></BaseNumberInput>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>

                        </Grid>



                        <Grid
                            container
                            sx={{
                                marginTop: 5,
                                justifyContent: 'center'
                            }}
                        >
                            <Grid
                                size={10}
                            >
                                <Box
                                    sx={{
                                        height: 500,
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

                        </Grid>


                        <Box
                            textAlign="center"
                            sx={{
                                marginTop: 4
                            }}
                        >
                            <Button
                                sx={
                                    {
                                        marginTop: 5,
                                    }
                                }
                                type="submit"

                            >
                                Submit
                            </Button>
                        </Box>
                    </form >
                </Box >
            </Dialog >
        </>
    );

}