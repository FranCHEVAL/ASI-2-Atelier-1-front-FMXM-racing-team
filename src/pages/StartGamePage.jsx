import { useEffect } from "react";
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getCards} from "../core/services/fetchService.js";
import { loadCards } from "../core/actions.js";
import { selectCards, getUserId } from '../core/selectors.js';
import SocketManager from "../socket";

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
  
const StartGamePage = () => {
  const dispatch = useDispatch();
  const storedCards = useSelector(selectCards);
  const storedIdUser = useSelector(getUserId);

  const cardIdList = [];
  const navigate = useNavigate();

  const socket = SocketManager.useSocket()

  async function handleStartGameClick(){
    //Send event to websocket with cards
    console.log(cardIdList);
    socket.connect();
    socket.emit("findGame", storedIdUser, "francheval", cardIdList, (response) => {
      console.log(response.game);
    });
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
        <h1>Choisissez vos carte pour commencer la partie</h1>
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
        <Button variant="contained" onClick={() => {handleStartGameClick()}}>{"Start"}</Button>
      
    </div>
  );
  
};

export default StartGamePage;