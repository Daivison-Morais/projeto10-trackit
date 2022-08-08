import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TxtFazer } from "./HabitosHoje";
import lixeira from "../assets/img/lixeira.png";
import React from "react";
import { render } from "react-dom";
import { useContext } from "react";
import UserContext from "./UserContext";
import Topo from "./Topo";
import { postCriarHabito, getListarHabitos, deleteHabito } from "../services/trackit";

// Import react-circular-progressbar module and styles
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Radial separators
function Dia({ ohDia, dia, selecionado, diaSelecionado }) {
  return (
    <>
      <div
        className={`cor-botao ${selecionado ? "cor-selecionado" : ""}`}
        onClick={() => diaSelecionado(dia.id)}
      >
        {ohDia}
      </div>
    </>
  );
}

function BlocoDeHabito({
  diaSelecionado,
  listDias,
  setBlocohabito,
  blocohabito,
  list,
  token,
  setGetlstHabitos,
  getlstHabitos
}) {
  const [nomeHabito, setNomeHabito] = useState("");

  const config = { headers: { Authorization: `Bearer ${token}` } };

  let body = {
    name: nomeHabito,
    days: list,
  };

  function handleForm(event) {
    event.preventDefault();

    postCriarHabito(body, config)
      .then((resposta) => {
        setBlocohabito(!blocohabito);
        setNomeHabito("");   
        setGetlstHabitos(!getlstHabitos);        
      })
      .catch((erro) => {
        alert("erro");
      });
  }

  return (
    <>
      {blocohabito ? (
        <Centraliza>
          <ContainerHabito>
            <form onSubmit={handleForm}>
              <Centraliza>
                <Input
                  placeholder="nome do hábito"
                  className="input"
                  value={nomeHabito}
                  onChange={(event) => setNomeHabito(event.target.value)}
                  required
                ></Input>
              </Centraliza>
              <Display>
                {listDias.map((dia, index) => (
                  <Dia
                    dia={dia}
                    diaSelecionado={diaSelecionado}
                    key={dia.id}
                    ohDia={dia.dia}
                    selecionado={dia.selecionado}
                  />
                ))}
              </Display>
              <Posiciona>
                <BotCancelar
                  onClick={() => {
                    setBlocohabito(!blocohabito);
                  }}
                >
                  Cancelar
                </BotCancelar>{" "}
                <BotSalvar type="submit">Salvar</BotSalvar>
              </Posiciona>
            </form>
          </ContainerHabito>
        </Centraliza>
      ) : (
        <></>
      )}
    </>
  );
}

function TempleteTarefa({ nome, dia, diasIds,  idTarefa, config, setGetlstHabitos, getlstHabitos, setGetlstHab, getlstHab }) {
    const [deletetada, setDeletada] = useState(false);
  const [listDosDias, setListDosDias] = useState([
    { dia: "D", id: 0, selecionado: false },
    { dia: "S", id: 1, selecionado: false },
    { dia: "T", id: 2, selecionado: false },
    { dia: "Q", id: 3, selecionado: false },
    { dia: "Q", id: 4, selecionado: false },
    { dia: "S", id: 5, selecionado: false },
    { dia: "S", id: 6, selecionado: false },
  ]);

  useEffect(() => {
    const listAux = [...listDosDias];
    diasIds.map((value) => (listAux[value].selecionado = true));
    setListDosDias(listAux);
  }, []);

  function excluir( idTarefa, config) {
    
    if (window.confirm("Quer mesmo excuir o hábito?")) {
        deleteHabito(idTarefa,config)
        .then(() => {
          setGetlstHab(!getlstHab);
        });
      
    }
  }

  return (
    <>
      <Centraliza>
        <BlocoHabitoCriado>
          <Display2>
            <div>
              <TxtFazer>{nome}</TxtFazer>
              <Display2>
                {listDosDias.map((value) =>
                  value.selecionado ? (
                    <div className="cor-selecionado">{value.dia}</div>
                  ) : (
                    <div className="cor-botao">{value.dia}</div>
                  )
                )}
              </Display2>
            </div>
            <Lixeira onClick={()=>excluir(idTarefa, config)} src={lixeira} alt="" />
          </Display2>
        </BlocoHabitoCriado>
      </Centraliza>
    </>
  );
}

