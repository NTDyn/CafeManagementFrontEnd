import React, { useState, useEffect } from "react"
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import { getInitialData } from "../../../redux/actions/productCategory";
import { addData, getInitialData as dataProduct } from "../../../redux/actions/products";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from "@mui/material";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import '../../../css/backend/product/index.css'
import {
    Unstable_NumberInput as BaseNumberInput,
    numberInputClasses,
} from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';



export default function AddProduct() {

    const dispatchCategory = useDispatch()
    useEffect(() => {
        dispatchCategory(getInitialData())
    }, [dispatchCategory])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(dataProduct())
    }, [dispatch])

    const [open, setOpen] = useState(false);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productPoint, setProductPoint] = useState(0);
    const [productCategory, setProductCategory] = useState('');
    const [categoryName, setCategoryName] = useState('');

    const listProductCategory = useSelector(state => state.dataProductCategory.data);
    const listProduct = useSelector(state => state.dataProduct.data)
    const existingProduct = () => {
        return listProduct.find(
            listProduct => listProduct.product_Name === productName
        )
    }

    const confirmAdd = (e) => {
        e.preventDefault();
        if (existingProduct()) {
            withReactContent(Swal).fire({
                title: "Product name is existing!",
                backdrop: false,
            });
        } else {
            withReactContent(Swal).fire({
                title: "Do you want to add the this product?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Add",
                denyButtonText: `Cancel`
            }).then((result) => {
                if (result.isConfirmed) {
                    AddProductFunction();
                    Swal.fire("Saved!", "", "success");
                    setCategoryName("");
                    setProductName("");
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }

            })


        }
    }

    const AddProductFunction = () => {

        let data = {
            "product_Name": productName,
            "product_Category": productCategory,
            "price": productPrice,
            "point": productPoint,
            "isActive": true,
        }

        dispatch(addData(data));

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
        <>
            <Stack
                direction="row"
                justifyContent="end"
            >
                <Button

                    variant="outlined"
                    color="neutral"
                    startDecorator={<Add />}
                    onClick={() => setOpen(true)}
                >
                    Add Product
                </Button>
            </Stack>


            <Modal
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    zIndex: 1000
                }}
            >
                <ModalDialog>
                    <DialogTitle
                        sx={{
                            justifyContent: "center"
                        }}
                    >
                        Add a product
                    </DialogTitle>

                    <form
                        onSubmit={confirmAdd}
                    >
                        <Stack >
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    autoFocus
                                    required
                                    name="nameProduct"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                            </FormControl>
                            <FormControl
                                sx={{ marginTop: 2 }}
                            >
                                <FormLabel>Price (VND) </FormLabel>
                                <BaseNumberInput
                                    min={0}
                                    step={1000}
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

                            </FormControl>
                            <FormControl
                                sx={{ marginTop: 2 }}
                            >
                                <FormLabel>Category</FormLabel>
                                <Autocomplete

                                    disablePortal
                                    options={listProductCategory}
                                    getOptionLabel={(option) => option.category_Name ? option.category_Name : ""}
                                    sx={
                                        {
                                            width: 300,
                                        }
                                    }
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
                            </FormControl>
                            <FormControl
                                sx={{ marginTop: 2 }}
                            >
                                <FormLabel>Point</FormLabel>
                                <BaseNumberInput
                                    min={0}
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
                                    required
                                    name="pointProduct"
                                    value={productPoint}
                                    onChange={(event, val) => setProductPoint(val)}
                                ></BaseNumberInput>
                            </FormControl>



                        </Stack>

                        <Box
                            textAlign="center"
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


                    </form>
                </ModalDialog>
            </Modal >
        </>
    );

}