import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Copyright from '../../../components/Footer/Copyright';
import Table from './tableMenu';
import Modal from './modal';
import { Button } from '@mui/material';
import AddMenu from './addMenu';
import { getMenu } from '../../../redux/actions/menu/index';
import { useDispatch, useSelector } from 'react-redux';

export default function MainGrid() {
    const [dataDetail, setDataDetail] = React.useState({
        "menu_ID": 1,
        "product_ID": 0,
        "product": []
    });
    const [openModal, setOpenModal] = React.useState(false);

    const dataMenu = useSelector(state => state.dataMenu.data);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getMenu())
    }, [dispatch]);

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Grid
                container
                spacing={2}
                columns={12}
                sx={{ justifyContent: "flex-end", margin: "40px 40px 40px auto" }}
            >
                <Modal
                    data={dataDetail}
                    openModal={openModal}
                />

            </Grid>
            <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
                <Grid
                    container
                    spacing={2}
                    columns={12}
                    sx={{ justifyContent: "flex-end", margin: "40px 40px 40px auto" }}
                >
                    <AddMenu />

                </Grid>


                <Grid container spacing={2} columns={12}>

                    <Grid size={{ md: 12, lg: 12 }}>
                        <Table
                            setDataDetail={setDataDetail}
                            setOpenModal={setOpenModal}
                            dataMenu={dataMenu}
                        />
                    </Grid>

                </Grid>
            </Box>
            <Copyright sx={{ my: 4 }} />
        </Box >
    );
}