export default function Habitos() {

  const [listDias, setListDias] = useState([
    { dia: "D", id: 0, selecionado: false },
    { dia: "S", id: 1, selecionado: false },
    { dia: "T", id: 2, selecionado: false },
    { dia: "Q", id: 3, selecionado: false },
    { dia: "Q", id: 4, selecionado: false },
    { dia: "S", id: 5, selecionado: false },
    { dia: "S", id: 6, selecionado: false },
  ]);

  const percentage = 80;
  const navigate = useNavigate();
  const [listaHabitos, setListaHabitos] = useState([]);
  const [blocohabito, setBlocohabito] = useState(false);
  const [getlstHabitos, setGetlstHabitos] = useState(false);
  const [getlstHab, setGetlstHab] = useState(false);

  const { token, setToken } = useContext(UserContext);
  const config = { headers: { Authorization: `Bearer ${token}`} };

  useEffect(() => {
    
    console.log("config: ", config);

    getListarHabitos(config).then((res) => {
      setListaHabitos(res.data);
      console.log(res.data);
     setGetlstHabitos(true);
     
    });
  }, [getlstHabitos, getlstHab]);

  const list = listDias
    .filter((value) => value.selecionado)
    .map((value) => value.id);

  function diaSelecionado(id) {

    const newDias = listDias.map((value) => {
      if (value.id === id) {
        return {
          ...value,
          selecionado: !value.selecionado,
        };
      }
      return value;
    });

    setListDias([...newDias]);
  }

  let semHabitos;

  if (listaHabitos.length === 0) {
    semHabitos = (
      <Centraliza>
        <TextoSemHabitos>
          Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
          começar a trackear!
        </TextoSemHabitos>
      </Centraliza>
    );
  }

  return (
    <>    
      <Topo />
      <Margem>
      <SubTopo>
        <Habitoso>Meus hábitos</Habitoso>
        <Adiconar onClick={() => setBlocohabito(true)}>+</Adiconar>
      </SubTopo>
      <BlocoDeHabito
        list={list}
        blocohabito={blocohabito}
        setBlocohabito={setBlocohabito}
        listDias={listDias}
        diaSelecionado={diaSelecionado}
        token={token}
        setGetlstHabitos={setGetlstHabitos}
        getlstHabitos={getlstHabitos}
        
      />
     
      {semHabitos}

      {listaHabitos
        ? listaHabitos.map((habito) => (
            
            <TempleteTarefa
              nome={habito.name}
              idTarefa={habito.id}
              diasIds={habito.days}
              config={config}
              setGetlstHabitos={setGetlstHabitos}
              setGetlstHab={setGetlstHab}
              getlstHab={getlstHab}
              
            />
          ))
        : "carregando"}
</Margem>
      <Rodape>
        <Txt onClick={() => navigate("/habitos")}>Habitos</Txt>
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

        <Txt onClick={() => navigate("/historico")}>hitórico</Txt>
      </Rodape>
    </>
  );
}

export const Margem = styled.div`
margin: 85px 0px;`;

export const Progressbar = styled.div`
  position: fixed;
  left: calc(50%-45.5px);
  bottom: 10px;
  width: 91px;
  height: 91px;
  cursor: pointer;
`;

export const Lixeira = styled.img`
  width: 17px;
  height: 19px;
  cursor: pointer;
`;

export const Display2 = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const BlocoHabitoCriado = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-around;
  justify-content: center;
  width: 340px;
  height: 91px;
  background-color: #ffffff;
  margin-bottom: 20px;
`;

export const TextoSemHabitos = styled.div`
  width: 90%;
  font-size: 18px;
  color: #666666;
  line-height: 22.5px;
`;

export const Input = styled.input`
  width: 303px;
  height: 45px;
  font-size: 20px;
  color: #c4c4c4;
  padding-left: 8px;
  margin-bottom: 7px;
  border-width: 1px;
  border-radius: 8px;
`;

export const Posiciona = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const BotCancelar = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 84px;
  height: 35px;
  font-size: 16px;
  font-weight: 400;
  color: #52b6ff;
  margin-right: 15px;
  cursor: pointer;
`;

export const BotSalvar = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 84px;
  height: 35px;
  font-size: 16px;
  font-weight: 400;
  border-radius: 6px;
  color: #ffffff;
  background-color: #52b6ff;
  margin-right: 15px;
  cursor: pointer;
`;
export const Display = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const Centraliza = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const DiaSemaCinza = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin: 0px 5px;
  background-color: #d5d5d5;
  border-radius: 5px;
  border-style: solid;
  border: 1px solid #d5d5d5;
  cursor: pointer;
`;

export const ContainerHabito = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 340px;
  height: 180px;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px auto;
`;

export const Rodape = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  background-color: #ffffff;
  padding: 0 20px;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
`;

export const Txt = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: #52b6ff;
  cursor: pointer;
`;

export const Adiconar = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 35px;
  background-color: #52b6ff;
  font-size: 27px;
  color: #ffffff;
  border-radius: 7px;
  cursor: pointer;
`;

export const Habitoso = styled.span`
  font-size: 23px;
  font-weight: 400px;
  color: #126ba5;
`;

export const SubTopo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 70px;
  height: 74px;
  padding: 0 15px;
`;
