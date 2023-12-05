import { PROXYLINK, CARD, STORE,USER } from "../../constants.js";

export async function buyCard(card_id, user_id){
    await fetch(`${PROXYLINK}/${STORE}/store/buy`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id: user_id, card_id: card_id})
        });
}

export async function sellCard(card_id, user_id){
    await fetch(`${PROXYLINK}/${STORE}/store/sell`, {
        method: "POST",
        body: JSON.stringify({user_id: user_id, card_id: card_id}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        });
}

export async function getCardsToSell(){

    const resp = await fetch(
        `${PROXYLINK}/${CARD}/cards_to_sell`
        );
    return await resp.json();
}


export async function getCards(){

    const resp = await fetch(
        `${PROXYLINK}/${CARD}/cards`
        );
        return await resp.json();
}

export async function getUserCards(user_id){

    const resp = await fetch(
        `${PROXYLINK}/${CARD}/cards/user_id/` + user_id
      );
        return await resp.json();
}

export async function getUsers(){

    const resp = await fetch(
        `${PROXYLINK}/${USER}/users`
      );
        return await resp.json();
} 


