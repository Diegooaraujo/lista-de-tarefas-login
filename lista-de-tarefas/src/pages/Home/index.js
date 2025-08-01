
import { useState } from 'react'
import './home.css'
import { Link } from 'react-router-dom';

import { auth } from '../../firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { useNavigate } from 'react-router-dom';


function Home() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  async function handleLogin(e){
    e.preventDefault();
    if(email !== '' && password !== ''){
        await signInWithEmailAndPassword(auth,email,password)
        .then(()=>{
          //navegar para pagina admin
          navigate('/admin',{replace:true}); //replace:true evita que o usuario volte para a pagina de login
        })
        .catch((error)=>{
          console.log('erro ao fazer o login');
        })
    }else{
      alert ('Preencha todos os campos!')
    }

  }


  return (
    <div className='home-container'>
      <h1>Lista de tarefas</h1>
      <span>Gerencie suas tarefas </span>

      <form className='form'onSubmit={handleLogin}>
        <input type='text' placeholder='Digite seu E-mail' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type='password' placeholder='Senha' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button type='submit'>Acessar</button>
      </form>
      <Link className='button-link' to='/register'>Não Possui uma conta? cadastre-se</Link>


      
    </div>
  )
}

export default Home
