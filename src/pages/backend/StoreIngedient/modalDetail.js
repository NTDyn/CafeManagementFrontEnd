import React, { useState, useEffect } from "react"
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';
import CloseIcon from '@mui/icons-material/Close';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Grid from '@mui/material/Grid2';
import moment from "moment";
export default function ModalDetail(props) {
    const renderRecipeRaw = () => {
        let result = props.data.length > 0 ?
        props.data.map((el) => {
                let item = props.ingredients.find(x => x.ingredient_ID == el.ingredient_ID);
                let units = (el.type == "Batch" || el.type == "Purchase Order") ? ("+ " + (el.unit == 2 ? (el.quantity * item.transferPerMin * item.maxPerTransfer) : el.unit == 1 ? (el.quantity * item.transferPerMin) : el.quantity)) : ("- " + el.quantity);
                return (
                    <>
                        <TableRow>
                            <TableCell>{el.type}</TableCell>
                            <TableCell>{item.ingredient_Name}</TableCell>
                            <TableCell>{`${units} ${item.unit_Min}`}</TableCell>
                            <TableCell>{moment(el.createdDate).format("DD-MM-YYYY HH:mm")}</TableCell>
                        </TableRow>
                    </>
                )
            }) : null;
        return result;
    }
    return (
        <React.Fragment>
            <Modal open={props.openModal} >
                <ModalDialog sx={{ width: '70%' , overflow:'scroll' }}>
                    <Grid container>
                        <Grid size={6}>
                            <DialogTitle>Store Ingedient History</DialogTitle>
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
                                            <TableCell>Type</TableCell>
                                            <TableCell>Ingredient</TableCell>
                                            <TableCell>Units</TableCell>
                                            <TableCell>Date</TableCell>
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
