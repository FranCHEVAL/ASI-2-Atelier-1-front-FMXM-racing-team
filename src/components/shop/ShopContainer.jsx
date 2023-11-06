import { useEffect, useState } from "react";
import * as React from 'react';
import CardTable from "./CardTable";
import { loadCards } from "../../core/actions";
import { selectCards } from '../../core/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { CardDetail } from "./CardDetail";
import { Col, Container, Row } from 'react-bootstrap';

const ShopContainer = () => {
  const dispatch = useDispatch();
  const storedCards = useSelector(selectCards);

 

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const resp = await fetch(
        'http://tp.cpe.fr:8083/cards'
      );

      const result = await resp.json();
      dispatch(loadCards(result));
    }
    fetchData();
  }, [dispatch]);


  return (
    <div>
      <Container>
        <Row>
          <Col>
            <CardTable cards={storedCards}></CardTable>
          </Col>
          <Col>
            <CardDetail></CardDetail>
          </Col>
        </Row>
      </Container>
    </div>
  );
  
};

export default ShopContainer;