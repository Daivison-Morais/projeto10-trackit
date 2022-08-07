import { useState } from "react";
import { useNavigate } from "react-router-dom"
import logo from "../assets/img/Group 8.png"
import { postCadastrar } from "../services/trackit";
import { Button, Container, Foto, Input, TxtCadastro } from "./Tela1";


export default function Cadastro() {
    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [foto, setFoto] = useState("");
    const [senha, setSenha] = useState("");    

    function handleForm(event){
        event.preventDefault();

       const body = {
            email: email,
            name: nome,
            image: foto,
            password: senha
        }

        postCadastrar(body).then((resposta) => {
alert("Cadastro realizado!")
        })
        .catch(erro => {
            alert("Algo deu errado")
        })
    }

    const navigate = useNavigate();
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
                    onChange={(event) => setSenha(event.target.value)}
                    value={senha}
                    required
                    ></Input>
                </div>
                <div>
                    <Input placeholder="nome" 
                    type="text"
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    required
                    ></Input>
                </div>
                <div>
                    <Input placeholder="foto"
                    type="url"
                     value={foto}
                    onChange={(event) => setFoto(event.target.value)}
                    required
                    ></Input>
                </div>
                <Button type="submit">Cadastrar</Button>
                <TxtCadastro onClick={()=> navigate("/")}>Já tem uma conta? Faça login!</TxtCadastro>
                </form>
            </Container>

        </>
    )
}




