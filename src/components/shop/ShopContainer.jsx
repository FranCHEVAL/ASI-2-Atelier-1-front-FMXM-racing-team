import { useEffect } from "react";
import { getCards, getCardsToSell, sellCard, buyCard } from "../../core/services/fetchService.js";
import { loadCards } from "../../core/actions";
import * as React from 'react';
import CardTable from "./CardTable";
import { getUserId, selectCards } from '../../core/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { CardDetail } from "./CardDetail";
import { Col, Container, Row } from 'react-bootstrap';
import { Button } from '@mui/material';
import { selectCardDetail } from '../../core/selectors';

const ShopContainer = (props) => {
  const dispatch = useDispatch();
  const storedCards = useSelector(selectCards);
  const storedCardDetail = useSelector(selectCardDetail);
  const storedIdUser = useSelector(getUserId);

  async function handleClick(){
    const card_id = storedCardDetail?.id;
    const user_id = storedIdUser;
    if(props.mode ==="sell"){
      await sellCard(card_id, user_id);
    }else{
      await buyCard(card_id, user_id);
    }
  }

  useEffect(() => {
    async function fetchData() {
      // You can await here
      if(props.mode === "sell"){
        const cards = await getCardsToSell();
        dispatch(loadCards(cards));     
      }else{
        const cards = await getCards();      
        dispatch(loadCards(cards));     
      }
    }
    fetchData();
  }, [dispatch]);


  return (
    <div>
      <Container>
        <Row><p>Liste des cartes</p></Row>
        <Row>
          <Col>
            <CardTable cards={storedCards}></CardTable>
          </Col>
          <Col>
            <CardDetail></CardDetail>
          </Col>
        </Row>
        <Row><Button variant="contained" onClick={() => {handleClick()}}>{props.mode === "sell" ? "Je vends !" : "J'achete" }</Button></Row>
      </Container>
    </div>
  );
  
};

export default ShopContainer;