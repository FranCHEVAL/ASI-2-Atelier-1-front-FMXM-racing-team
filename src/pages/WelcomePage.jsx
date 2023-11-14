import MenuCard from "../components/common/MenuCard";
import { ShoppingCart } from "@mui/icons-material";
import { SportsEsports } from "@mui/icons-material";
import { AttachMoney } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";

export function WelcomePage(){
    const userId = useSelector(state => state.currentUserId);
    const navigate = useNavigate()

    if(userId === null){
        navigate('/login')
    }
    return (
        <div>
                <Grid container spacing={2} columns={18} 
                    alignContent="center" 
                    justifyContent="center"
                    direction="row">
                    <Grid item xs={6}>
                        <MenuCard
                        text="BUY"
                        link="http://localhost:3000/buy"
                        icon={<ShoppingCart />}
                        ></MenuCard>
                    </Grid>
                    <Grid item xs={6}>
                        <MenuCard
                            text="Play"
                            link="http://localhost:3000/play"
                            icon={<SportsEsports />}
                        ></MenuCard>
                    </Grid>
                    <Grid item xs={6}>
                        <MenuCard
                        text="Sell"
                        link="http://localhost:3000/sell"
                        icon={<AttachMoney />}
                    ></MenuCard>
                    </Grid>
                </Grid>
        </div>
    );
}