import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'


const LoginForm = ({setCurrentUser}) => {
//------------take the credentials from form --------------------
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')


   const inputUsername = (event) => {
     setUsername(event.target.value)
   }
   const inputPassword = (event) => {
      setPassword(event.target.value)
   }
//-----------check credentials---------------------------------
  const handleLogin = (event) => {
      event.preventDefault()
      setCurrentUser({username:username, password:password})
      axios
          .get(`http://localhost:3001/sessions/${username}/${password}`)
          .then(() => {
              console.log('checking credentials');
          })
    axios
        .post(`http://localhost:3001/sessions/${username}`)
        .then(() => {
            console.log('session created');
        })
  }


//---------------------------------------------------
   return (
      <>
         <h4>Log in</h4>
         <form onSubmit={handleLogin}>
            Username: <input type='text' onChange={inputUsername}/><br/>
            Password: <input type='password' onChange={inputPassword}/><br/>
            <input type='submit'/>
         </form>
      </>
   )
}

export default LoginForm
