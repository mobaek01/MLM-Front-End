import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import Register from './components/register.js'
import LoginForm from './components/login.js'


const App = () => {


   const [ messages, setMessages ] = useState([])
   const [ createdAuthor, setcreatedAuthor ] = useState('')
   const [createdMessage, setcreatedMessage ] = useState('')
   const [ targetId, settargetId ] = useState('')
   const [ editOn, seteditOn ] = useState(false)
   const [ targetAuthor, settargetAuthor ] = useState('')
   const [ targetMessage, settargetMessage ] = useState('')

   useEffect(() => {
      axios
         .get('http://localhost:3001/chatrooms')
         .then((response) => {
            // console.log(response);
            setMessages(response.data)
         })
   },[])

   const handleSendBtn= (event) => {
      event.preventDefault()
      axios.post('http://localhost:3001/chatrooms',
         {
            username:createdAuthor,
            message:createdMessage,
         }
      ).then(() => {
         axios
            .get('http://localhost:3001/chatrooms')
            .then((response) => {
               setMessages(response.data)
            })
      })
   }
//=============Delete message ====================

   const handleDelete = (message) => {
      axios
         .delete(`http://localhost:3001/chatrooms/${message._id}`)
         .then(() => {
            axios
               .get('http://localhost:3001/chatrooms')
               .then((response) => {
                  setMessages(response.data)
               })
         })
   }
//============= Edit message  =================
   const updateAuthor = (event) => {
      setcreatedAuthor(event.target.value)
      settargetAuthor(event.target.value)
   }
   const updateMessage = (event) => {
      setcreatedMessage(event.target.value)
      settargetMessage(event.target.value)
   }

   const handleEditForm = (event) => {
      event.preventDefault()
      axios.put(`http://localhost:3001/chatrooms/${targetId}`,
         {
            username:createdAuthor||targetAuthor,//if there was nothing typed in the input, use previous value
            message:createdMessage||targetMessage,
            editOn:false
         }
      ).then(() => {
         axios
            .get('http://localhost:3001/chatrooms')
            .then((response) => {
               // console.log(response);
               setMessages(response.data)
            })
      })
   }

   const handleEditButton = (message) => {
      settargetId(message._id)
      editOn?seteditOn(false):seteditOn(true)//edit button is a toggle
      settargetAuthor(message.username)
      settargetMessage(message.message)
      axios.put(`http://localhost:3001/chatrooms/${message._id}`,
         {
            editOn:editOn
         }
      ).then(() => {
         axios
            .get('http://localhost:3001/chatrooms')
            .then((response) => {
               // console.log(response);
               setMessages(response.data)
            })
      })
   }
//=======----User-Registartion----===============


//____________________________________________________________
   const handleLike = (message) => {
   }

   return(
      <main>
         <header>
            <h1>MLM</h1>
            <ul>
               <li>Login</li>
               <li>Register</li>
               <li>Friends</li>
            </ul>
         </header>
         <div className='content'>
            <div className='left'>
               {messages.map((message) => {
                  return(
                     <div key={message._id} className="card">
                        <div className='cardTop'>
                           <h5>{message.username}</h5>
                           <p>(timestamp here)</p>
                        </div>
                        <div className='cardBody'>
                        { message.editOn===true?
                           (<div id="editForm">
                              <form onSubmit={handleEditForm}>
                                 <textarea onChange={updateMessage} value={targetMessage}/><br/>
                                 <input type='submit' value='send'/>
                              </form>
                           </div>):
                           (<p>{message.message}</p>)
                        }
                        </div>
                        <div className='cardLower'>
                           <img src='./like.png' onClick={(event) => {
                              handleLike(message)
                           }}/>
                           <img src='./pencil.svg' onClick={ (event) => {
                              handleEditButton(message)
                           } }/>
                           <img src='./xthin.png'  onClick={ (event) => {
                              handleDelete(message)
                           } }/>
                        </div>
                     </div>
                  )
               })}
            </div>
            <div className='right'>
               <Register/>
               <LoginForm />
            </div>
         </div>
         <footer>
         <h4>Send a message...</h4>
         <form className='sendMsg' onSubmit={handleSendBtn}>
            Alias: <input type='text' onChange={updateAuthor}/><br/>
            <textarea onChange={updateMessage} /><br/>
            <input type='submit' value='send'/>
         </form>
         </footer>
      </main>
   )
}

export default App;
