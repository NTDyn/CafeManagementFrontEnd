import { getInitialData, updateData } from "../../../redux/actions/ingredient";
import { getInitialData as getIngredientCategory } from "../../../redux/actions/ingredientCategory";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import Grid from '@mui/material/Grid2';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import {
    Unstable_NumberInput as BaseNumberInput,
    numberInputClasses,
} from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';

function UpdateIngredient({ buttonLabel, ingredient }) {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [ingredientName, setIngredientName] = useState(ingredient.ingredient_Name);
    const [ingredientCategory, setIngredientCategory] = useState(ingredient.ingredient_Category)
    const [ingredientType, setIngredientType] = useState(ingredient.ingredient_Type);
    const [unitMin, setUnitMin] = useState(ingredient.unit_Min);
    const [unitMax, setUnitMax] = useState(ingredient.unit_Max);
    const [unitTransfer, setUnitTransfer] = useState(ingredient.unit_Transfer);
    const [transferPerMin, setTransferPerMin] = useState(ingredient.transferPerMin);
    const [maxPerTransfer, setMaxPerTransfer] = useState(ingredient.maxPerTransfer);
    const [isActive, setIsActive] = useState(ingredient.isActive);
    const dataIngredient = useSelector(state => state.dataIngredient.data)
    const dataIngredientCategory = useSelector(state => state.dataIngredientCategory.data)
    const nameCate = dataIngredientCategory.find(
        cate => cate.ingredient_Category_ID === ingredient.ingredient_Category
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


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getInitialData())
    }, [dispatch])

    const dispatchCategory = useDispatch()
    useEffect(() => {
        dispatchCategory(getIngredientCategory())
    }, [dispatchCategory])


    const UpdateInformation = () => {

        let data = {
            "ingredient_ID": ingredient.ingredient_ID,
            "ingredient_Name": ingredientName,
            "ingredient_Category": ingredientCategory,
            "ingredient_Type": ingredientType,
            "unit_Min": unitMin,
            "unit_Max": unitMax,
            "unit_Transfer": unitTransfer,
            "transferPerMin": transferPerMin,
            "maxPerTransfer": maxPerTransfer,

        }
        dispatch(updateData(data));

    };

    const UpdateIsActive = () => {

        let data = {
            "ingredient_ID": ingredient.ingredient_ID,
            "isActive": isActive ? false : true
        }
        dispatch(updateData(data));

    };

    const confirmIsActive = () => {
        if (ingredient.isActive === false) {
            withReactContent(Swal).fire({
                title: "Do you want to unlock this ingredient?",
                showDenyButton: true,
                confirmButtonText: "UnLock",
                denyButtonText: `Cancel`
            }).then((result) => {
                if (result.isConfirmed) {
                    UpdateIsActive()
                    setIsActive(true)
                    Swal.fire("Saved!", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            })
        }
        if (ingredient.isActive === true) {
            withReactContent(Swal).fire({
                title: "Do you want to lock this ingredient?",
                showDenyButton: true,
                confirmButtonText: "Lock",
                denyButtonText: `Cancel`
            }).then((result) => {
                if (result.isConfirmed) {
                    UpdateIsActive()
                    setIsActive(false)
                    Swal.fire("Saved!", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }

            })
        }

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

    const existingIngredient = () => {
        if (ingredientName !== ingredient.ingredient_Name) {
            dataIngredient.find(
                dataIngredient => dataIngredient.ingredient_Name === ingredientName
            )
        }
    }
    function confirmInformation(e) {
        e.preventDefault()
        if (existingIngredient()) {
            Swal.fire("Ingredient name is existing");
        } else {
            withReactContent(Swal).fire({
                title: "Do you want to change information of this ingredient?",
                showDenyButton: true,
                confirmButtonText: "Change",
                denyButtonText: `Cancel`
            }).then((result) => {
                if (result.isConfirmed) {
                    UpdateInformation();
                    Swal.fire("Saved!", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }

            })
        }
        handleClose()
    }

    const handleClose = () => {
        setOpenEdit(false);
    };


    const theme = createTheme({
        palette: {
            primary: {
                light: blue[300],
                main: blue[500],
                dark: blue[700],
                darker: blue[900],
            },
        },
    });



    return (
        <  >
            <React.Fragment>
                <Grid container spacing={2} justifyContent="center">
                    <Grid xs={3}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                sx={{ width: '80px', bgcolor: '#23a736' }}
                                onClick={confirmIsActive}
                            >
                                {buttonLabel}
                            </Button>
                        </Box>
                    </Grid>

                    <Grid xs={3}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                sx={{ width: '80px', bgcolor: '#61a7ed' }}
                                onClick={() => setOpenEdit(true)}
                            >
                                Edit
                            </Button>
                        </Box>
                    </Grid>


                </Grid>


                <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
                    <ModalDialog>
                        <DialogTitle>Update information of ingredient</DialogTitle>
                        <DialogContent>Fill in the information.</DialogContent>
                        <form
                            onSubmit={confirmInformation}
                        >
                            <Stack spacing={2}>
                                <FormControl>
                                    <FormLabel>Ingredient Name</FormLabel>
                                    <Input
                                        autoFocus
                                        required
                                        name="nameIngredient"
                                        value={ingredientName}
                                        onChange={(e) => setIngredientName(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl
                                    sx={{ marginTop: 2 }}
                                >
                                    <FormLabel>Ingredient Category</FormLabel>
                                    <Autocomplete

                                        disablePortal
                                        options={dataIngredientCategory}
                                        getOptionLabel={(option) => option.ingredient_Category_Name ? option.ingredient_Category_Name : ""}
                                        name="categoryArea"
                                        value={categoryName ? { ingredient_Category_Name: categoryName } : null}
                                        onChange={(event, newValue) => {
                                            if (newValue) {
                                                console.log(newValue)
                                                setIngredientCategory(newValue.ingredient_Category_ID); // Lấy category_ID từ mục được chọn
                                                setCategoryName(newValue.ingredient_Category_Name); // Cập nhật categoryName để hiển thị
                                            } else {
                                                setIngredientCategory(null); // Xử lý khi không có mục nào được chọn
                                                setCategoryName('');
                                            }
                                        }}
                                        renderInput={(params) => <TextField
                                            required
                                            {...params}

                                        />}
                                    />
                                </FormControl>
                                {/* Category Type */}
                                <FormControl
                                    sx={{ marginTop: 2 }}
                                >
                                    <FormLabel>Ingredient Type</FormLabel>
                                    <Autocomplete

                                        disablePortal
                                        options={dataIngredientType}
                                        getOptionLabel={(option) => option.ingredient_Type_Name ? option.ingredient_Type_Name : ""}
                                        name="categoryType"
                                        value={typeName ? { ingredient_Type_Name: typeName } : ''}
                                        onChange={(event, newValue) => {
                                            if (newValue) {
                                                setIngredientType(newValue.ingredient_Type_ID);
                                                setTypeName(newValue.ingredient_Type_Name);
                                            } else {
                                                setIngredientType(null); // Xử lý khi không có mục nào được chọn
                                                setTypeName('');
                                            }
                                        }}

                                        renderInput={(params) => <TextField
                                            required
                                            {...params}

                                        />}
                                    />
                                </FormControl>
                                <Stack
                                    spacing={2}
                                    direction="row"
                                >
                                    <FormControl>
                                        <FormLabel>Unit Min</FormLabel>
                                        <Input
                                            autoFocus
                                            required
                                            name="unitMin"
                                            value={unitMin}
                                            onChange={(e) => setUnitMin(e.target.value)}
                                        >
                                        </Input>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Unit Transfer</FormLabel>
                                        <Input
                                            autoFocus
                                            required
                                            name="unitTransfer"
                                            value={unitTransfer}
                                            onChange={(e) => setUnitTransfer(e.target.value)}
                                        >
                                        </Input>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Unit Max</FormLabel>
                                        <Input
                                            autoFocus
                                            required
                                            name="unitMax"
                                            value={unitMax}
                                            onChange={(e) => setUnitMax(e.target.value)}
                                        >
                                        </Input>
                                    </FormControl>
                                </Stack>
                                <Stack
                                    spacing={2}
                                    direction="row"
                                >
                                    <FormControl>
                                        <FormLabel> 1 {unitMax} = ... {unitTransfer}</FormLabel>
                                        <BaseNumberInput
                                            min={1}
                                            step={1}
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
                                            autoFocus
                                            required
                                            name="maxPerTransfer"
                                            value={maxPerTransfer}
                                            onChange={(event, val) => setMaxPerTransfer(val)}
                                        >
                                        </BaseNumberInput>

                                    </FormControl>

                                    <FormControl>
                                        <FormLabel> 1 {unitTransfer} = ... {unitMin}</FormLabel>
                                        <BaseNumberInput
                                            min={1}
                                            step={1}
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
                                            autoFocus
                                            required
                                            name="transferPerMin"
                                            value={parseFloat(transferPerMin)}
                                            type="number"
                                            onChange={(e, val) => setTransferPerMin(val)}

                                        >
                                        </BaseNumberInput>
                                    </FormControl>

                                </Stack>
                                <Button
                                    type="submit"

                                >
                                    Update ingredient
                                </Button>
                            </Stack>
                        </form>
                    </ModalDialog>
                </Modal>


            </React.Fragment >
        </ >
    );
};

// DeleteCategory.propTypes = {
//     categoryID: PropTypes.number.isRequired,
// }


export default UpdateIngredient;
