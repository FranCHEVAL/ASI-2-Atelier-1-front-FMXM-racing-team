import { useEffect } from "react";
import { getCards, getCardsToSell, sellCard, buyCard, getUserCards } from "../../core/services/fetchService.js";
import { loadCards } from "../../core/actions";
import * as React from 'react';
import CardTable from "./CardTable";
import { getUserId, selectCards } from '../../core/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { CardDetail } from "./CardDetail";
import { Button } from '@mui/material';
import { selectCardDetail } from '../../core/selectors';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { PROXYLINK, CARD, STORE } from "../../constants";

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
      const cardsList = storedCards;
      const filtered = cardsList.filter(c => c.id !== card_id);
      dispatch(loadCards(filtered));

    }else{
      await buyCard(card_id, user_id);
      const cardToSell = await getCardsToSell();
      dispatch(loadCards(cardToSell));
    }
  }

  useEffect(() => {
    async function fetchData() {
      // You can await here
      if(props.mode === "sell"){
        const result = await getUserCards(storedIdUser);
        dispatch(loadCards(result));   
      }else{
        const result = await getCardsToSell();
        dispatch(loadCards(result));
      }           
    }
    fetchData();
  });


  return (
    <div>
      <h1>{props.mode === "sell" ? "Vendre des cartes" : "Acheter des cartes"} </h1>
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