import * as React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useLocation} from 'react-router-dom';
import { getCards } from "../core/services/fetchService.js";
import { CardOnBoard } from "../components/game/CardOnBoard.jsx";
import { PlayerInfos } from "../components/game/PlayerInfos.jsx";
import { Box, Button, Grid } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { loadCards, setGameInfos } from "../core/actions";
import { socket } from '../socket/socket.js';
import { selectCards, getUserId, selectGameInfos } from "../core/selectors.js";

const GamePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const cardList = location.state; // Read values passed on state

  const storedIdUser = useSelector(getUserId);
  const storedGameInfos = useSelector(selectGameInfos);

  const [selectedCardP1, setSelectedCardP1] = useState(0);
  const [selectedCardP2, setSelectedCardP2] = useState(0);
   
  const [isStarted, setIsStarted] = useState();
  const [playerTurn, setPlayerTurn] = useState();
  //store : 

  const storedCards = useSelector(selectCards);
  
  //Listeners
  function startGame(gameInfos){
    console.log("startGame-event" + gameInfos);
    setIsStarted(true);
    dispatch(setGameInfos(gameInfos));     

  }

  function attack(value){
    //alert(`Votre " ${storedCards.find(c => c.id === value.targetCardId).name} est attaquée !`);
    
    console.log("attack-event" + value);

  }

  function updatePlayer(value){
    const gameInfos = storedGameInfos;
    //gameInfos.players.find(p => p.id === value.targetPlayer.id);
    console.log("updatePlayer-event" + value);

  }

  function beginTurn(userId){
    console.log("beginTurn-event" + userId);
    if(storedIdUser === userId){
      if(playerTurn){
        return;
      }
      setPlayerTurn(true);
      alert("It's your turn baby !");
    }else{
      setPlayerTurn(false);
    }

  }

  //Emitter
  function attackClick(){
    if(!playerTurn){
      alert("Not your turn bro :(");
      return;
    }
    if(storedGameInfos.players.find(g => g.id === storedIdUser).action <= 0){
      alert("Plus de points d'actions");
      return;
    }
    socket.emit("playerAttack", 
      storedGameInfos.id, 
      storedIdUser, 
      selectedCardP1.id,
      storedGameInfos.players.find(g => g.id !== storedIdUser).id, 
      selectedCardP2.id, (response) => {
        console.log(response);
      });


  }

  useEffect(() => {

    socket.connect();
    socket.on('startGame', startGame);
    socket.on('attack', attack);
    socket.on('updatePlayer',(value) => console.log(storedGameInfos));
    socket.on('beginTurn', beginTurn);
    //get CardSelected
    async function fetchData() {
      const cards = await getCards();      
      dispatch(loadCards(cards));     
    }
    
    fetchData();

    return () => {
      socket.off('startGame', startGame);
      socket.off('findGame', ()=>{});
      socket.off('attack', attack);
      socket.off('updatePlayer', updatePlayer);
      socket.off('beginTurn', beginTurn);
      //get CardSelected
    }
  }, [dispatch]);

  

  return ( isStarted ?
    <div>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          {storedGameInfos.players !== undefined ?
            <PlayerInfos 
            playerName="Vous"
            playerActionPoints={storedGameInfos.players.find(g => g.id === storedIdUser).action}
          ></PlayerInfos>
          :
          <></>
          }
         
        </Grid>
        <Grid item xs>
          <Box display="flex">
            {storedGameInfos.players !== undefined ? 
            Object.values(storedGameInfos.players.find(g => g.id === storedIdUser).deck).map((c) => ( //tri sur 
              <div key={c.id} onClick={() => setSelectedCardP1(c)}> 
                <CardOnBoard key={c.id} card={c}></CardOnBoard>
              </div>
                ))
            :
            <></>
            }
            
            <div style={{marginLeft: 20, border:"1px solid red"}}>
              <CardOnBoard card={selectedCardP1}></CardOnBoard>
            </div>
            </Box>
        </Grid>
      </Grid>
      <hr/>
      <Button onClick={()=>{attackClick()}} variant="contained" color="error">Attack !</Button>
      <Button variant="contained">End Turn</Button>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          {storedGameInfos.players !== undefined ?
            <PlayerInfos 
            playerName={storedGameInfos.players.find(g => g.id !== storedIdUser).name}
            playerActionPoints={storedGameInfos.players.find(g => g.id !== storedIdUser).action}
          ></PlayerInfos>   
        :
        <></>
        }
               
        </Grid>
        <Grid item xs>
          <Box display="flex">
          {storedGameInfos.players !== undefined ? 
            Object.values(storedGameInfos.players.find(g => g.id !== storedIdUser).deck).map((c) => ( //tri sur 
              <div key={c.id} onClick={() => setSelectedCardP2(c)}> 
                <CardOnBoard key={c.id} card={c}></CardOnBoard>
              </div>
                ))
            :
            <></>
            }
            
            <div style={{marginLeft: 20, border:"1px solid red"}}>
              <CardOnBoard card={selectedCardP2}></CardOnBoard>
            </div>
            </Box>
        </Grid>
      </Grid>
      
    </div> 
    :
    <div>
      <p>En attente d'un autre joueur</p>
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress></CircularProgress>
      </Box>
    </div>
  );
  
};

export default GamePage;