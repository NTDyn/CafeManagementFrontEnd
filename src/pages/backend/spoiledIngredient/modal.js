import React, { useState, useEffect } from "react"
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';
import CloseIcon from '@mui/icons-material/Close';
import Autocomplete from '@mui/material/Autocomplete';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Box } from "@mui/joy";
import { DataGrid } from "@mui/x-data-grid";
export default function ModalCreate(props) {
    const [quantity, setQuantity] = useState(1);
    const [unit, setUnit] = useState(0);
    const [unitName, setUnitName] = useState("")
    const [ingredientID, setIngredientID] = useState(-1);
    const [ingredientName, setIngredientName] = useState("")
    const [unitList, setUnitList] = useState([]);
    const [reason, setReason] = useState("");
    useEffect(() => {
        setQuantity(props.data.quantity);
        setUnit(props.data.unit);
        setIngredientID(props.data.ingredient_ID);
    }, [props.data]);
    const handleOnClickSave = () => {
        let data = {
            
            Staff_ID: 1,
            Reason: reason,
            Details: [{
                Ingredient_ID: ingredientID,
                Unit: unit,
                Quality: quantity,
                
            }]
        }
        props.createData(data);
    }

    return (
        <React.Fragment>
            <Modal open={props.openModal} >
                <ModalDialog sx={{ width: '70%' }}>
                    <Grid container>
                        <Grid size={6}>
                            <DialogTitle>Spoiled Ingredient</DialogTitle>
                        </Grid>
                        <Grid size={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                            <Button
                                variant="text"
                                color="neutral"
                                type="button"
                                onClick={() => { props.setOpenModal(false) }}
                                startDecorator={<CloseIcon />}
                            >

                            </Button>
                        </Grid>


                    </Grid>

                    <form>
                        <Stack spacing={2}>
                            <Grid container spacing={2}>
                                <Grid size={3}>
                                    <FormControl>
                                        <FormLabel>Ingredient</FormLabel>
                                        <Autocomplete
                                            sx={{
                                                marginTop: '1%',
                                                height: 50,
                                                width: '100%',
                                            }}
                                            disablePortal
                                            options={props.ingredients}
                                            getOptionLabel={
                                                (option) => option.ingredient_Name ? option.ingredient_Name : ""}
                                            name="Ingredient_Name"
                                            value={ingredientName ? { ingredient_Name: ingredientName } : null}
                                            onChange={(el, newValue) => {
                                                if (newValue) {
                                                    console.log(newValue)
                                                    setIngredientName(newValue.ingredient_Name);
                                                    setIngredientID(newValue.ingredient_ID);
                                                    let unitList = [
                                                        {
                                                            'id': 1,
                                                            'unit': newValue.unit_Min,
                                                            'value': 0
                                                        },
                                                        {
                                                            'id': 2,
                                                            'unit': newValue.unit_Transfer,
                                                            'value': 1
                                                        },
                                                        {
                                                            'id': 3,
                                                            'unit': newValue.unit_Max,
                                                            'value': 2
                                                        }
                                                    ];
                                                    // Lọc các đơn vị trùng nhau
                                                    unitList = unitList.filter((value, index, self) =>
                                                        index === self.findIndex((t) => (
                                                            t.unit === value.unit
                                                        ))
                                                    );


                                                    setUnitList(unitList);
                                                    setUnit(0);
                                                } else {
                                                    setIngredientName("")
                                                    setIngredientID(null)
                                                }
                                            }}
                                            renderInput={(params) => <TextField
                                                required
                                                {...params}

                                            />}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid size={3}>
                                    <FormControl>
                                        <FormLabel>Quantity</FormLabel>
                                        <Input
                                            sx={{ width: '100%', height: 50, marginTop: '1%' }}
                                            autoFocus
                                            required
                                            name="menuName"
                                            value={quantity}
                                            placeholder="Nhập tên Menu"
                                            onChange={(e) => {
                                                setQuantity(e.target.value);
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                < Grid size={3}>
                                    <FormControl>
                                        <FormLabel>Unit</FormLabel>
                                        <Autocomplete
                                            sx={{
                                                marginTop: '1%',
                                                height: 50,
                                                width: '100%',
                                            }}
                                            disablePortal
                                            options={unitList}
                                            getOptionLabel={(option) => option.unit ? option.unit : ""}
                                            value={unitName ? { unit: unitName } : null}
                                            onChange={(event, newValue) => {
                                                if (newValue) {
                                                    setUnit(newValue.value)
                                                    setUnitName(newValue.unit)
                                                } else {
                                                    setUnit(null)
                                                    setUnitName("")
                                                }
                                            }}
                                            renderInput={(params) => <TextField
                                                required
                                                {...params}

                                            />}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid size={3}>
                                    <FormControl>
                                        <FormLabel>Reason</FormLabel>
                                        <Input
                                            sx={{ width: '100%', height: 50, marginTop: '1%' }}
                                            autoFocus
                                            required
                                            value={reason}
                                            placeholder="Lí do"
                                            onChange={(e) => {
                                                setReason(e.target.value);
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        

                            <Grid container spacing={2}>

                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button type="button" onClick={() => { handleOnClickSave() }}>
                                        Submit
                                    </Button>
                                </Box>
                            </Grid>

                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
