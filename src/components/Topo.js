import styled from "styled-components";
import { useContext } from "react";
import UserContext from "./UserContext";
import trackit from "../assets/img/TrackIt.png"

export default function Topo (){
    const {imgPessoa, setImgPessoa} = useContext(UserContext);
    return (
        <>
        <TopoS >
                <div> <Logo src={trackit} alt="trackit" /> </div>
                <div> <Foto src={imgPessoa} alt="" /></div>
            </TopoS >
        </>
    )
}


export const TopoS = styled.div`

    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #126BA5;
    width: 100%;
    height: 74px;
    position: fixed;
    top: 0px;
    left: 0px;

`;

export const Logo = styled.img`

display: flex;
    align-items: center;
    margin: 0 15px;
`;

export const Foto = styled.img`

    display: flex;
    align-items: center;
    margin: 0 15px;
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;

`;