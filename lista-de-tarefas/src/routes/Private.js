import { useState, useEffect } from 'react'

import { auth } from '../firebaseConnection'
import {onAuthStateChanged} from 'firebase/auth'

import { Navigate } from 'react-router-dom';


function Private({ children }) {
    const [loading,setLoading] = useState(true);
    const [signed,setSigned] = useState(false);

    useEffect(()=>{
        async function checkLogin(){
            const unsub = onAuthStateChanged(auth,(userLogado)=>{ //onAuthStateChanged verifica se o usuario esta logado
               
                if(userLogado){
                    const userData = {
                        uid:userLogado.uid,
                        email:userLogado.email
                    }
                    localStorage.setItem('@user',JSON.stringify(userData));
                    setLoading(false);
                    setSigned(true)
                }else{
                    setLoading(false);
                    setSigned(false);
                }
            })

        }
        checkLogin();
    },[])
    if(loading){
        return(
            <div>

            </div>
        )
    }
    if(!signed){
        //se o usuario nao estiver logado, redireciona para a pagina de login
        return <Navigate to='/'/>
    }

  return (
    <>
      {children}
    </>
  )
}

export default Private
