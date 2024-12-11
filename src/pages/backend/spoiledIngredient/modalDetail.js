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
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Grid from '@mui/material/Grid2';
export default function ModalDetail(props) {
    const renderRecipeRaw = () => {
        let result = props.data.details.length > 0 ?
        props.data.details.map((el) => {
                let item = props.ingredients.find(x => x.ingredient_ID == el.ingredient_ID);
                let units = -el.quality;
                return (
                    <>
                        <TableRow>
                            <TableCell>{item.ingredient_Name}</TableCell>
                            <TableCell>{`${units} ${item.unit_Min}`}</TableCell>
                        </TableRow>
                    </>
                )
            }) : null;
        return result;
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
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Ingredient</TableCell>
                                            <TableCell>Units</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {renderRecipeRaw()}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
