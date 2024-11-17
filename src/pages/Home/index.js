import { useState } from "react";
import './home.css';
import { Link, useNavigate } from "react-router-dom";

import { auth } from '../../firebaseConnection';
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Home(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    async function acessarLista(evento) {
        evento.preventDefault();
        if(email !== '' && senha !== ''){
            await signInWithEmailAndPassword(auth, email, senha)
            .then(() => {
                //navegar para /admin
                navigate('/admin', {replace: true})
            })
            .catch(() => {
                console.log("Erro ao fazer o login")
            })
        }    
        else{
            alert("tem nada")
        }
    }

    return(
        <div className="home-container">
            <h1>Lista de Tarefas</h1>
            <span>gerenciando de tarefas</span>

            <form className="form" onSubmit={acessarLista}>
                <input type="text" placeholder="Coloque seu Email" value={email} onChange={ (evento) => setEmail(evento.target.value) }/>
                <input type="password" placeholder="********" value={senha} onChange={ (evento) => setSenha(evento.target.value) }/>

                <button type="submit">Acessar</button>
            </form>

            <Link className="button-link" to="/registrer">
                não pssui a conta? Cadastra-se
            </Link>
        </div>
    )
}