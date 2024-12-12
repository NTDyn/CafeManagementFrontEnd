import React, { useState, useEffect } from "react"
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
import Add from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import { getInitialData, addData } from "../../../redux/actions/ingredient";
import { getInitialData as getIngredientCategory } from "../../../redux/actions/ingredientCategory";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import {
    Unstable_NumberInput as BaseNumberInput,
    numberInputClasses,
} from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';

export default function AddIngredient() {

    const [ingredientName, setIngredientName] = useState("");
    const [ingredientCategory, setIngredientCategory] = useState("")
    const [categoryName, setCategoryName] = useState("");
    const [ingredientType, setIngredientType] = useState("");
    const [typeName, setTypeName] = useState('');
    const [unitMin, setUnitMin] = useState("");
    const [unitMax, setUnitMax] = useState("");
    const [unitTransfer, setUnitTransfer] = useState("");
    const [transferPerMin, setTransferPerMin] = useState(0);
    const [maxPerTransfer, setMaxPerTransfer] = useState(0);
    const [isActive, setIsActive] = useState("");
    const [open, setOpen] = useState(false);

    const dataIngredient = useSelector(state => state.dataIngredient.data)
    const dataIngredientCategory = useSelector(state => state.dataIngredientCategory.data)
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

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getInitialData())
    }, [dispatch])

    const dispatchCategory = useDispatch()
    useEffect(() => {
        dispatchCategory(getIngredientCategory())
    }, [dispatchCategory])


    const existingCategory = () => {

        dataIngredient.find(
            dataIngredient => dataIngredient.ingredient_Name === ingredientName
        )
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        handleClose()
        if (existingCategory()) {
            notificationSwal("Ingredient name is existing!")
        } else {
            confirmSwal()
        }


    }

    const addIngredient = () => {
        let data = {
            "ingredient_Name": "" + ingredientName + "",
            "ingredient_Category": ingredientCategory,
            "ingredient_Type": ingredientType,
            "unit_Min": unitMin,
            "unit_Max": unitMax,
            "unit_Transfer": unitTransfer,
            "transferPerMin": transferPerMin,
            "maxPerTransfer": maxPerTransfer,
            "isActive": true
        }
        dispatch(addData(data));
        setIngredientName('');
        setIngredientCategory('');
        setCategoryName('');
        setIngredientType('');
        setTypeName('');
        setUnitMax('');
        setUnitMin('');
        setMaxPerTransfer('');
        setTransferPerMin('');
    }


    const confirmSwal = () => {
        withReactContent(Swal).fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            if (result.isConfirmed) {
                addIngredient()
                Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }

        })
    }

    const notificationSwal = (noti) => {
        withReactContent(Swal).fire({
            title: noti,
        })
    }

    const handleClose = () => {
        setIngredientName("");
        setOpen(false);
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


    return (
        <React.Fragment>
            <Button
                variant="outlined"
                color="neutral"
                startDecorator={<Add />}
                onClick={() => setOpen(true)}
            >
                Add Ingredient
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog>
                    <DialogTitle>Create new ingredient</DialogTitle>
                    <DialogContent>Fill in the information.</DialogContent>
                    <form
                        onSubmit={handleSubmit}
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
                                    name="categoryIngredient"
                                    value={categoryName ? { ingredient_Category_Name: categoryName } : null}
                                    onChange={(event, newValue) => {
                                        if (newValue) {
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
                                    value={typeName ? { ingredient_Type_Name: typeName } : null}
                                    onChange={(event, newValue) => {
                                        if (newValue) {
                                            setIngredientType(newValue.ingredient_Type_ID); // Lấy category_ID từ mục được chọn
                                            setTypeName(newValue.ingredient_Type_Name); // Cập nhật categoryName để hiển thị
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
                                Add ingredient
                            </Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
