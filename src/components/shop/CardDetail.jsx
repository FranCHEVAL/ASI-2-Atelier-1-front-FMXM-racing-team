import { Visual } from '../visual/Visual';
import { useSelector } from 'react-redux';
import { selectCardDetail } from '../../core/selectors';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

export function CardDetail() {
    const storedCardDetail = useSelector(selectCardDetail);
    console.log(storedCardDetail);

    return ( storedCardDetail != null &&
        <Card key={storedCardDetail.id} style={{ width: '18rem' }}>
            <CardContent>{storedCardDetail.hp} HP - {storedCardDetail.name} - {storedCardDetail.attack} ATK</CardContent>
            <CardContent>{storedCardDetail.description}</CardContent>
                {/* <Visual
                src={props.card.imgUrl}
                title={props.card.title}
                type={props.card.visual_type}
                /> */}


        </Card>
    );
}
