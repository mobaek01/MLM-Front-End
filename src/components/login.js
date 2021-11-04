import React from 'react'
import {useState} from 'react'
import axios from 'axios'

const LoginForm = () => {
   const [ currentUser, setcurrentUser ] = useState({username:"", password:"" })
   const [ username, setuserName] = useState('')
   const [password, setPassword ] = useState('')

   const handleLogin = (event) => {
      event.preventDefault()
      setcurrentUser({username:username, password:password})
   }


   const updatePassword = (event) => {
      setPassword(event.target.value)
   }

   const updateUser = (event) => {
      setuserName(event.target.value)
   }

   return (
      <>
         <h4>Log in</h4>
         <form onSubmit={handleLogin}>
            Username: <input type='text' onChange={updateUser}/><br/>
            Password: <input type='password' onChange={updatePassword}/><br/>
            <input type='submit'/>
         </form>
      </>
   )
}

export default LoginForm
