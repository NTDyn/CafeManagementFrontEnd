import { Button, Typography } from "@mui/joy";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Grid from '@mui/material/Grid2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getInitialData } from "../../../../redux/actions/menuDetail";
import '../../../../css/backend/menu/index.css'
import { ClassNames } from "@emotion/react";
import { useSelector, useDispatch } from "react-redux";


export default function MenuDetail({ menu }) {
    const [rows, setRows] = useState([]);
    const [openDetail, setOpenDetail] = useState(false);
    const dataMenuDetail = useSelector(state => state.dataMenuDetail.data)
    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(getInitialData(menu.menu_ID))

    }, [dispatch])

    useEffect(() => {
        if (dataMenuDetail) {
            setRows(dataMenuDetail);
        }
    }, [dataMenuDetail]);


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
                <ModalDialog sx={{ width: '50%', overflow: 'scroll' }} >
                    <Grid container sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', }} className='card'>
                        <Typography sx={{ textAlign: 'center', marginBottom: '2%', marginTop: '2%', fontSize: '34px', fontWeight: 'bold' }}>
                            Menu
                        </Typography>
                        <TableContainer component={Paper} sx={{ margin: '2%' }}>
                            <Table sx={{ minWidth: 400 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow className="border-detail-table">
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center">Dishes</TableCell>
                                        <TableCell align="center">Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            className="border-detail-table"
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center" component="th" scope="row" sx={{ width: 300, height: 100 }}>
                                                <img
                                                    src={`${process.env.REACT_APP_BASE_URL}/${row.product.product_Image}?t=${Date.now()}`}
                                                    alt="Product"
                                                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                                                    onError={(e) => {
                                                        e.target.onerror = null; // Ngăn vòng lặp vô tận
                                                        e.target.src = '/path/to/placeholder.png';
                                                    }}
                                                ></img>
                                            </TableCell>
                                            <TableCell align="center" component="th" scope="row"> {row.product.product_Name}</TableCell>
                                            <TableCell align="center">{row.product.price}</TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>


                </ModalDialog>
            </Modal >

        </>
    )
} 