import { useEffect, useState } from "react";
import {useLocation} from 'react-router-dom';
import * as React from 'react';
import { getCards } from "../core/services/fetchService.js";
import { CardOnBoard } from "../components/game/CardOnBoard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { loadCards } from "../core/actions";
import { selectCards, getUserId } from "../core/selectors.js";
import { PlayerInfos } from "../components/game/PlayerInfos.jsx";
import { Box, Button, Grid } from "@mui/material";
import { socket } from '../socket/socket.js';

const GamePage = ({route, navigate}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const cardList = location.state; // Read values passed on state

  const storedIdUser = useSelector(getUserId);

  const [selectedCardP1, setSelectedCardP1] = useState(0);
  const [selectedCardP2, setSelectedCardP2] = useState(0);
  //store : 

  const storedCards = useSelector(selectCards);
  const storedInfoUserP1 = {name:"Nasty Nas", actionPoints:10};
  const storedInfoUserP2 = {name:"Jay Hova", actionPoints:10};
  
  useEffect(() => {
    socket.connect();
    const payload = { cardList, storedIdUser};
    
    socket.emit("findGame", payload);
    //get CardSelected
    async function fetchData() {
      const cards = await getCards();      
      dispatch(loadCards(cards));     
    }
    fetchData();
  }, [dispatch]);

  

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <PlayerInfos playerInfos={storedInfoUserP1}></PlayerInfos>
        </Grid>
        <Grid item xs>
          <Box display="flex">
            {storedCards.slice(0,4).map((c) => ( //tri sur 
              <div key={c.id} onClick={() => setSelectedCardP1(c)}> 
                <CardOnBoard key={c.id} card={c}></CardOnBoard>
              </div>
                ))
            }
            <div style={{marginLeft: 20, border:"1px solid red"}}>
              <CardOnBoard card={selectedCardP1}></CardOnBoard>
            </div>
            </Box>
        </Grid>
      </Grid>
      <hr/>
      <Button variant="contained" color="error">Attack !</Button>
      <Button variant="contained">End Turn</Button>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <PlayerInfos playerInfos={storedInfoUserP2}></PlayerInfos>
        </Grid>
        <Grid item xs>
          <Box display="flex">
            {storedCards.slice(4,8).map((c) => ( //tri sur 
              <div key={c.id} onClick={() => setSelectedCardP2(c)}> 
                <CardOnBoard key={c.id} card={c}></CardOnBoard>
              </div>
                ))
            }
            <div style={{marginLeft: 20, border:"1px solid red"}}>
              <CardOnBoard card={selectedCardP2}></CardOnBoard>
            </div>
            </Box>
        </Grid>
      </Grid>
      
    </div>
  );
  
};

export default GamePage;