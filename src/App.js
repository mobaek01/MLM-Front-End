import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'


const App = () => {


   const [ messages, setMessages ] = useState([])
   const [ createdAuthor, setcreatedAuthor ] = useState('')
   const [ createdMessage, setcreatedMessage ] = useState('')

   const updateAuthor = (event) => {
      setcreatedAuthor(event.target.value)
   }

   const updateMessage = (event) => {
      setcreatedMessage(event.target.value)
   }

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

   const handleEditButton = (message) => {
   }

   return(
      <main>
         <header>
            <h1>test 2</h1>
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
                        </div>
                        <div className='cardBody'>
                           <p>{message.message}</p>
                        </div>
                        <div className='cardLower'>
                           <p>(timestamp here)</p>
                           <button>Like</button>
                           <button onClick={ (event) => {
                              handleDelete(message)
                           } }>Delete
                           </button>
                           <button onClick={ (event) => {
                              handleEditButton(message)
                              } }>Edit
                           </button>
                        </div>
                     </div>
                  )
               })}
            </div>
            <div className='right'>
               <h4>Send a message...</h4>
               <form onSubmit={handleSendBtn}>
                  Username: <input type='text' onChange={updateAuthor}/><br/>
                  <input type='text-area' onChange={updateMessage} /><br/>
                  <input type='submit' value='send'/>
               </form>
            </div>
         </div>
         <footer>
         </footer>
      </main>
   )
}

export default App;
