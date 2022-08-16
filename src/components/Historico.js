import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { Centraliza, Progressbar, Rodape, Txt } from "./Habitos";
import Topo from "./Topo";
import styled from "styled-components";
import { useState } from "react";

export default function Historico() {
  const navigate = useNavigate();
  const [historicoHabitos, setHistoricoHabitos] = useState([]);

  const percentage = 80;
 

  return (
    <>
      <Topo />
      <Margem>
        <Centraliza>
          <ContainerHabito>
            <Display>
              <Data>Histórico </Data>
              <TxtFazer>
                Em breve você poderá ver o histórico dos seus hábitos aqui!
              </TxtFazer>
            </Display>
          </ContainerHabito>
        </Centraliza>
      </Margem>

      <Rodape>
        <Txt onClick={() => navigate("/habitos")}>Hábitos</Txt>
        <Centraliza>
          <Progressbar onClick={() => navigate("/hoje")}>
            <CircularProgressbar
              value={percentage}
              text="Hoje"
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#3e98c7",
                textColor: "#fff",
                pathColor: "#fff",
                trailColor: "transparent",
              })}
            />
          </Progressbar>
        </Centraliza>

        <Txt>Histórico</Txt>
      </Rodape>
    </>
  );
}

export const ContainerHabito = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 85%;
  height: 180px;
  border-radius: 12px;
  padding: 20px auto;
`;

export const Display = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const Margem = styled.div`
  margin: 85px 0px;
`;

export const Data = styled.div`
  font-size: 23px;
  color: #126ba5;

  margin-bottom: 12px;
`;
export const TxtFazer = styled.div`
  width: 90%;

  line-height: 25px;
  color: #666666;
  margin-bottom: 5px;
  word-wrap: break-word;
`;
