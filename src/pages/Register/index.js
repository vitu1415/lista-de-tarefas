import { useState } from "react";
import "../Home/home.css";

import { Link } from "react-router-dom";
import { auth } from "../../firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Register(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();


    async function handleRegister(evento) {
        evento.preventDefault();
        if(email !== '' && senha !== ''){
            await createUserWithEmailAndPassword(auth, email, senha)
            .then(() => {
                navigate('/admin', { replace: true })
            })
            .catch(() => {
                console.log("Deu ERRO")
            })
        }    
        else{
            alert("Coloque todos os campos!")
        }
    }

    return(
        <div className="home-container">
            <h1>Cadastrar-se</h1>
            <span>Vamos criar sua conta</span>

            <form className="form" onSubmit={handleRegister}>
                <input type="text" placeholder="Coloque seu Email" value={email} onChange={ (evento) => setEmail(evento.target.value) }/>
                <input type="password" placeholder="********" value={senha} onChange={ (evento) => setSenha(evento.target.value) }/>

                <button type="submit">Cadastrar</button>
            </form>

            <Link className="button-link" to="/">
                tem conta? faça login
            </Link>
        </div>
    )
}