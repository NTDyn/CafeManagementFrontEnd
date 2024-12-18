import React, { useState, useEffect, useMemo } from "react"
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
import { getInitialData } from "../../../redux/actions/products";
import { updateData } from "../../../redux/actions/products";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Modal } from "@mui/material";
import Swal from 'sweetalert2'
import Grid from '@mui/material/Grid2';
import withReactContent from 'sweetalert2-react-content';
import '../../../css/backend/product/index.css'
import DeleteIcon from '@mui/icons-material/Delete';
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
import { ModalDialog } from "@mui/joy";

export default function UpdateProduct({ product, buttonLabel }) {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getInitialData())
    }, [dispatch])

    const listIngredient = useSelector((state) => state.dataIngredient.data);
    const initialRows = useMemo(() => {

        if (product.productRecipe) {
            return product.productRecipe.map(element => {
                const ingredient = listIngredient.find(ing => ing.ingredient_ID === element.ingredient_ID);
                return {
                    ...element,
                    id: element.recipe_ID,
                    ingredientName: ingredient ? ingredient.ingredient_Name : null // Nếu không tìm thấy ingredient thì trả về null
                };
            });
        }
        return [];
    }, [product.productRecipe, listIngredient]);;
    const [recipeRows, setRecipeRows] = useState(initialRows);
    const [currentId, setCurrentId] = useState(1); // Bắt đầu từ ID 1
    const [rowModesModel, setRowModesModel] = useState({});
    const [open, setOpen] = useState(false);
    const [productName, setProductName] = useState(product.product_Name);
    const [productPrice, setProductPrice] = useState(product.price);
    const [productPoint, setProductPoint] = useState(product.point);
    const listProductCategory = useSelector(state => state.dataProductCategory.data);
    const [productCategory, setProductCategory] = useState(product.product_Category);
    const [categoryName, setCategoryName] = useState(listProductCategory?.find(cate => cate.category_ID === productCategory)?.category_Name || '');
    const [productImage, setProductImage] = useState(product.product_Image);
    const [baseURL, setBaseURL] = useState(null);



    const listProduct = useSelector(state => state.dataProduct.data)
    const existingProduct = () => {
        if (productName === product.product_Name) {
            return null
        }
        return listProduct.find(
            listProduct => listProduct.product_Name === productName
        )
    }



    const checkListRecipe = () => {
        return recipeRows.find(
            row => row.ingredientName === '' || row.unit === ''
        )
    }
    const handleSetBaseURL = (base64) => {
        setProductImage(base64)

    };


    const UpdateInformation = () => {
        let img = null;
        if (productImage !== product.product_Image) {
            img = productImage
        }
        let data = {
            "product_ID": product.product_ID,
            "product_Name": productName,
            "product_Category": productCategory,
            "price": productPrice,
            "point": productPoint,
            "product_Image": img,
            "productRecipe": recipeRows,
        }
        console.log(data)
        dispatch(updateData(data));

    };
    const UpdateIsActive = () => {

        let data = {
            "product_ID": product.product_ID,
            "isActive": !product.isActive,
            "productRecipe": []
        }
        dispatch(updateData(data));

    };

    const confirmIsActive = () => {
        if (product.isActive === false) {
            withReactContent(Swal).fire({
                title: "Do you want to unlock this product?",
                showDenyButton: true,
                confirmButtonText: "UnLock",
                denyButtonText: `Cancel`
            }).then((result) => {
                if (result.isConfirmed) {
                    UpdateIsActive()

                    Swal.fire("Saved!", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            })
        }
        if (product.isActive === true) {
            withReactContent(Swal).fire({
                title: "Do you want to lock this product?",
                showDenyButton: true,
                confirmButtonText: "Lock",
                denyButtonText: `Cancel`
            }).then((result) => {
                if (result.isConfirmed) {
                    UpdateIsActive()

                    Swal.fire("Saved!", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }

            })
        }

    }
    const confirmUpdate = async (e) => {
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
                title: "Do you want to update this product?",
                showDenyButton: true,
                confirmButtonText: "Update",
                denyButtonText: `Cancel`,
            });

            if (result.isConfirmed) {
                try {
                    await UpdateInformation();
                    await Swal.fire("Saved!", "", "success");
                    setCategoryName(categoryName);
                    setProductName(productName);
                } catch (error) {
                    console.error("Error adding product:", error);
                    Swal.fire("Error!", "Could not update the product.", "error");
                }
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        }
    };



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
        const updatedRow = { ...newRow, isNew: false, product_ID: -1 };

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
                { id: currentId, ingredient_ID: '', ingredientName: '', unit: '', quantity: '', isNew: true, product_ID: -1 },
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
    const randomImage = (_imageLink) => {

        return `${_imageLink}`;
    }
    return (
        <>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        sx={{ width: '80px', bgcolor: '#23a736' }}
                        onClick={confirmIsActive}
                    >
                        {buttonLabel}
                    </Button>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    sx={{ width: '80px', bgcolor: '#185ea5' }}
                    onClick={() => setOpen(true)}
                >
                    Edit
                </Button>
            </Box>
            <Modal
                open={open}
                onClose={() => setOpen(false)}

            >
                <ModalDialog sx={{ width: '80%', background: '#f0f8ff', display: 'flex', maxHeight: '95vh', overflow: 'auto' }}>
                    <AppBar sx={{ position: 'relative', maxHeight: 40, }}>
                        <Toolbar sx={{ display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start' }}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1, alignContent: 'center' }} variant="h6" component="div">
                                Edit Product Information
                            </Typography>

                        </Toolbar>
                    </AppBar>
                    <Box sx={{ width: '100%' }}>
                        <form
                            onSubmit={confirmUpdate}
                        >
                            <Grid container spacing={4} justifyContent="center" >

                                <Grid size={4} sx={{ marginTop: 2 }}>
                                    <ImageUpload
                                        initialImage={
                                            product.product_Image
                                                ? randomImage(`${process.env.REACT_APP_BASE_URL}/${product.product_Image}`)
                                                : null
                                        }
                                        onSetBaseURL={handleSetBaseURL}

                                    />

                                </Grid>
                                <Grid size={8}>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            marginTop: 3,
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
                                            <Grid size={5}>
                                                <FormLabel>Name</FormLabel>
                                                <Input
                                                    autoFocus
                                                    required
                                                    name="nameProduct"
                                                    value={productName}
                                                    sx={{
                                                        marginTop: '1%',
                                                        height: 50,
                                                        width: 300
                                                    }}
                                                    onChange={(e) => setProductName(e.target.value)}
                                                />
                                            </Grid>
                                            <Grid size={7}>
                                                <FormLabel>Category</FormLabel>
                                                <Autocomplete
                                                    sx={{
                                                        marginTop: '1%',
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
                                            <Grid size={5}  >
                                                <FormLabel sx={{ marginBottom: '1%', }}>Price (VND) </FormLabel>
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
                                                    value={(productPrice)}
                                                    onChange={(event, val) => setProductPrice(val)}
                                                ></BaseNumberInput>
                                            </Grid>

                                            <Grid size={7}>
                                                <FormLabel sx={{ marginBottom: '1%', }}>Point</FormLabel>
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

                            </Grid>

                            <Grid container sx={{ justifyContent: 'center', marginTop: '1%' }}>
                                <Box container >
                                    <Button type="submit" sx={{ fontSize: '20px', fontWeight: 'bold' }} >
                                        Update
                                    </Button>
                                </Box>
                            </Grid>
                        </form >
                    </Box >
                </ModalDialog >
            </Modal >
        </>
    );

}



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
function formatPrice(value) {
    if (!value && value !== 0) return '0'; // Tránh lỗi nếu giá trị không xác định
    return new Intl.NumberFormat('en-US', {
        //  style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0, // Không cần hiển thị phần thập phân
    }).format(value);
}