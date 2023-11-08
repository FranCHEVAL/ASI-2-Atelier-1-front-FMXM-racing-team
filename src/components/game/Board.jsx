
export function Board(props) {
    const cards = props.cards;


    return ( //for card in cards -> affichage
        cards.map((card)=>{
            <CardInGame card={card}></CardInGame>
        })
    );
}
