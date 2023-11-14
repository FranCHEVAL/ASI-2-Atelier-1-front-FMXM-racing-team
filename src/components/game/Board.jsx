import { CardInGame } from "./CardInGame"
import { useSelector } from "react-redux";
import { selectCards } from "../../core/selectors";

export function Board(props) {
    const storedCards = useSelector(selectCards);


    return ( //for card in cards -> affichage
        storedCards.slice(0,3).map((c)=>{ //tri sur 
            <CardInGame card={c}></CardInGame>
        })
    );
}
