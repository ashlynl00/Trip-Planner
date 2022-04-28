import { useEffect, useState } from "react";
import apiUrl from "../../../apiConfig";

const PeopleComponent = (props) => {
    const [users, setUsers] = useState([]);
    const [people, setPeople] = useState([]);
    const getUsers = async () => {
        try {
          const users = await fetch(`${apiUrl}/users`);
          const parsedUsers = await users.json();
          setUsers([
              ...users,
              parsedUsers.data
          ]);
          console.log(users);
        } catch (err) {
            console.log(err);
        }
      } 
    for (let i=0; i<props.trip.userIds.length; i++) {
        console.log('in first for loop');
        console.log(props.trip.userIds[i]);
        console.log(users);
        // for each userId we need to get the username of that user
        // so we need to match the id with the username from user state
        for (let j=0; j<users.length; j++) {
            console.log('in second for loop');
            console.log(users[j]._id);
            if (props.trip.userIds[i] == users[j]._id) {
                // now we want to push this user's username to people state array
                setPeople([
                    ...people,
                    users[j].username
                ])
                console.log(people);
            }
        }
    };
    // useEffect(getUsers, []);
    return (
        <div>
            <h3>People: </h3>
            <ul>
                {props.trip.userIds.map((user)=>{
                    <li>{user}</li>
                })}
            </ul>
        </div>
    )
};
export default PeopleComponent;