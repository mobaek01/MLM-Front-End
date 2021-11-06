import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

const Friend = ({currentUser, friends, setFriends, targetFriend, setTargetFriend}) => {

   const updateTargetFriend = (event) => {
      setTargetFriend(event.target.value)
   }

   const handleAddFriend = (event) => {
      event.preventDefault()
      console.log('trying to add friend');
      axios
         .post(`http://localhost:3001/friends/${currentUser}/${targetFriend}`)
         .then((response) => {
            console.log('added friend');
            setFriends(response.data.friends)
         })
   }

    return (
        <div className = "friendList">
            <h2>Friends List</h2>
            <form onSubmit={handleAddFriend}>
               Search user:<input type='text' onChange={updateTargetFriend}/>
               <input type='submit' value='Add Friend'/>
            </form>
            <ul className = "friendNames">
                {friends.map((friend) => {
                    return(
                        <li key={friend._id}>
                            {friend.username}
                        </li>
                    )
                })}
            </ul>
        </div>

    )
}

export default Friend;
