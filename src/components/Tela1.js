import { useNavigate } from "react-router-dom"
import logo from "../assets/img/Group 8.png"
import styled from "styled-components";
import { useContext, useState } from "react";
import { postEntrar } from "../services/trackit";
import UserContext from "./UserContext";

export default function Tela1() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    // const [imgPessoa, setImgPessoa] = useContext("");
    const {token, setToken} = useContext(UserContext);
    const {imgPessoa, setImgPessoa} = useContext(UserContext);

    const navigate = useNavigate();

    const body = {
        email: email,
        password: senha
    }

    function handleForm(event) {
        event.preventDefault();

        postEntrar(body).then((resposta) => {

            setToken(resposta.data.token);
            setImgPessoa(resposta.data.image)

            navigate("/hoje");
        })
        .catch(erro=>{
            alert("erro")
        })
    }   
    console.log(imgPessoa)

    
    return (
        <>
            <Container>
                <Foto src={logo} alt="logo" />
                <form onSubmit={handleForm}>
                    <div>
                        <Input placeholder="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        ></Input>
                    </div>

                    <div>
                        <Input placeholder="senha"
                            type="password"
                            value={senha}
                            onChange={(event) => setSenha(event.target.value)}
                            required
                        ></Input>
                    </div>

                    <Button type="submit">Entrar</Button>
                </form>
                <TxtCadastro onClick={() => navigate("/cadastro")}>Não tem uma conta? Cadastre-se!</TxtCadastro>

            </Container>

        </>
    )
}



export const TxtCadastro = styled.div`
display: flex;
justify-content: center;
text-decoration:underline;
    color: #126BA5;
    cursor: pointer;
    line-height: 22.5px;

`;

export const Button = styled.button`

width: 312px;
    height: 45px;
    background-color: #52B6FF;
    border-radius: 5px;
    margin-bottom: 28px;
    font-size: 21px;
    color: #ffffff;
    box-sizing: border-box;
    cursor: pointer;

`;

export const Foto = styled.img`

display: flex;
    justify-content: center;
    margin-bottom: 32px;

`;

export const Input = styled.input`

width: 303px;
    height: 45px;
    margin-bottom: 7px;
    font-size: 20px;
    color: #c4c4c4;
    padding-left: 6px;
    outline-color: chocolate;

`

export const Container = styled.div`

display: flex;
    justify-content: center;
    align-items:center;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;

`;

