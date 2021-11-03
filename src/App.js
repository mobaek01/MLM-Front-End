import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'


const App = () => {


   const [ messages, setMessages ] = useState([])
   const [ createdAuthor, setcreatedAuthor ] = useState('')
   const [createdMessage, setcreatedMessage ] = useState('')
   const [ targetId, settargetId ] = useState('')
   const [ editOn, seteditOn ] = useState(false)
   const [ targetAuthor, settargetAuthor ] = useState('')
   const [ targetMessage, settargetMessage ] = useState('')



   const updateAuthor = (event) => {
      setcreatedAuthor(event.target.value)
      settargetAuthor(event.target.value)
   }

   const updateMessage = (event) => {
      setcreatedMessage(event.target.value)
      settargetMessage(event.target.value)
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
      editOn?seteditOn(false):seteditOn(true)
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
                           <p>(timestamp here)</p>
                           <button onClick={(event) => {
                              handleLike(message)
                           }}>Like</button>
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

            </div>
         </div>
         <footer>
         <h4>Send a message...</h4>
         <form onSubmit={handleSendBtn}>
            Username: <input type='text' onChange={updateAuthor}/><br/>
            <textarea onChange={updateMessage} /><br/>
            <input type='submit' value='send'/>
         </form>
         </footer>
      </main>
   )
}

export default App;
