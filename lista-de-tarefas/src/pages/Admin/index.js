import React from 'react'
import './admin.css'
import { useState,useEffect } from 'react'
import { auth,db } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'

import {addDoc, collection} from 'firebase/firestore'

function Admin() {
  const [tarefa, setTarefa] = useState('');
  const [user,setUser] = useState({});

  useEffect(()=>{
    async function loadTarefas(){
      const user = localStorage.getItem('@user')
      setUser(JSON.parse(user)) //transformando de string para objeto
    }
    loadTarefas();
  },[])

  async function handleRegister(e) {
    e.preventDefault();
    if (tarefa !== "") {
      await addDoc(collection(db,"tarefas"),{
        tarefa:tarefa,
        created: new Date(),
        userUid: user?.uid,//verifica se o user existe se não existir retorna undefined
      })
      .then(()=>{
        setTarefa('');
        console.log("Tarefa registrada com sucesso!");
      })
      .catch((error)=>{
        console.log("Erro ao registrar tarefa: ", error);
      })

    } else {
      alert('Preencha a tarefa!');
    }
  }

  async function handleSair(){
    await signOut(auth);  
  }
  return (
    <div className='admin-container'>
      <h1>minhas tarefas</h1>
      <form className='form' onSubmit={handleRegister}>
        <textarea placeholder='O que você precisa fazer?' value={tarefa} onChange={(e) => setTarefa(e.target.value)} />
        <button className='btn-register' type='submit'>Registrar tarefa</button>
      </form>

      <article className='list'>
        <p>
          estudar javascript
        </p>
        <div>
          <button>editar</button>
          <button className='btn-delete'>deletar</button>
        </div>

      </article>

      <button className='btn-sair' onClick={handleSair}>Deslogar</button>

    </div>
  )
}

export default Admin
