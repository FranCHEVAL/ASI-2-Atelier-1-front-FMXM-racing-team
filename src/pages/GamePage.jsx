import { useEffect, useState } from "react";
import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CardDetail } from "../components/shop/CardDetail";

const GamePage = (props) => {
  const dispatch = useDispatch();
  //store : 
  const storedCardsP1 = useSelector(selectCards); //Ptet recup depuis props
  const storedCardsP2 = useSelector(selectCards); //Recup depuis event websocket
  const storedCardDetailP1 = useSelector(selectCardDetail);
  const storedCardDetailP2 = useSelector(selectCardDetail);//Recup depuis event websocket
  const storedInfoUserP1 = useSelector(getUserId);
  const storedInfoUserP2 = useSelector(getUserId); //Recup depuis event websocket

  
  useEffect(() => {
    //get 
    async function fetchData() {
      
      const resp = await fetch(
        'http://tp.cpe.fr:8083/cards'
      );
      const result = await resp.json();
      dispatch(loadCards(result));

    }
    fetchData();
  }, []);


  return (
    <div>
      <Container>
        <Row id="player1">
          <Col id="infoPlayer">
            <PlayerInfos></PlayerInfos>
          </Col>
          <Col>
            <Board cards={storedCardsP1} ></Board>
          </Col>
          <Col>
            <CardDetail></CardDetail>
          </Col>
        </Row>
        <Row id="player2">
          <Col id="infoPlayer">
              <PlayerInfos></PlayerInfos>
            </Col>
            <Col>
              {/* peut etre faire le for ici */}
              <Board cards={storedCardsP1} ></Board> 
            </Col>
            <Col>
              <CardDetail></CardDetail>
            </Col>     
        </Row>
      </Container>
    </div>
  );
  
};

export default GamePage;