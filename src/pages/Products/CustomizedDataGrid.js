import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { getInitialData } from '../../redux/actions/products';
//import { rows, columns } from '../Products/data/gridData'

const useCustomizedDataGrid = () => {
  const data = useSelector(state => state.dataProduct.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInitialData())
  }, [dispatch])

  let columns = [
    {
      field: 'product_ID',
      headerName: 'ID',
      headerAlign: 'right',
      align: 'right',
      flex: 1,
      minWidth: 100,
    },
    {
      field: 'product_Name',
      headerName: 'Product Name',
      headerAlign: 'right',
      align: 'center',
      flex: 1,
      minWidth: 100,
    }
  ]
  return (
    <DataGrid
      autoHeight
      checkboxSelection
      rows={data}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: 'outlined',
              size: 'small',
            },
            columnInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            operatorInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: 'outlined',
                size: 'small',
              },
            },
          },
        },
      }}
    />
  );
}



// const rows = [
//   {
//     id: 1,
//     productName: data.,
//     status: 'Online',
//     eventCount: 8345,
//     users: 212423,
//     viewsPerUser: 18.5,
//     averageTime: '2m 15s',
//     conversions: [
//       469172, 488506, 592287, 617401, 640374, 632751, 668638, 807246, 749198, 944863,
//       911787, 844815, 992022, 1143838, 1446926, 1267886, 1362511, 1348746, 1560533,
//       1670690, 1695142, 1916613, 1823306, 1683646, 2025965, 2529989, 3263473,
//       3296541, 3041524, 2599497,
//     ],
//   },

// ];

export default useCustomizedDataGrid