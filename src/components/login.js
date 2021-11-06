import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'


const LoginForm = ({setCurrentUser, setLoginAccepted}) => {
//------------take the credentials from form --------------------
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [online, setOnline] = useState(true)


   const inputUsername = (event) => {//updates value on input change
      setUsername(event.target.value)
   }
   const inputPassword = (event) => {//updates value on input change
      setPassword(event.target.value)
   }
//-----------On login---------------------------------
   const handleLogin = (event) => {
      event.preventDefault()
      axios //pass login credentials to get checked.
         .get(`http://localhost:3001/sessions/login/${username}/${password}`)
         .then(() => {
            console.log('sending credentials');
         })
      axios//pass name of session to create.
         .post(`http://localhost:3001/sessions/${username}`)
         .then(() => {
            console.log('Trying to create session');
            setLoginAccepted(true)
            console.log(`setting current username to ${username}`);
            setCurrentUser(username)
         })
  }

  // const handleLogin = () => {
  //     axios
  //      .get('http://localhost:3001/users')
  //      .then((response) => {
  //          console.log(response);
  //          axios
  //          .put(`http://localhost:3001/users/login/${username}`)
  //          .then(() => {
  //              console.log('you are logged in');
  //          })
  //      })
  // }


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
