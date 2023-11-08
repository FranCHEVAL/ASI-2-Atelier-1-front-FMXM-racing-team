import { Visual } from '../visual/Visual';
import { useSelector } from 'react-redux';
import { selectCardDetail } from '../../core/selectors';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export function CardInGame(props) {
    const card = props.card;
    console.log(card);

    return ( card != null &&
        <Card key={card.id} style={{ width: '18rem' }}>
            <CardContent>{card.hp} HP - {card.name} - {card.attack} ATK</CardContent>
            <CardContent>{card.description}</CardContent>
                <Visual
                src={card.imgUrl}
                title="test"
                type="image"
                />


        </Card>
    );
}
