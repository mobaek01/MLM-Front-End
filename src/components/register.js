import React from 'react'
import {useState} from 'react'
import axios from 'axios'

const Register = () => {
   const [ newUser, setnewUser] = useState('')
   const [ newPassword, setnewPassword ] = useState('')
   const updatenewUser = (event) => {
      setnewUser(event.target.value)
   }

   const updatenewPassword = (event) => {
      setnewPassword(event.target.value)
   }

   const handleRegistration = (event) => {
      setnewUser(event)
      axios.post(`http://localhost:3001/users`,
         {
            username:newUser,
            password:newPassword,
         }
      ).then(() => {
         axios
            .get('http://localhost:3001/')
            .then((response) => {
               // console.log(response);
               console.log(response);
            })
      })
   }

   return (
      <>
         <h4>Make an account</h4>
         <form onSubmit={handleRegistration}>
            Username: <input type='text' onChange={updatenewUser}/><br/>
            Password: <input type='text' onChange={updatenewPassword}/><br/>
            <input type='submit'/>
         </form>
      </>
   )
}

export default Register
