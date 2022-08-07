import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { TxtFazer } from "./HabitosHoje"
import lixeira from "../assets/img/lixeira.png"
import React from "react";
import { render } from "react-dom";
import { useContext } from "react";
import UserContext from "./UserContext";
import Topo from "./Topo";


// Import react-circular-progressbar module and styles
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Radial separators
function Dia ({ohDia, dia, selecionado, diaSelecionado}){

    
    //const [corSelecionado, setCorSelecionado] = useState("")
   
    return (
        <>
        <div className= {`cor-botao ${selecionado? "cor-selecionado":""}`} onClick={()=>diaSelecionado(dia.id)} >{ohDia}</div>
        </>
    )
}

export default function Habitos() {
   

    
    const [listDias, setListDias] = useState( [
        { dia: "D", id: 0, selecionado: false},
        { dia: "S", id: 1, selecionado: false},
        { dia: "T", id: 2, selecionado: false},
        { dia: "Q", id: 3, selecionado: false},
        { dia: "Q", id: 4, selecionado: false},
        { dia: "S", id: 5, selecionado: false},
        { dia: "S", id: 6, selecionado: false},
    ]);

    const list = listDias.filter((value =>value.selecionado)).map(value => value.id);
  

    function diaSelecionado (id){
        
        const newDias = listDias.map((value) => {
            if (value.id === id){
                
                    return {
                        ...value,
                        selecionado: !value.selecionado,
                    };
                         
                
            }
            return value;
        })

        setListDias([...newDias])
    }

    const percentage = 80;
    const today = "hoje";

    const navigate = useNavigate();

    const [listaHabitos, setListaHabitos] = useState([]);
    const [blocohabito, setBlocohabito] = useState(false);
    const [tarefa, setTarefa] = useState("");

    let semHabitos;

    //const config = { headers: { Authorization: `Bearer ${token}` } }

    /* useEffect(() => {
        console.log("config: ", config)

        getListarHabitos(config).then(res => {
            setListaHabitos(res.data)
            console.log(res.data)
        })
    }, []); */
    

    if (listaHabitos.length === 0) {
        semHabitos = <Centraliza><TextoSemHabitos>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</TextoSemHabitos></Centraliza>;
    }

    function handleForm() {



        
        /* setBlocohabito(!blocohabito)
        setTarefa(

            <Centraliza>
                <BlocoHabitoCriado>
                    <Display2>
                        <div>
                            <TxtFazer>Ler um capitulo de livro</TxtFazer>
                            <Display2>
                            {listDias.map(dia=> <Dia dia={dia}/> )}
                               
                            </Display2>
                        </div>
                        <Lixeira onClick={excluir} src={lixeira} alt="" />
                    </Display2>
                </BlocoHabitoCriado>
            </Centraliza>
        ) */
    }

    function BlocoDeHabito({diaSelecionado, listDias}) {
        const [nomeHabito, setNomeHabito] = useState("");

        console.log(nomeHabito)
        
        return (
            <>
            {blocohabito ? (
                <Centraliza>
                    <ContainerHabito>
                    <form>
                        <Centraliza>
                            
                             
                    <Input placeholder="nome do hábito" className="input"
                        
                        value={nomeHabito}
                        onChange={(event) => setNomeHabito(event.target.value)}
                        required

                    ></Input>
                            
                         
                             
                        </Centraliza>
                        <Display>
                        {listDias.map((dia, index)=> <Dia dia={dia} diaSelecionado={diaSelecionado} key={dia.id} ohDia={dia.dia} selecionado={dia.selecionado}/> )}
                        
                        </Display>
                        <Posiciona>
                            <BotCancelar onClick={() => { setBlocohabito(!blocohabito) }}>Cancelar</BotCancelar>  <BotSalvar >Salvar</BotSalvar>
                        </Posiciona>
                        </form>

                    </ContainerHabito>
                </Centraliza> 
            ) : <></>}
            </>
            )
             
    }

    function excluir() {
        const confirm = window.confirm;

        if(confirm){
            //fazer sumir da lista
            setTarefa("");
        }
    }


    return (
        <>
            <Topo/>
            <SubTopo>
                <Habitoso>Meus hábitos</Habitoso>
                <Adiconar onClick={()=> setBlocohabito(true)}>+</Adiconar>
            </SubTopo>
            <BlocoDeHabito listDias={listDias} diaSelecionado={diaSelecionado}/>
            {tarefa}
            {semHabitos}
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
`;

export const Display2 = styled.div`

display: flex;
justify-content:space-around;
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
background-color: #FFFFFF;
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
color: #52B6FF;
margin-right: 15px;
cursor:pointer;

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
background-color: #52B6FF;
margin-right: 15px;
cursor: pointer;

`;
export const Display = styled.div`
display: flex;
justify-content:space-around;
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
background-color: #D5D5D5;
border-radius: 5px;
border-style: solid;
border: 1px solid #D5D5D5;
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
    background-color: #FFFFFF;
    padding: 0 20px;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;

`;

export const Txt = styled.div`

font-size: 18px;
    font-weight: 400;
    color: #52B6FF;
    cursor: pointer;
`;

export const Adiconar = styled.span`

    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;
    background-color: #52B6FF;
    font-size: 27px;
    color: #FFFFFF;
    border-radius: 7px;
    cursor: pointer;

`;

export const Habitoso = styled.span`

    font-size: 23px;
    font-weight: 400px;
    color: #126BA5;

`;

export const SubTopo = styled.div`

    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 70px;
    height: 74px;
    padding: 0 15px;

`;

