import React from 'react'
import './admin.css'
import { useState, useEffect } from 'react'
import { auth, db } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'

import { addDoc, collection, onSnapshot, query, orderBy, where,doc,deleteDoc,updateDoc } from 'firebase/firestore'

function Admin() {
  const [tarefa, setTarefa] = useState('');
  const [user, setUser] = useState({});

  const [tarefas, setTarefas] = useState([]);

  const [edit, setEdit] = useState({});

  useEffect(() => {
    async function loadTarefas() {
      const user = localStorage.getItem('@user')
      setUser(JSON.parse(user)) //transformando de string para objeto

      if (user) {
        const data = JSON.parse(user);
        const tarefaRef = collection(db, 'tarefas')
        const q = query(tarefaRef, orderBy('created', 'desc'), where('userUid', "==", data?.uid)) //orderBy ordena as tarefas por data de criação, desc significa que será do mais recente para o mais antigo
        const onsub = onSnapshot(q, (snapshot) => { //snapshot retorna os dados em tempo real
          let lista = [];
          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid,
            })

          })
          setTarefas(lista);


        })
      }
    }
    loadTarefas();
  }, [])

  async function handleRegister(e) {
    e.preventDefault();
    if (tarefa !== "") {

      if(edit.id){
        //se o objeto edit tiver alguma propriedade, significa que o usuario esta editando uma tarefa
        handleUpdateTarefa();
        return;
      }
      await addDoc(collection(db, "tarefas"), {
        tarefa: tarefa,
        created: new Date(),
        userUid: user?.uid,//verifica se o user existe se não existir retorna undefined
      })
        .then(() => {
          setTarefa('');
          console.log("Tarefa registrada com sucesso!");
        })
        .catch((error) => {
          console.log("Erro ao registrar tarefa: ", error);
        })

    } else {
      alert('Preencha a tarefa!');
    }
  }
 

  async function handleSair() {
    await signOut(auth);
  }
  
   async function deleteTarefa(id){
    const docRef = doc(db,'tarefas',id);
    await deleteDoc(docRef);
   }

   async function editarTarefa(item){
    setTarefa(item.tarefa);
    setEdit(item);
  
   }
    async function handleUpdateTarefa(){
      const docRef =  doc(db,'tarefas',edit?.id);
      await updateDoc(docRef,{
        tarefa:tarefa
      })
      .then(()=>{
        setTarefa('');
        setEdit({});
      })
      .catch(()=>{
        console.log('Erro ao atualizar tarefa');
        setTarefa('');
        setEdit({});
      })
    
  }


  return (
    <div className='admin-container'>
      <h1>minhas tarefas</h1>
      <form className='form' onSubmit={handleRegister}>
        <textarea placeholder='O que você precisa fazer?' value={tarefa} onChange={(e) => setTarefa(e.target.value)} />
        {Object.keys(edit).length>0 ? (<button className='btn-register' type='submit'>Atualizar tarefa</button>):(<button className='btn-register' type='submit'>Registrar tarefa</button>)} 
       
        {/* se o objeto edit tiver alguma propriedade, significa que o usuario esta editando uma tarefa, se não tiver, significa que o usuario esta criando uma nova tarefa */}
        {/* //verifica se o objeto edit tem alguma propriedade, se tiver significa que o usuario esta editando uma tarefa */}
      </form>


      {tarefas.map((item) => (
        <article key={item.id} className='list'>
          <p>
            {item.tarefa}
          </p>
          <div>
            <button onClick={()=>editarTarefa(item)}>editar</button>
            <button onClick={() => deleteTarefa(item.id)} className='btn-delete'>deletar</button>
          </div>

        </article>
      ))}

      <button className='btn-sair' onClick={handleSair}>Deslogar</button>

    </div>
  )
}

export default Admin
