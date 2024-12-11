import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Copyright from '../../../components/Footer/Copyright';
import Table from './table';
import Add from '@mui/icons-material/Add';
import ModalDetail from './modalDetail';
import { useDispatch, useSelector } from 'react-redux';

import { getInitialData } from "../../../redux/actions/ingredient"
import { getInitialData as getDataBatch} from '../../../redux/actions/storeIngedient';
import { Button } from '@mui/joy';

export default function MainGrid() {

    const [openModal, setOpenModal] = React.useState(false);
    const [dataModalDetail, setDataModalDetail] = React.useState({
        "type": 1,
        'quantity': 0,
        'unit':0,
        'ingredient_ID': 0,
        'createdDate': '2024-12-01'
    })
    const [openModalDetail, setOpenModalDetail] = React.useState(false);
    const dispatch = useDispatch();
    const ingredients = useSelector(state => state.dataIngredient.data);
    const dataStore = useSelector(state => state.dataStore.data);
    React.useEffect(async () => {
        await dispatch(getInitialData());
         dispatch(getDataBatch());
    }, [dispatch])

    const showDetail = (_data) => {
        setDataModalDetail(_data);
        setOpenModalDetail(true);
    }
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
                <Grid container spacing={2} columns={12}>

                    <Grid size={{ md: 12, lg: 12 }}>

                        <Table
                            batchRecipes={dataStore}
                            ingredients={ingredients}
                            showDetail={showDetail}
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