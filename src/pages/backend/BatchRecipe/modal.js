import React, { useState, useEffect } from "react"
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';
import {Row, Col} from 'reactstrap';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from "@mui/material";
export default function ModalCreate(props) {
    const [quantity, setQuantity] = useState(1);
    const [unit, setUnit] = useState(0);
    const [ingredientID, setIngredientID] = useState(-1);
    const [unitList, setUnitList] = useState([]);
    const [recipeRaw, setRecipeRaw] = useState([]);
    useEffect(() => {
        setQuantity(props.data.quantity);
        setUnit(props.data.unit);
        setIngredientID(props.data.ingredient_ID);
    }, [props.data]);
    const renderRecipeRaw = () => {
        let result = ingredientID != -1 && typeof recipeRaw != 'undefined' && recipeRaw.length > 0 ?
        recipeRaw.map((el)=>{
            let item = props.ingredients.find(x=>x.ingredient_ID == el.ingredient_Raw);
            let units = (unit == 2 ? el.quantity * item.transferPerMin * item.maxPerTransfer : unit == 1 ? el.quantity * item.transferPerMin : el.quantity) * quantity;
            return (
                <>
                    <tr>
                        <td>{item.ingredient_Name}</td>
                        <td>{`${units} ${item.unit_Min}`}</td>
                    </tr>
                </>
            )
        }) : null;
        return result;
    }
    const handleOnClickSave = () => {
        let data = {
            IngredientResult_ID: ingredientID,
            Unit: unit,
            Quality: quantity,
            Staff_ID: 1
        }
        props.createData(data);
    }
    return (
        <React.Fragment>
            <Modal open={props.openModal} >
                <ModalDialog sx={{ width: '50%' }}>
                    <DialogTitle>Batch Recipe</DialogTitle>
                    <form>
                        <Stack spacing={2}>
                            <Row>
                                <Col sm="4">
                                    <FormControl>
                                        <FormLabel>Ingredient</FormLabel>
                                        <Autocomplete
                                            sx={{
                                                marginTop: '1%',
                                                height: 50,
                                                width: 300,
                                            }}
                                            disablePortal
                                            options={props.ingredients.filter(x=>x.ingredient_Type == 1)}
                                            getOptionLabel={
                                                (option) => option.ingredient_Name ? option.ingredient_Name : ""}
                                            name="Ingredient_Name"
                                            value={ingredientID ? {ingredient_ID : ingredientID} : null}
                                            onChange={(el, newValue) => {
                                                if (newValue) {
                                                    setIngredientID(newValue.ingredient_ID);
                                                    setRecipeRaw(newValue.recipeRaws);
                                                    let unitList = [
                                                        {
                                                            'unit': newValue.unit_Min,
                                                            'value': 0
                                                        },
                                                        {
                                                            'unit': newValue.unit_Transfer,
                                                            'value': 1
                                                        },
                                                        {
                                                            'unit': newValue.unit_Max,
                                                            'value': 2
                                                        }
                                                    ];
                                                    setUnitList(unitList);
                                                    setUnit(0);
                                                } else {
                                                    setIngredientID(null)
                                                }
                                            }}
                                            renderInput={(params) => <TextField
                                                required
                                                {...params}

                                            />}
                                        />
                                    </FormControl>
                                </Col>
                                <Col sm="4">
                                    <FormControl>
                                        <FormLabel>Quantity</FormLabel>
                                            <Input
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
                                </Col>
                                <Col sm="4">
                                    <FormControl>
                                        <FormLabel>Unit</FormLabel>
                                        <Autocomplete
                                            sx={{
                                                marginTop: '1%',
                                                height: 50,
                                                width: 300,
                                            }}
                                            disablePortal
                                            options={unitList}
                                            getOptionLabel={(option) => option.unit ? option.unit : ""}
                                            value={unit}
                                            onChange={(event, newValue) => {
                                                if (newValue) {
                                                    setUnit(newValue.value)
                                                } else {
                                                    setUnit(null)
                                                }
                                            }}
                                            renderInput={(params) => <TextField
                                                required
                                                {...params}

                                            />}
                                        />
                                    </FormControl>
                                </Col>
                            </Row>
                            <table>
                                <thead>
                                    <th>Recipe Raw</th>
                                    <th>Units</th>
                                </thead>
                                <tbody>
                                    {renderRecipeRaw()}
                                </tbody>
                            </table>
                            
                            <Row>
                                <Col sm="6">
                                    <Button type="button" onClick={()=>{props.setOpenModal(false)}}>
                                        Close
                                    </Button>
                                </Col>
                                <Col sm="6">
                                    <Button type="button" onClick={()=>{handleOnClickSave()}}>
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                           
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
