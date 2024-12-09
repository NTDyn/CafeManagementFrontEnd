import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Pagination } from '@mui/material';

const TableCheckRequest = ({ data, onAction, currentPage, totalPages, onPageChange,onDetail}) => {

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Header</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,index) => (
            <TableRow key={row.totalPrice}>
              <TableCell>{row.createdDate}</TableCell>
              <TableCell>{row.modifiedDate}</TableCell>
              <TableCell>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: '8px' }}>
  
  <Button variant="contained" color="primary" onClick={() => onAction(row.id)}>
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

export default  TableCheckRequest;
