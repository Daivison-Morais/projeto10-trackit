import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { Centraliza, Progressbar, Rodape, Txt } from "./Habitos";
import Topo from "./Topo";

export default function Historico(){
    const navigate = useNavigate();

    const percentage = 80;
    const today = "hoje";

    return (
        <>
        <Topo/>

        <Rodape>

                <Txt onClick={() => navigate("/habitos")}>Habitos</Txt>
                <Centraliza>

                <Progressbar onClick={()=>navigate("/hoje")}>
                    <CircularProgressbar
                        value={percentage}
                        text={`${today}%`}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "#3e98c7",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent"
                        })}
                    />

                </Progressbar>

                </Centraliza>

                <Txt>hitórico</Txt>
            </Rodape>
        
        </>
    )
}