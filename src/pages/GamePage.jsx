import { useEffect, useState } from "react";
import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { getCards } from "../core/services/fetchService.js";
import { CardOnBoard } from "../components/game/CardOnBoard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { loadCards } from "../core/actions";
import { selectCards } from "../core/selectors.js";
import { PlayerInfos } from "../components/game/PlayerInfos.jsx";
import { Box, Button } from "@mui/material";
import { CardSelected } from "../components/game/CardSelected.jsx";

const GamePage = (props) => {
  const dispatch = useDispatch();
  const [selectedCardP1, setSelectedCardP1] = useState(0);
  const [selectedCardP2, setSelectedCardP2] = useState(0);
  //store : 

  const storedCards = useSelector(selectCards);
  const storedCardDetailP1 = storedCards[0];
  const storedCardDetailP2 = storedCards[1];
  const storedInfoUserP1 = {name:"test"};
  const storedInfoUserP2 = {name:"test1"};
  
  useEffect(() => {
    //get 
    async function fetchData() {
      const cards = await getCards();      
      dispatch(loadCards(cards));     
    }
    fetchData();
  }, [dispatch]);

  

  return (
    <div>
             
      <Container>
        <Row id="player1">
          <Col id="infoPlayer">
            <PlayerInfos playerInfos={storedInfoUserP1}></PlayerInfos>
          </Col>
          <Col>
            <Box display="flex">
              {storedCards.slice(0,4).map((c) => ( //tri sur 
                <CardOnBoard onClick={setSelectedCardP1(c)} key={c.id} card={c}></CardOnBoard>
                  ))
              }
              <CardSelected card={selectedCardP1}></CardSelected>

            </Box>
          </Col>
          <Col>
          </Col>
        </Row>
        <Row><hr /><Button>Attack !</Button></Row>
        <Row id="player2">
          <Col id="infoPlayer">
              <PlayerInfos playerInfos={storedInfoUserP2}></PlayerInfos>
          </Col>
          <Col>
            <Box display="flex">
              {storedCards.slice(4,8).map((c) => ( //tri sur 
                <CardOnBoard key={c.id} card={c}></CardOnBoard>
                  ))
              }
              <div style={{MarginLeft:"10%"}} >
                <CardSelected card={selectedCardP2}></CardSelected>
              </div>

            </Box>
          </Col>
          <Col>
            
            {/* peut etre faire le for ici */}
            {/* <Board user={"user_id2"}></Board>  */}
          </Col>
          <Col>
          </Col>     
        </Row>
      </Container>
    </div>
  );
  
};

export default GamePage;