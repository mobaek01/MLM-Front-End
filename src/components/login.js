import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'


const LoginForm = ({setCurrentUser, setLoginAccepted}) => {
//------------take the credentials from form --------------------
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [online, setOnline] = useState(true)




   const inputUsername = (event) => {
     setUsername(event.target.value)
   }
   const inputPassword = (event) => {
      setPassword(event.target.value)
   }
//-----------check credentials---------------------------------
  // const handleLogin = (event) => {
  //     event.preventDefault()
  //     axios
  //         .get(`http://localhost:3001/sessions/${username}/${password}`)
  //         .then(() => {
  //             console.log('checking credentials');
  //         })
  //   axios
  //       // .post(`http://localhost:3001/sessions/${username}`)
  //       // .then(() => {
  //       //     console.log('session created');
  //       //     setLoginAccepted(true)
  //       //     console.log(username);
  //       //     setCurrentUser(username)
  //       // })
  // }

  const handleLogin = () => {
      axios
       .get('http://localhost:3001/users')
       .then((response) => {
           console.log(response);
           axios
           .put(`http://localhost:3001/users/login/${username}`)
           .then(() => {
               console.log('you are logged in');
           })
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
