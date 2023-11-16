import MenuCard from "../components/common/MenuCard";
import { ShoppingCart } from "@mui/icons-material";
import { SportsEsports } from "@mui/icons-material";
import { AttachMoney } from "@mui/icons-material";
import ChatIcon from '@mui/icons-material/Chat';
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import { LOCALLINK } from "../constants.js"

export function WelcomePage(){
    const userId = useSelector(state => state.currentUserId);
    const navigate = useNavigate()

    if(userId === null){
        navigate('/login')
    }
    return (
        <div style={{margin: "auto"}}>
                <Grid container spacing={2} columns={18} 
                    alignContent="center" 
                    justifyContent="center"
                    direction="row">
                    <Grid item xs={6}>
                        <MenuCard
                        text="BUY"
                        link={`${LOCALLINK}/buy`}
                        icon={<ShoppingCart />}
                        ></MenuCard>
                    </Grid>
                    <Grid item xs={6}>
                        <MenuCard
                            text="Play"
                            link={`${LOCALLINK}/play`}
                            icon={<SportsEsports />}
                        ></MenuCard>
                    </Grid>
                    <Grid item xs={6}>
                        <MenuCard
                        text="Sell"
                        link={`${LOCALLINK}/sell`}
                        icon={<AttachMoney />}
                    ></MenuCard>
                    </Grid>
                    <Grid item xs={6}>
                        <MenuCard
                        text="chat"
                        link={`${LOCALLINK}/chat`}
                        icon={<ChatIcon />}
                    ></MenuCard>
                    </Grid>
                </Grid>
        </div>
    );
}