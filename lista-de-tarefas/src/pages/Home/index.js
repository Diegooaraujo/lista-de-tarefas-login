
import { useState } from 'react'
import './home.css'
import {Link} from 'react-router-dom';

function Home() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(e){
    e.preventDefault();
    if(email !== '' && password !== ''){

    }else{
      alert ('Preencha todos os campos!')
    }

  }


  return (
    <div className='home-container'>
      <h1>Lista de tarefas</h1>
      <span>Gerencie suas tarefas </span>

      <form className='form'onSubmit={handleLogin}>
        <input type='text' placeholder='Digite seu E-mail' value={email} onChage={(e)=>setEmail(e.target.value)}/>
        <input type='password' placeholder='Senha' value={password} onChage={(e)=>setPassword(e.target.value)}/>
        <button type='submit'>Acessar</button>
      </form>
      <Link className='button-link' to='/register'>Não Possui uma conta? cadastre-se</Link>


      
    </div>
  )
}

export default Home
