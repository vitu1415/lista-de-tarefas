import { useState, useEffect } from 'react';
import './admin.css'

import { auth, db } from '../../firebaseConnection';
import { signOut } from 'firebase/auth';
import { format } from 'date-fns';

import { addDoc, collection, onSnapshot, orderBy, query, where, doc, deleteDoc, updateDoc } from 'firebase/firestore';

export default function Admin(){
    const [tarefaInput, setTarefaInput] = useState('');
    const [user, setUser] = useState({});
    const [edit, setEdit] = useState({});

    const [tarefas, setTarefas] = useState([]);

    const dataPersonalizada = format(new Date(), 'dd/MM/yyyy');

    useEffect(() => {
        async function loadTarefas(){
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))

            if(userDetail){
                const data = JSON.parse(userDetail);

                const tarefaRef = collection(db, "tarefas")
                const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))
                const unsub = onSnapshot(q, (snapshot) => {
                    let lista = [];

                    snapshot.forEach((doc)=> {
                        lista.push({
                            id: doc.id,
                            created: doc.data().created,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid
                        })
                    })

                    console.log(lista)
                    setTarefas(lista);

                })
            }

        }

        loadTarefas();
    }, [])

    async function handleRegister(evento){
        evento.preventDefault();

        if(tarefaInput === ''){
            alert("Sem tarefa...")
            return;
        }

        if(edit?.id){
            handleUpdateTarefa();
            return;
        }

        await addDoc(collection(db, 'tarefas'), {
            tarefa: tarefaInput,
            created: dataPersonalizada,
            userUid: user?.uid
        })
        .then(() => {
            console.log("TAREFA REGISTRADA")
            setTarefaInput('')
        })
        .catch((error) => {
            console.log("ERRO AO REGISTRAR "+error)
        })
    }

    async function handleLoagout() {
        await signOut(auth);
    }

    async function deleteTarefa(id) {
        const docRef = doc(db, "tarefas", id)
        await deleteDoc(docRef)
    }

    function editTarefa(item){
        setTarefaInput(item.tarefa)
        setEdit(item);
    }

    async function handleUpdateTarefa() {
        const docRef = doc(db, "tarefas", edit?.id)
        await updateDoc(docRef, {
            tarefa: tarefaInput
        })
        .then(() => {
            alert("TAREFA ATUALIZADA !!!")
            setTarefaInput('')
            setEdit({})
        })
        .catch((error) => {
            console.log("ERRO = "+error)
            setTarefaInput('')
            setEdit({})
        })
    }

    return(
        <div className="admin-container">
            <h1>Pagina de Admin</h1>

            <form className="form" onSubmit={handleRegister}>
                <textarea placeholder='Digite sua tarefa...' value={tarefaInput} onChange={(evento) => setTarefaInput(evento.target.value)}/>

                {Object.keys(edit).length > 0 ? (
                    <button className='btn-register'  style={{ backgroundColor: '#6add39' }} type="submit">Atualizar tarefa</button>
                ) : (
                    <button className='btn-register' type="submit">Registrar Tarefa</button>
                )}
            </form>

            {tarefas.map((tarefa) => (
            <article key={tarefa.id} className='list'>
                <p>criado: {tarefa.created}</p>
                <p>{tarefa.tarefa}</p>
                <div>
                    <button onClick={ () => editTarefa(tarefa) } >Editar</button>
                    <button className='btn-delete' onClick={ () => deleteTarefa(tarefa.id)}>Concluir</button>
                </div>
            </article>
            ))}

            <button className='btn-logout' onClick={handleLoagout}>Sair</button>
        </div>
    )
}