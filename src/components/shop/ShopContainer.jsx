import { useEffect, useState } from "react";
import * as React from 'react';
import CardTable from "./CardTable";
import { loadCards } from "../../core/actions";
import { selectCards } from '../../core/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { CardDetail } from "./CardDetail";
import { Col, Container, Row } from 'react-bootstrap';
import { Button } from '@mui/material';
import { selectCardDetail } from '../../core/selectors';

const ShopContainer = (props) => {
  const dispatch = useDispatch();
  const storedCards = useSelector(selectCards);
  const storedCardDetail = useSelector(selectCardDetail);

  function handleClick(){
    const id = storedCardDetail?.id;
  }

  useEffect(() => {
    async function fetchData() {
      // You can await here
      if(props.mode === "sell"){
        const resp = await fetch(
          'http://tp.cpe.fr:8083/cards_to_sell'
        );
        const result = await resp.json();
        dispatch(loadCards(result));
      }else{
        const resp = await fetch(
          'http://tp.cpe.fr:8083/cards'
        );
        const result = await resp.json();
        dispatch(loadCards(result));
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
        <Row><Button variant="contained" onClick={handleClick()}>{props.mode === "sell" ? "Je vends !" : "J'achete" }</Button></Row>
      </Container>
    </div>
  );
  
};

export default ShopContainer;