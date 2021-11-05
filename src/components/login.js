import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

const Login = () => {

    const [currentUser, setCurrentUser] = React.useState({username:"", password:""})
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const inputUsername = (event) => {
        setUsername(event.target.value)
    }
    const inputPassword = (event) => {
        setPassword(event.target.value)
    }

    const checkCred = (event) => {
        event.preventDefault()
        setCurrentUser({username:username, password: password})
        axios
            .get(`http://localhost:3001/sessions/${username}/${password}`)
            .then(console.log('trying to log in'))
    }

   return (
      <>
         <h4>Log in</h4>
         <form onSubmit={checkCred}>
            Username: <input type='text' onChange={inputUsername}/><br/>
            Password: <input type='text' onChange={inputPassword}/><br/>
            <input type='submit'/>
         </form>
      </>
   )
}

export default Login
