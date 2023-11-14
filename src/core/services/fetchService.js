
export async function buyCard(card_id, user_id){
    await fetch("http://tp.cpe.fr:8083/store/buy", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id: user_id, card_id: card_id})
        });
}

export async function sellCard(card_id, user_id){
    await fetch("http://tp.cpe.fr:8083/store/sell", {
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
        'http://tp.cpe.fr:8083/cards_to_sell'
        );
    return await resp.json();
}


export async function getCards(){

    const resp = await fetch(
        'http://tp.cpe.fr:8083/cards'
        );
        return await resp.json();
}   


