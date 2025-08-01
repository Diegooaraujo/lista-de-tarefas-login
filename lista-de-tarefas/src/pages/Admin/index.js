import React from 'react'
import './admin.css'
import { useState } from 'react'
import { auth } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'

function Admin() {
  const [tarefa, setTarefa] = useState('');

  function handleRegister(e) {
    e.preventDefault();
    if (tarefa !== "") {

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
