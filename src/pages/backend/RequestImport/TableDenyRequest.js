import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Pagination } from '@mui/material';

const TableDenyRequest = ({ data, onActionDetail, currentPage, totalPages, onPageChange,onDetail}) => {

  return (
    <TableContainer component={Paper}>
       <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
          <TableCell>Num.</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Date Create</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,index) => (
            <TableRow key={row.link_ID}>
            <TableCell>{row.link_ID}</TableCell>
            <TableCell>{row.totalPrice}</TableCell>
              <TableCell>{row.createdDate}</TableCell>
              <TableCell>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: '8px' }}>
  
  <Button variant="contained" color="primary" onClick={() => onActionDetail(row.link_ID)}>
    Detail
  </Button>
</div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        count={totalPages}                 // Tổng số trang
        page={currentPage + 1}             // Material-UI Pagination bắt đầu từ 1
        onChange={(event, page) => onPageChange(page - 1)}  // Chuyển về index từ 0
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </TableContainer>
  );
};

export default  TableDenyRequest;
