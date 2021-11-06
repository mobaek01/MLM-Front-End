import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

const Friend = ({currentUser, friends}) => {

    return (
        <div className = "friendList">
            <h2>Friends List</h2>
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
