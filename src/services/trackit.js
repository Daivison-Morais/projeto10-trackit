import axios from "axios";


const BASE_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";

function postCadastrar(body){
    const promise = axios.post(`${BASE_URL}/auth/sign-up`, body) 
    return promise
}

function postEntrar(body){
    const promise = axios.post(`${BASE_URL}/auth/login`, body) 
    return promise
}
function postCriarHabito(body, config){
    const promise = axios.post(`${BASE_URL}/habits`, body, config) 
    return promise
}

function getListarHabitos (config){
    
    const promise = axios.get(`${BASE_URL}/habits`, config)
    return promise
    
}

function deleteHabito(idTarefa, config) {
       
    const promise =  axios.delete(`${BASE_URL}/habits/${idTarefa}`, config)        
        return promise
}

function getBuscarHabitosdeHoje (config){
const promise = axios.get(`${BASE_URL}/habits/today`, config)
return promise
}

function  postDesmarcaHabito(id, config){
    console.log(id, config)    
    const promise = axios.post(`${BASE_URL}/habits/${id}/uncheck`, {}, config)
    return promise
    }

function  postHabitoFeito (id, config){
    console.log(id, config)    
    const promise = axios.post(`${BASE_URL}/habits/${id}/check`, {}, config)
    return promise
}


function getHistoricoHabitosDiario (body){
    
    const promise = axios.get(`${BASE_URL}/habits/history/daily`)
    return promise
}

export {postCadastrar, postEntrar, postCriarHabito, getListarHabitos, 
    deleteHabito, getBuscarHabitosdeHoje, postHabitoFeito, postDesmarcaHabito, 
    getHistoricoHabitosDiario}
