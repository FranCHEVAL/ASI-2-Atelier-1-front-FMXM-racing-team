
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import { selectCardDetail } from "../../core/actions";

//see https://mui.com/x/react-data-grid/

const columns = [
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'description', headerName: 'Description', width: 200 },
  { field: 'family', headerName: 'Family', width: 130 },
  { field: 'energy', headerName: 'Energy', width: 130 },
  {
    field: 'affinity',
    headerName: 'Affinity',
    type: 'number',
    width: 90,
  },
  { field: 'hp', headerName: 'hp', width: 130 },
  { field: 'price', headerName: 'Price', width: 130 },

  
];

const CardTable = (props) => {
    const rows = props.cards;
    const dispatch = useDispatch();

    const handleRowClick = (params) => {
        dispatch(selectCardDetail(params.row));
      };

    return (
      <div style={{ height: 400, width: '60%' }}>
      <DataGrid
        onRowClick={handleRowClick} 
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { 
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
    );
    
  };
  
  export default CardTable;