import { useEffect } from "react";
import * as React from 'react';
import CardTable from "./CardTable";
import { loadCards } from "../../core/actions";
import { getUserId, selectCards } from '../../core/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { CardDetail } from "./CardDetail";
import { Button } from '@mui/material';
import { selectCardDetail } from '../../core/selectors';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const ShopContainer = (props) => {
  const dispatch = useDispatch();
  const storedCards = useSelector(selectCards);
  const storedCardDetail = useSelector(selectCardDetail);
  const storedIdUser = useSelector(getUserId);

  async function handleClick(){
    const card_id = storedCardDetail?.id;
    const user_id = storedIdUser;
    if(props.mode ==="sell"){
      const resp = await fetch("http://localhost:8081/store/sell", {
        method: "POST",
        body: JSON.stringify({user_id: user_id, card_id: card_id}),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
    }else{
      const resp = await fetch("http://localhost:8081/store/buy", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id: user_id, card_id: card_id})
      });
    }
  }

  useEffect(() => {
    async function fetchData() {
      // You can await here
      if(props.mode === "sell"){
        const resp = await fetch(
          'http://localhost:8084/cards/user_id/' + storedIdUser
        );
        const result = await resp.json();
        dispatch(loadCards(result));
      }else{
        const resp = await fetch(
          'http://localhost:8084/cards_to_sell'
        );
        const result = await resp.json();
        dispatch(loadCards(result));
      } 
    }
    fetchData();
  }, [dispatch]);


  return (
    <div>
      <Container style={{padding: '30px'}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Liste des cartes</Typography>
          </Grid>
          <Grid container spacing={2}> {/* Ajoutez un espacement entre les éléments si nécessaire */}
            <Grid item xs={12} md={9}> {/* Ajustez les points de rupture selon les besoins */}
              <CardTable cards={storedCards} />
            </Grid>
            <Grid item xs={12} md={3}>
              <CardDetail storedCardDetail={storedCardDetail} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleClick}>
              {props.mode === "sell" ? "Je vends !" : "J'achete"}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
  
};

export default ShopContainer;