import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Copyright from '../../../components/Footer/Copyright';
import Table from './table';
import Modal from './modal';

export default function MainGrid() {
    const [dataDetail, setDataDetail] = React.useState({
        "menuName": "123"
    });
    const [openModal, setOpenModal] = React.useState(false);
    const update = (_data) => {

    }
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
                    update={update}
                />

            </Grid>
            <Grid container spacing={2} columns={12}>

                <Grid size={{ md: 12, lg: 12 }}>
                    <Table
                        setDataDetail={setDataDetail}
                        setOpenModal={setOpenModal}
                    />
                </Grid>

            </Grid>
            <Copyright sx={{ my: 4 }} />
        </Box>
    );
}