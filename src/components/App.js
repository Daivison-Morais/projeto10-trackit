
import "../styles/styles.css";
import GlobalStyle from "../styles/globalStyles";

import Tela1 from "./Tela1"
import Habitos from "./Habitos";
import Cadastro from "./Cadastro";
import HabitosHoje from "./HabitosHoje";
import Historico from "./Historico";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "./UserContext";
import { useState } from "react";


export default function App() {

  const [token, setToken] = useState([]);
  const [imgPessoa, setImgPessoa] = useState([]);

  return (
    <>
      <GlobalStyle />
     
        <BrowserRouter>
        <UserContext.Provider value={{
          token, setToken, 
          imgPessoa, setImgPessoa,
          
          }}>

          <Routes>
            <Route path="/" element={<Tela1 />} />
            <Route path="/cadastro" element={< Cadastro />} />
            <Route path="/habitos" element={< Habitos />} />
            <Route path="/hoje" element={< HabitosHoje />} />
            <Route path="/historico" element={< Historico/>} />
          </Routes>
          </UserContext.Provider>
        </BrowserRouter>
      
    </>

  )
}