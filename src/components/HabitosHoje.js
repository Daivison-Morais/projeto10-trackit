
import { useEffect, useState } from "react";
import { getBuscarHabitosdeHoje } from "../services/trackit";
import { Display, Progressbar, Rodape, Txt } from "./Habitos";
import trackit from "../assets/img/TrackIt.png"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./UserContext";
import styled from "styled-components";
import naoFinalizada from "../assets/img/naoFinalizada.png";
import finalizada from "../assets/img/finalizada.png";
import Topo from "./Topo";

import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";



export default function HabitosHoje() {
    const percentage = 80;
    const today = "hoje";

    const { token, setToken } = useContext(UserContext);
    const {imgPessoa, setImgPessoa} = useContext(UserContext);
    const navigate = useNavigate();


    const [ehfinalizada, setEhfinalizada] = useState(false);
    const [habitosHoje, setHabitosHoje] = useState([]);

    const config = { headers: { Authorization: `Bearer ${token}` } }

    useEffect(() => {
        console.log("config: ", config)

        getBuscarHabitosdeHoje(config).then(resp => {
            setHabitosHoje(resp.data)
            console.log(resp.data)
        })
    }, []);


    console.log(token)

    return (
        <>
            <Topo/>
            <Centraliza>
                <div>
                    <Data>Segunda, 17/05 </Data>
                    <PercentualConcluido>Nenhum habito concluido ainda</PercentualConcluido>
                    <Display>
                        <BlocoHabto>
                            <Center>
                                <TxtFazer>Ler 1 capítulo de livro</TxtFazer>
                                <SequenciaRecord>Sequência atual: 3 dias</SequenciaRecord>
                                <SequenciaRecord>Seu recorde: 5 dias</SequenciaRecord>
                            </Center>
                            <div> <Finalizada src={ehfinalizada? finalizada : naoFinalizada} alt="" /></div>


                        </BlocoHabto>


                    </Display>
                </div>

            </Centraliza>

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

                <Txt onClick={()=> navigate("/historico")}>hitórico</Txt>
            </Rodape>
        </>
    )
}


export const Finalizada = styled.img`

width: 69px;
height: 69px;

`;

export const PercentualConcluido = styled.div`

color: #BABABA;
font-size: 18px;

`;

export const Data = styled.div`

font-size: 23px;
color: #126BA5;
margin-bottom: 12px;

`;
export const Center = styled.div`

display: flex;
flex-direction: column;
justify-content: center;
margin-bottom: 5px;
`;

export const BlocoHabto = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 340px;
height: 94px;
background-color: #FFFFFF;

`;

export const SequenciaRecord = styled.div`

width: 146px;
height: 19px;

font-size: 13px;

`;

export const TxtFazer = styled.div`

width: 208px;
height: 25px;
line-height: 25px;
color: #666666;
margin-bottom: 5px;

`;
export const CaixaNaoTerminado = styled.div`
width: 69px;
height: 69px;
background-color: #E7E7E7;
border-radius: 5px;
`;

const Centraliza = styled.div`

display: flex;
align-items: center;
justify-content: center;
width: 100%;
margin-top: 95px;

`;