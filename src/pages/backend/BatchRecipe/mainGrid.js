import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Copyright from '../../../components/Footer/Copyright';
import Table from './tableMenu';
import { Button } from 'reactstrap';
import Add from '@mui/icons-material/Add';
import Modal from './modal'
import { useDispatch, useSelector } from 'react-redux';

import {getInitialData} from "../../../redux/actions/ingredient"
import { getInitialData as getDataBatch, addData } from '../../../redux/actions/batchRecipe';

export default function MainGrid() {
    const [dataModal, setDataModal] = React.useState({
        "quantity": 1,
        "ingredient_ID": -1,
        "unit":0
    })
    const [openModal, setOpenModal] = React.useState(false)
    const dispatch = useDispatch();
    const ingredients = useSelector(state => state.dataIngredient.data);
    const batchRecipes = useSelector(state => state.dataBatch.data);
    React.useEffect(()=>{
       dispatch(getDataBatch());dispatch(getInitialData());
    },[dispatch])

    const createData = async (_data) => {
        await dispatch(addData(_data));
        setOpenModal(false);
    }
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
                <Grid container spacing={2} columns={12}>

                    <Grid size={{ md: 12, lg: 12 }}>
                        <Button
                            variant="outlined"
                            color="neutral"
                            startDecorator={<Add />}
                            onClick={()=>{
                                setDataModal({
                                    "quantity": 1,
                                    "ingredient_ID": -1,
                                    "unit":0
                                });
                                setOpenModal(true)
                            }}
                            >
                            Create
                        </Button>
                        <Table
                            batchRecipes={batchRecipes}
                            ingredients={ingredients}
                        />
                        <Modal
                            data={dataModal}
                            openModal={openModal}
                            setOpenModal={setOpenModal}
                            ingredients={ingredients}
                            createData={createData}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Copyright sx={{ my: 4 }} />
        </Box >
    );
}