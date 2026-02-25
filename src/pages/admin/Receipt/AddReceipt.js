import React, { useState, useEffect } from "react"
import Button from '@mui/material/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'
import Grid2 from '@mui/material/Grid2';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from "@mui/material";
import { getInitialData as getMenuDetail } from "../../../redux/actions/menuDetail";
import DeleteIcon from '@mui/icons-material/Delete';
import { getProductChoice } from "../../../redux/actions/products";
import { addData } from "../../../redux/actions/customer";

export default function AddReceipt({ customerList, menuData, productData }) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [isExistingCustomer, setIsExistingCustomer] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const menuDetail = useSelector(state => state.dataMenuDetail.data);
    const productChoices = useSelector(state => state.dataProduct.productChoice);

    useEffect(() => {
        if (menuData?.menu_ID) {
            dispatch(getMenuDetail(menuData?.menu_ID));  // Tải menuDetail khi Modal mở
        }

    }, [dispatch, menuData?.menu_ID]);

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setCustomerPhone(value);

        const foundCustomer = customerList.find(
            (customer) => customer.customer_Phone === value
        );

        if (foundCustomer) {
            setCustomerName(foundCustomer.customer_Name);
            setCustomerAddress(foundCustomer.customer_Address);
            setIsExistingCustomer(true);
        } else {
            setCustomerName('');
            setCustomerAddress('');
            setIsExistingCustomer(false);
        }
    };


    const formatCurrency = (number) => {
        return number.toLocaleString('vi-VN');
    }

    const handleAddProduct = async (product) => {
        if (product) {
            const productChoices = await dispatch(getProductChoice(product.product_ID));
            const sizeOptions = productChoices[0]?.productOptions
            const getProduct = productData?.find(pr => pr.product_ID === sizeOptions[0]?.product_ID);
            const tempID = Date.now();
            if (getProduct) {
                setSelectedProducts(prev => [
                    ...prev,
                    {
                        ...product,
                        setup_ID: tempID,
                        quantity: 1,
                        sizeOptions: sizeOptions,
                        size: null,
                        price: getProduct?.price
                    }
                ]);
            }
        }
    };

    const handleRemoveProduct = (id) => {
        setSelectedProducts(prev => prev.filter(p =>
            p.setup_ID !== id

        ));
    };
    const handleProcessRowUpdate = (newRow) => {

        if (newRow.quantity < 1) {
            newRow.quantity = 1;  // Đặt lại giá trị quantity là 1
        }
        setSelectedProducts(prev =>
            prev.map(row =>
                row.setup_ID === newRow.setup_ID || row.product_ID === newRow.product_ID
                    ? newRow
                    : row
            )
        );
        return newRow;
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;  // Số điện thoại Việt Nam
        return phoneRegex.test(phoneNumber);
    };

    const validateName = (name) => {
        const nameRegex = /^[A-Za-zÀ-ỹ\s]+$/;  // Chỉ chứa chữ cái và dấu cách
        return nameRegex.test(name) && name.length >= 1 && name.length <= 50;
    };

    const validateAddress = (address) => {
        const addressRegex = /^[A-Za-z0-9À-ỹ\s,.-]+$/;  // Chữ cái, số và dấu cách, dấu phẩy, dấu chấm
        return addressRegex.test(address) && address.length >= 1 && address.length <= 100;
    };

    const validateCustomer = (phoneNumber, name, address) => {
        // if (!validatePhoneNumber(phoneNumber)) {
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Error',
        //         text: 'Invalid phone number! ',
        //     });
        //     return false;  // Trả về false nếu thông tin sai
        // }
        // if (!validateName(name)) {
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Error',
        //         text: 'Invalid name!',
        //     });
        //     return false;  // Trả về false nếu thông tin sai
        // }
        // if (!validateAddress(address)) {
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Error',
        //         text: 'Invalid address!',
        //     });
        //     return false;  // Trả về false nếu thông tin sai
        // }
        return true;  // Trả về true nếu tất cả đều hợp lệ
    };


    const handleAddReceipt = async (event) => {
        event.preventDefault()

        if (validateCustomer(customerPhone, customerName, customerAddress)) {
            const foundCustomer = customerList.find(
                (customer) => customer.customer_Phone === customerPhone
            );
            let customerID = -1;
            if (!foundCustomer) {
                const data = {
                    "customer_Name": customerName,
                    "customer_Phone": customerPhone,
                    "customer_Address": customerAddress,
                    "username": customerPhone,
                    "password": customerPhone,
                    "level_ID": 1,
                    "isActive": true
                }
                const response = await dispatch(addData(data));
                if (response?.customer_Id != null) {
                    customerID = response?.data?.customer_Id

                }
                console.log(response)

            }

            console.log(customerID)
            // Tổng hợp lại danh sách sản phẩm, nếu trùng thì cộng quantity
            const updatedProducts = selectedProducts.reduce((acc, product) => {
                const existingProduct = acc.find(
                    p => p.product_ID === product.product_ID && p.size?.product_ID === product.size?.product_ID
                );

                if (existingProduct) {
                    // Nếu sản phẩm đã tồn tại, cộng quantity
                    existingProduct.quantity += product.quantity;
                } else {
                    // Nếu sản phẩm chưa có, thêm vào danh sách
                    acc.push({ ...product });
                }
                return acc;
            }, []);
            console.log(updatedProducts)
        }

    };


    const columns = [

        {
            field: 'product_Name',
            headerName: 'Product',
            flex: 1,
            with: 250,
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 100,
            valueFormatter: (params) => {
                return `${formatCurrency(params)} đ`;
            }
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            width: 100,
            editable: true,
            type: 'number',

        },
        {
            field: 'size',
            headerName: 'Size',
            width: 200,
            renderCell: (params) => {
                const handleOptionChange = (event, newValue) => {
                    const newProduct = productData?.find(pr => pr.product_ID == newValue?.product_ID)
                    setSelectedProducts((prev) =>
                        prev.map((item) =>
                            item.setup_ID === params.row.setup_ID
                                ? {
                                    ...item,
                                    product_ID: newProduct?.product_ID,
                                    size: newValue,
                                    price: newProduct?.price || item.price,
                                }
                                : item
                        )
                    );
                };

                return (
                    <Autocomplete
                        disableClearable
                        options={params.row.sizeOptions || []}
                        getOptionLabel={(option) => option.title || ''}
                        value={params.row.size}
                        onChange={handleOptionChange}
                        size="small"
                        renderInput={(params) => <TextField {...params} />}
                    />
                );
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            renderCell: (params) => (
                <Button
                    color="error"
                    onClick={() => handleRemoveProduct(params.row.setup_ID)}
                >
                    <DeleteIcon></DeleteIcon>
                </Button>
            ),
        }
    ];

    return (
        <>
            <Button
                variant="outlined"
                color="neutral"
                startIcon={<Add />}
                onClick={() => setOpen(true)}
            >
                Add Receipt
            </Button>
            <Modal open={open} onClose={() => setOpen(false)} >
                <ModalDialog sx={{ width: '80%' }}>
                    <form onSubmit={handleAddReceipt} >
                        <Stack spacing={2}>
                            <Grid2 container spacing={2} sx={{ marginTop: 2 }}>
                                <Grid2 size={3} >
                                    <FormControl>
                                        <FormLabel>Customer Phone</FormLabel>
                                        <Input
                                            autoFocus
                                            required
                                            name="phoneCustomer"
                                            value={customerPhone}
                                            onChange={handlePhoneChange}
                                        />
                                    </FormControl>
                                </Grid2>
                                <Grid2 size={4}>
                                    <FormControl >
                                        <FormLabel>Customer Name</FormLabel>
                                        <Input
                                            required
                                            name="nameCustomer"
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            disabled={isExistingCustomer}
                                        />
                                    </FormControl>
                                </Grid2>
                                <Grid2 size={5}>
                                    <FormControl>
                                        <FormLabel>Customer Address</FormLabel>
                                        <Input
                                            required
                                            name="addressCustomer"
                                            value={customerAddress}
                                            onChange={(e) => setCustomerAddress(e.target.value)}
                                            disabled={isExistingCustomer}
                                        />
                                    </FormControl>
                                </Grid2>
                            </Grid2>

                            <Grid2 container>
                                <Grid2 size={6}>
                                    <Autocomplete
                                        options={menuDetail?.map(item => ({
                                            ...item.product,
                                            setup_ID: item.setup_ID // giữ lại setup_ID để phân biệt
                                        }))}
                                        getOptionLabel={(option) => option.product_Name}
                                        onChange={(event, value) => handleAddProduct(value)}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Select Product" variant="outlined" />
                                        )}
                                    />
                                </Grid2 >
                            </Grid2>


                            <Grid2 size={10} >
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
                                    <Grid2 size={12} sx={{ marginTop: 2 }}>
                                        <DataGrid
                                            autoHeight
                                            rows={selectedProducts}
                                            getRowId={(row) => row.setup_ID}
                                            columns={columns}
                                            pageSize={5}
                                            rowsPerPageOptions={[5]}
                                            disableSelectionOnClick
                                            processRowUpdate={handleProcessRowUpdate}
                                            experimentalFeatures={{ newEditingApi: true }}
                                        />
                                    </Grid2>
                                </Box>
                            </Grid2>
                            <Grid2 container sx={{ justifyContent: 'center', marginTop: '1%' }}>
                                <Box  >
                                    <Button type="submit" sx={{ fontSize: '16px', fontWeight: 'bold' }} >
                                        Add Receipt
                                    </Button>
                                </Box>
                            </Grid2>
                        </Stack>
                    </form >
                </ModalDialog >
            </Modal >
        </>
    )
} 