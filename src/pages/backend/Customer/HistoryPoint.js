import { Box, Button } from "@mui/joy";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInitialData } from "../../../redux/actions/historyDiscount";
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Grid from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Close';
import { NumericFormat } from 'react-number-format';

export default function HistoryPoint(props) {



    const columns = [
        {
            field: "id",
            headerName: "Num",
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 20,
            maxWidth: 50
        },
        {
            field: "receipt_ID",
            headerName: "Receipt",
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 20,

        },
        {
            field: "createdDate",
            headerName: "Date",
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 20,

        },
        {
            field: "cuppon_ID",
            headerName: "Cupppon",
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 20,

        },
        {
            field: "priceDisscount",
            headerName: "Price Discount",
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            minWidth: 20,
            renderCell: (params) => {
                return (
                    <NumericFormat
                        value={params.row.priceDisscount.toFixed(0)}
                        displayType={'text'}
                        thousandSeparator={true}
                    // prefix={'VND'}
                    />
                )
            }

        }

    ]
    return (
        <>

            <Modal open={props.openModalHistory}>
                <ModalDialog sx={{ width: '50%' }}>
                    <Grid container>
                        <Grid size={6}>
                            <DialogTitle sx={{ justifyContent: 'start' }}>History Discounts</DialogTitle>
                        </Grid>
                        <Grid size={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                            <Button
                                variant="text"
                                color="neutral"
                                type="button"
                                onClick={() => { props.setOpenModalHistory(false) }}
                                startDecorator={<CloseIcon />}
                            >
                            </Button>
                        </Grid>
                    </Grid>

                    <DataGrid
                        columns={columns}
                        rows={props.data || []}></DataGrid>
                </ModalDialog>

            </Modal>
        </>
    )
}