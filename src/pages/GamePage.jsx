import * as React from 'react';
import { useEffect, useState, useRef } from "react";
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
  //const stateGameInfos = useSelector(selectGameInfos);
  const [stateGameInfos, setStateGameInfos] = useState();

  const [selectedCardP1, setSelectedCardP1] = useState(0);
  const [selectedCardP2, setSelectedCardP2] = useState(0);
   
  const [isStarted, setIsStarted] = useState();
  const [playerTurn, setPlayerTurn] = useState();

  const stateRef = useRef();
  stateRef.current =  stateGameInfos;
  //store : 

  const storedCards = useSelector(selectCards);
  
  //Listeners
  function startGame(gameInfos){
    console.log("startGame-event" + gameInfos);
    
    setStateGameInfos(gameInfos);

    setIsStarted(true);


  }

  function attack(value){
    //alert(`Votre " ${storedCards.find(c => c.id === value.targetCardId).name} est attaquée !`);
    
    console.log("attack-event" + value);

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
    if(stateGameInfos.players.find(g => g.id === storedIdUser).action <= 0){
      alert("Plus de points d'actions");
      return;
    }
    socket.emit("playerAttack", 
      stateGameInfos.id, 
      storedIdUser, 
      selectedCardP1.id,
      stateGameInfos.players.find(g => g.id !== storedIdUser).id, 
      selectedCardP2.id, 
      (response) => {
        console.log(response);
      });


  }

  function endTurnClick(){
    if(!playerTurn){
      alert("Not your turn bro :(");
      return;
    }
    socket.emit("endTurn", 
      stateGameInfos.id, 
      storedIdUser,
      (response) => {
        console.log(response);}
      );
  }
    
  

  useEffect(() => {

    const updatePlayerCallback = (value) => {
      const gameInfos = stateRef.current;
      const newPlayers = [value.player, value.targetPlayer];

      gameInfos.players = newPlayers;

      setStateGameInfos(gameInfos);
    }  

    function updatePlayer(value){
      const test = this;
      const gameInfos = stateGameInfos;
      //gameInfos.players.find(p => p.id === value.targetPlayer.id);
      setStateGameInfos(value);
  
      console.log("updatePlayer-event" + value);
  
    }
  
    socket.connect();
    socket.on('startGame', startGame);
    socket.on('attack', attack);
    //socket.on('updatePlayer', updatePlayer);
    socket.on('updatePlayer', updatePlayerCallback);
    socket.on('beginTurn', beginTurn);  

  

    return () => {
      socket.off('startGame', startGame);
      socket.off('findGame', ()=>{});
      socket.off('attack', attack);
      socket.off('beginTurn', beginTurn);
      socket.off('updatePlayer', updatePlayerCallback);
      //get CardSelected
    }
  }, [dispatch]);

  

  return ( isStarted ?
    <div>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          {stateGameInfos.players !== undefined ?
            <PlayerInfos 
            playerName="Vous"
            playerActionPoints={stateGameInfos.players.find(g => g.id === storedIdUser).action}
          ></PlayerInfos>
          :
          <></>
          }
         
        </Grid>
        <Grid item xs>
          <Box display="flex">
            {stateGameInfos.players !== undefined ? 
            Object.values(stateGameInfos.players.find(g => g.id === storedIdUser).deck).map((c) => ( //tri sur 
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
      <Button onClick={()=>{endTurnClick()}} variant="contained">End Turn</Button>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          {stateGameInfos.players !== undefined ?
            <PlayerInfos 
            playerName={stateGameInfos.players.find(g => g.id !== storedIdUser).name}
            playerActionPoints={stateGameInfos.players.find(g => g.id !== storedIdUser).action}
          ></PlayerInfos>   
        :
        <></>
        }
               
        </Grid>
        <Grid item xs>
          <Box display="flex">
          {stateGameInfos.players !== undefined ? 
            Object.values(stateGameInfos.players.find(g => g.id !== storedIdUser).deck).map((c) => ( //tri sur 
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