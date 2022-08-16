import { useEffect, useState } from "react";
import { getBuscarHabitosdeHoje } from "../services/trackit";
import { Progressbar, Rodape, Txt } from "./Habitos";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./UserContext";
import styled from "styled-components";
import naoFinalizada from "../assets/img/naoFinalizada.png";
import finalizada from "../assets/img/finalizada.png";
import Topo from "./Topo";
import { postHabitoFeito, postDesmarcaHabito } from "../services/trackit";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import dayjs from "dayjs";


function TempleteBlocoTarefa({ id, seqAtual, recAtual, feito, nome, setAtualizar, atualizar }) {

  const { token } = useContext(UserContext);
  const config = { headers: { Authorization: `Bearer ${token}` } };

 
  function enviar (){

    feito? postDesmarcaHabito (id, config).then(() => {
      setAtualizar(!atualizar);
     
               
    })
    .catch(() => {
      alert("erro");
    })     :
   
    postHabitoFeito (id, config).then(() => {
      setAtualizar(!atualizar);

               
    })
    .catch(() => {
      alert("erro")
    })

  }

  return (
    <>
    

              <BlocoHabto>
      
      <Center>
        <TxtFazer>{nome}</TxtFazer>
        <SequenciaRecord>{`Sequência atual: ${seqAtual}`}</SequenciaRecord>
        <SequenciaRecord>{`Seu recorde: ${recAtual}`}</SequenciaRecord>
      </Center>
      <div>
        {" "}
        <Finalizada src={feito ? finalizada : naoFinalizada} alt=""  onClick={enviar} />
      </div>
    </BlocoHabto>


    </>
    
  );
}

export default function HabitosHoje() {
  
  const percentage = 80;

  const dia = dayjs();
  const week = ["Domingo", "Segunda", "Terça", "Quata", "Quinta", "Sexta", "Sábado"];

  const { token } = useContext(UserContext);
  
  const navigate = useNavigate();

  const [habitosHoje, setHabitosHoje] = useState([]);
  const [atualizar, setAtualizar] = useState(false);
  const [qtd, setQtd] = useState(0);
  
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    getBuscarHabitosdeHoje(config).then((resp) => {
      setHabitosHoje(resp.data);
      console.log(resp.data);
    });
  }, [atualizar]);

  
 
  return (
    <>
      <Topo />
      <Margem>
        <Centraliza>
          <div>
            <Data>{week[dia.$W]}, {dia.format('DD/MM')} </Data>
            {habitosHoje.length == 0 ? (
              <PercentualConcluido>
                Nenhum hábito concluido ainda.
              </PercentualConcluido>
            ) : (
              ""
            )}

            {habitosHoje
              ? habitosHoje.map((habito, index) => (
                  <TempleteBlocoTarefa
                    feito={habito.done}
                    nome={habito.name}
                    id={habito.id}
                    recAtual={habito.currentSequence}
                    seqAtual={habito.highestSequence}
                    atualizar={atualizar}
                    setAtualizar={setAtualizar}
                    habitosHoje={habitosHoje}
                    qtd={qtd}
                    setQtd={setQtd}
              
                  />
                ))
              : "carregando.."}
          </div>
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

        <Txt onClick={() => navigate("/historico")}>Histórico</Txt>
      </Rodape>
    </>
  );
}

export const Margem = styled.div`
  margin: 85px 0px;
`;

export const Finalizada = styled.img`
  width: 69px;
  height: 69px;
  cursor: pointer;
`;

export const PercentualConcluido = styled.div`
  color: #bababa;
  font-size: 18px;
`;

export const Data = styled.div`
  font-size: 23px;
  color: #126ba5;
  margin-left: 7px;
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
  background-color: #ffffff;
  margin: 20px 8px;
`;

export const SequenciaRecord = styled.div`
  width: 165px;
  height: 14px;
  font-size: 12px;
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
  background-color: #e7e7e7;
  border-radius: 5px;
`;

const Centraliza = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 95px;
`;
