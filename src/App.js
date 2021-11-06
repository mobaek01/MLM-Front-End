import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import Register from './components/register.js'
import LoginForm from './components/login.js'
import Friend from './components/friend.js'


const App = () => {
   //messaging
   const [ messages, setMessages ] = useState([])
   const [ createdAuthor, setcreatedAuthor ] = useState('')
   const [createdMessage, setcreatedMessage ] = useState('')

   //edit message
   const [ targetId, settargetId ] = useState('')
   const [ editOn, seteditOn ] = useState(false)
   const [ targetAuthor, settargetAuthor ] = useState('')
   const [ targetMessage, settargetMessage ] = useState('')

   //Login/Logout
   const [currentUser, setCurrentUser] = useState('')
   const [loginAccepted, setLoginAccepted] = useState()

   //likes
   const [ like, setLike ] = useState()

   //modal
   const [ showLogin, setShowLogin ] = useState(false)
   const [ showRegister, setShowRegister ] = useState(false)

   //friends
   const [ friends, setFriends ] = useState([])
   const [ targetFriend, setTargetFriend ] = useState('')

//==========check for session=======================
   const checkForSession = (name) => {
      axios
         .get(`http://localhost:3001/sessions/find/${name}`)
         .then((response) => {
            setFriends(response.data.currentUser[0].friends)
            console.log(response.data);
            if (response.data.loginAccepted===true){
               // setCurrentUser(name)
               return true
            } else {
               return false
            }
         })
   }

//================= on first load ===============
   useEffect(() => {
      const storedData = window.localStorage.getItem('currentUser')
      setCurrentUser(storedData||'Guest');
      checkForSession(currentUser)
      axios
         .get('http://localhost:3001/chatrooms')
         .then((response) => {
            setMessages(response.data)
            })
   },[])
//-----------------------------------------------------
   useEffect(() => {//store name of user that logged in.
       window.localStorage.setItem('currentUser', currentUser);
   },[currentUser])

   useEffect(() => {
      const storedData = window.localStorage.getItem('currentUser')
      if(checkForSession(currentUser)==true){
         setCurrentUser(storedData)
         console.log(currentUser);
      }
   },[currentUser])

//==================Send Message Button=========
   const handleSendBtn= (event) => {
      event.preventDefault()
      axios.post('http://localhost:3001/chatrooms',
         {
            username:currentUser,
            message:createdMessage,
         }
      ).then(() => {
         axios
            .get('http://localhost:3001/chatrooms')
            .then((response) => {
               setMessages(response.data)
               setcreatedMessage('')
            })
      })
   }
//=============Delete message ===============
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

//__________________________________________________
   const handleLike = (message) => {
       settargetId(message._id)
       axios
        .put(`http://localhost:3001/chatrooms/${message._id}/likes`)
        .then(() => {
            axios
            .get('http://localhost:3001/chatrooms')
            .then((response) => {
               // console.log(response);
               setMessages(response.data)
            })
        })
   }
//=======================Logout========================
   const handleLogout = () => {
      console.log(`loggin out ${currentUser} `);
       axios
        .delete(`http://localhost:3001/sessions/${currentUser}`)
        .then((response) => {
            console.log('you are logged out');
            window.localStorage.removeItem('currentUser');
            setCurrentUser('Guest')
            setFriends([])
        })
   }
//-------------------------------------------------------------
   const openLogin = () => {
       setShowLogin(true)
   }

   const openRegister = () => {
       setShowRegister(true)
   }

   return(
      <main>
         <header>
            <h1>MLM</h1>
            <ul>
            <li className="headerTitle">Welcome {currentUser}</li>

            {currentUser=='Guest'?
               <>
               <li><img onClick={openLogin} className = "headerIcon" src = "https://cdn-icons-png.flaticon.com/512/1828/1828395.png" alt="" /></li>
               <li><img onClick={openRegister} className = "headerIcon" src = "https://cdn-icons-png.flaticon.com/512/1277/1277010.png" alt="" /></li>
               </>
            :
            <>
            <li><img id="logout" className = "headerIcon" src = "https://cdn-icons-png.flaticon.com/512/1828/1828395.png" alt="" onClick={handleLogout}/></li>
            <li>Friends</li>
            </>
            }
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
                           (<>
                               <p>{message.message}</p>

                           </>)
                        }
                        </div>
                        <div className='cardLower'>
                            <p>{message.likes} LIKES</p>
                           <img id="likes" src='./like.png' alt="" onClick={(event) => {
                              handleLike(message)
                           }}/>
                           <img src='./pencil.svg' alt="" onClick={ (event) => {
                              handleEditButton(message)
                           } }/>
                           <img src='./xthin.png' alt="" onClick={ (event) => {
                              handleDelete(message)
                           } }/>
                        </div>
                     </div>
                  )
               })}
            </div>
            <div className='right'>
                {showRegister ?
                <Register setShowRegister={setShowRegister}/>
                :
                <></>}
               {showLogin ?
               <LoginForm setCurrentUser={setCurrentUser} setLoginAccepted={setLoginAccepted} setShowLogin={setShowLogin}/>
               :
                <></>}
               <Friend currentUser={currentUser} friends={friends} setFriends={setFriends} targetFriend={targetFriend} setTargetFriend={setTargetFriend}/>
            </div>
         </div>
         <footer>
         <form className='sendMsg' onSubmit={handleSendBtn}>
            <span >Sending as: {currentUser}</span><br/><input type="hidden" value={currentUser}/>
            <textarea onChange={updateMessage} /><br/>
            <input className = "button" type='submit' value='send'/>
         </form>
         </footer>
      </main>
   )
}

export default App;
