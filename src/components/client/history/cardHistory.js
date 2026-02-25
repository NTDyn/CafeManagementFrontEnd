import React, { useEffect, useState } from 'react'
import statusList from './statusList'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button } from '@mui/material';
import ReceiptDetail from './receiptDetail';

function CardHistory(props) {

    const [listReceipt, setListReceipt] = useState(props.receiptData)
    const [openModal, setOpenModal] = useState(false);
    const [selectedReceipt, setSelectedReceipt] = useState(null);

    const handleOpen = (receipt) => {
        setSelectedReceipt(receipt);
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
        setSelectedReceipt(null);
    };

    useEffect(() => {
        setListReceipt(props.receiptData)
    }, [props.receiptData])

    const getStatusName = (id) => {
        const found = statusList.find(status => status.Status_ID === id);
        return found ? found.Status_Name : "Haven't update";
    }

    const formatDateTime = (isoDateString) => {
        const date = new Date(isoDateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes} ${day}/${month}/${year}`;
    };


    const formatCurrency = (number) => {
        return number.toLocaleString('vi-VN');
    }


    return (
        <>
            {
                listReceipt.map((item, index) => {
                    return (
                        <div className="col-lg-4 col-6" key={index}>
                            <Card className='card-container' >
                                <CardContent sx={{ padding: '5px 10px 5px 10px' }} >
                                    <div className="row">
                                        <div className="row" style={{ paddingTop: '20px' }}>
                                            <div className="col">
                                                <h4 className="s-1-history">{formatDateTime(item.createdDate)}</h4>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <p className="s-2-history">Total:  {formatCurrency(item.totalPrice)} vnd</p>
                                                    <p className="s-3-history">{getStatusName(item.status)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
                                    <Button size="small" onClick={() => handleOpen(item)}> DETAIL</Button>
                                </CardActions>
                            </Card>
                        </div>
                    )
                })
            }
            <ReceiptDetail
                open={openModal}
                handleClose={handleClose}
                receipt={selectedReceipt}
            />
        </>
    )

}

export default CardHistory