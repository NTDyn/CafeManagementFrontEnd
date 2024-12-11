import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Copyright from '../../../components/Footer/Copyright';
import Table from './table';
import Add from '@mui/icons-material/Add';
import Modal from './modal'
import ModalDetail from './modalDetail';
import { useDispatch, useSelector } from 'react-redux';

import { getInitialData } from "../../../redux/actions/ingredient"
import { getInitialData as getDataBatch, addData } from '../../../redux/actions/spoiledIngredient';
import { Button } from '@mui/joy';

export default function MainGrid() {
    const [dataModal, setDataModal] = React.useState({
        "quantity": 1,
        "ingredient_ID": -1,
        "unit": 0
    })
    const [openModal, setOpenModal] = React.useState(false);
    const [dataModalDetail, setDataModalDetail] = React.useState({
        "spoiled_ID": 1,
        'details': []
    })
    const [openModalDetail, setOpenModalDetail] = React.useState(false);
    const dispatch = useDispatch();
    const ingredients = useSelector(state => state.dataIngredient.data);
    const spoiledIngredients = useSelector(state => state.dataSpoiled.data);
    React.useEffect(() => {
        //dispatch(getInitialData());
        dispatch(getDataBatch());
    }, [dispatch])

    const createData = async (_data) => {
        await dispatch(addData(_data));
        setOpenModal(false);
    }
    const showDetail = (_data) => {
        setDataModalDetail(_data);
        setOpenModalDetail(true);
    }
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
                <Grid container spacing={2} columns={12}>

                    <Grid size={{ md: 12, lg: 12 }}>
                        <Box sx={{ justifyContent: "flex-end", display: "flex", margin: "40px 40px 40px auto" }}>
                            <Button
                                variant="outlined"
                                color="neutral"
                                startDecorator={<Add />}

                                onClick={() => {
                                    setDataModal({
                                        "quantity": 1,
                                        "ingredient_ID": -1,
                                        "unit": 0
                                    });
                                    setOpenModal(true)
                                }}
                            >
                                Spoiled Ingredient
                            </Button>
                        </Box>

                        <Table
                            batchRecipes={spoiledIngredients}
                            ingredients={ingredients}
                            showDetail={showDetail}
                        />
                        <Modal
                            data={dataModal}
                            openModal={openModal}
                            setOpenModal={setOpenModal}
                            ingredients={ingredients}
                            createData={createData}
                        />
                        <ModalDetail
                            data={dataModalDetail}
                            openModal={openModalDetail}
                            setOpenModal={setOpenModalDetail}
                            ingredients={ingredients}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Copyright sx={{ my: 4 }} />
        </Box >
    );
}