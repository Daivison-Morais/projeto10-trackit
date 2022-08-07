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
function postCriarHabito(body){
    const promise = axios.post(`${BASE_URL}/habits`, body) 
    return promise
}

function getListarHabitos (){
    
    const promise = axios.get(`${BASE_URL}/habits`)
    return promise
    
}

function deleteHabito() {
    const idHabito = "cabeçalho com autorização"

    const promise =  axios.delete(`${BASE_URL}habits/${idHabito}`)
        //.then(() => this.setState({ status: 'Delete successful' }));
        return promise
}

function getBuscarHabitosdeHoje (config){
const promise = axios.get(`${BASE_URL}/habits/today`, config)
return promise
}

function postHabitoFeito (body){
    
    const promise = axios.post(`${BASE_URL}/habits/ID_DO_HABITO/check`,body)
    return promise
    }


function postDesmarcaHabito (body){
    
    const promise = axios.post(`${BASE_URL}/habits/ID_DO_HABITO/uncheck`,body)
    return promise
}


function getHistoricoHabitosDiario (body){
    
    const promise = axios.get(`${BASE_URL}/habits/history/daily`)
    return promise
}

export {postCadastrar, postEntrar, postCriarHabito, getListarHabitos, 
    deleteHabito, getBuscarHabitosdeHoje, postHabitoFeito, postDesmarcaHabito, 
    getHistoricoHabitosDiario}
