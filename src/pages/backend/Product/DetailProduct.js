import Button from '@mui/joy/Button';
import Grid from '@mui/material/Grid2';
import React, { useEffect, useMemo, useState } from "react"
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
import {
    GridRowModes,
    DataGrid,
} from '@mui/x-data-grid';
import ImageCarousel from './ImageCarousel'
import { getInitialData as dataProduct } from "../../../redux/actions/products";
import { getInitialData as dataProductRecipe } from '../../../redux/actions/productRecipe';
import { getInitialData as dataProductCategory } from '../../../redux/actions/productCategory';
function DetailProduct({ product }) {

    const [IDProduct, setIDProduct] = useState(product.product_ID)
    const [openDetail, setOpenDetail] = useState(false);
    const [nameProduct, setNameProduct] = useState(product.product_Name);
    const [priceProduct, setPriceProduct] = useState(formatPrice(product.price));
    const [pointProduct, setPointProduct] = useState(product.point);
    const listProductCategory = useSelector(state => state.dataProductCategory.data || [])
    const cateProduct = useMemo(() => {
        return listProductCategory.find(category => category.category_ID === product?.product_Category);
    }, [listProductCategory, product?.product_Category]);

    const [categoryProduct, setCategoryProduct] = useState(cateProduct?.category_Name || '');
    const listIngredient = useSelector((state) => state.dataIngredient.data);
    const [recipeRows, setRecipeRows] = useState(product.productRecipe);
    useEffect(() => {
        // Kiểm tra xem product.productRecipe có tồn tại không và nếu có thì thực hiện thay đổi
        if (product.productRecipe) {
            const updatedRecipeRows = product.productRecipe.map(element => {
                const ingredient = listIngredient.find(ing => ing.ingredient_ID === element.ingredient_ID);
                return {
                    ...element,
                    id: element.recipe_ID,
                    ingredientName: ingredient ? ingredient.ingredient_Name : null // Nếu không tìm thấy ingredient thì trả về null
                };
            });

            setRecipeRows(updatedRecipeRows);
        }
    }, [product.productRecipe, listIngredient]);
    const [productImages, setProductImages] = useState(product.productImage)

    function formatPrice(value) {
        if (!value && value !== 0) return '0'; // Tránh lỗi nếu giá trị không xác định
        return new Intl.NumberFormat('en-US', {
            //  style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0, // Không cần hiển thị phần thập phân
        }).format(value);
    }

    const columns = [
        {
            field: 'ingredientName',
            headerName: 'Ingredient',
            width: 280,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'unit',
            headerName: 'Unit',
            width: 150,
            align: 'center',
            headerAlign: 'center',

        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            type: 'number',
            width: 150,
            align: 'center',
            headerAlign: 'center',
        },


    ];
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    sx={{ width: '80px', bgcolor: '#a79c9c' }}
                    onClick={() => setOpenDetail(true)}
                >
                    Detail
                </Button>
            </Box>

            <Modal
                open={openDetail}
                onClose={() => setOpenDetail(false)}
            >
                <ModalDialog sx={{ width: '70%' }}>
                    <Grid container spacing={2}>
                        <Grid size={4}>
                            <img
                                src={`${process.env.REACT_APP_BASE_URL}/${product.product_Image}`}
                                style={{ width: '100%' }} >
                            </img>
                        </Grid>
                        <Grid size={8} >
                            <Box
                                sx={{
                                    marginTop: 5,
                                    marginLeft: 2,
                                    justifyContent: 'center'
                                }}
                            >
                                <Grid
                                    container
                                    spacing={15}
                                >
                                    <Grid size={5}>
                                        <FormLabel>Name</FormLabel>
                                        <TextField
                                            variant="standard"
                                            slotProps={{
                                                input: {
                                                    readOnly: true,
                                                },
                                            }}
                                            sx={
                                                {
                                                    width: 300
                                                }
                                            }
                                            name="nameProduct"
                                            value={nameProduct ? nameProduct : ''}
                                        >
                                        </TextField>
                                    </Grid>
                                    <Grid size={5} >
                                        <FormLabel>Category</FormLabel>
                                        <TextField
                                            variant="standard"
                                            slotProps={{
                                                input: {
                                                    readOnly: true,
                                                },
                                            }}
                                            sx={
                                                {
                                                    width: 300
                                                }
                                            }
                                            name="productCategory"
                                            value={categoryProduct ? categoryProduct : ''}
                                        >
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    spacing={15}
                                    sx={{ marginTop: 2 }}
                                >
                                    <Grid size={5} >
                                        <FormLabel>Price (VND) </FormLabel>
                                        <TextField
                                            variant="standard"
                                            slotProps={{
                                                input: {
                                                    readOnly: true,
                                                },
                                            }}
                                            sx={
                                                {
                                                    width: 300
                                                }
                                            }
                                            name="priceProduct"
                                            value={priceProduct ? priceProduct : ''}
                                        >
                                        </TextField>

                                    </Grid>

                                    <Grid size={5}>
                                        <FormLabel>Point</FormLabel>
                                        <TextField
                                            variant="standard"
                                            slotProps={{
                                                input: {
                                                    readOnly: true,
                                                },
                                            }}
                                            sx={
                                                {
                                                    width: 300
                                                }
                                            }
                                            name="pointProduct"
                                            value={pointProduct ? pointProduct : ''}
                                        >
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Grid container sx={{ marginTop: 5 }}>
                                    <Grid size={12}>
                                        <Box
                                            sx={{
                                                height: 300,
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
                                                noRowsOverlay={() => <Box>No data available</Box>}
                                            />
                                        </Box>
                                    </Grid>

                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>


                </ModalDialog>
            </Modal>
        </>
    )
}

export default DetailProduct;