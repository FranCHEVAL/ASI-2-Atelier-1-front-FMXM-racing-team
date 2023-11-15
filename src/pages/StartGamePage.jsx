import { useEffect } from "react";
import { getCards} from "../core/services/fetchService.js";
import { loadCards } from "../core/actions.js";
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { selectCards, getUserId } from '../core/selectors.js';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
// ES6 import or TypeScript

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
  
const StartGamePage = (props) => {
  const dispatch = useDispatch();
  const storedCards = useSelector(selectCards);
  const cardIdList = [];
  const navigate = useNavigate();

  async function handleClick(){
    //Send event to websocket with cards
    //socket.findGame(cardList, user_id)

    navigate(`/game`, { state: {cardList: cardIdList}} ); //voir https://stackoverflow.com/questions/42173786/react-router-pass-data-when-navigating-programmatically
  }

    const handleRowClick = (params) => {
        
        if(cardIdList.some(e => e === params.row.id)){
            const index = cardIdList.indexOf(params.row.id);
            cardIdList.splice(index, 1); // 2nd parameter means remove one item only
        }else if(cardIdList.length >= 4){
            
            alert("4 cartes maximum");
            return;
        }
        else{
            cardIdList.push(params.row.id);
            console.log(cardIdList);
        }
    };

  useEffect(() => {
    async function fetchData() {
      // You can await here
        const cards = await getCards();      
        dispatch(loadCards(cards));     
    }
    fetchData();
  }, [dispatch]);


  return (
    <div>
        <p>Liste des cartes</p>
        <div style={{ height: 400, width: '60%' }}>
            <DataGrid
                onRowClick={handleRowClick} 
                rows={storedCards}
                columns={columns}
                initialState={{
                    pagination: { 
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                checkboxSelection
                pageSizeOptions={[5, 10]}
            />
        </div>
        <Button variant="contained" onClick={() => {handleClick()}}>{"Start"}</Button>
      
    </div>
  );
  
};

export default StartGamePage;