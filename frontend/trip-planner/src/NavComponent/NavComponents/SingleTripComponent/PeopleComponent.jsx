import { useState } from "react";

const PeopleComponent = (props) => {
    const [people, setPeople] = useState([]);
    for (let i=0; i<props.trip.userIds.length; i++) {
        console.log('in first for loop');
        console.log(props.trip.userIds[i]);
        console.log(props.users);
        // for each userId we need to get the username of that user
        // so we need to match the id with the username from user state
        for (let j=0; j<props.users.length; j++) {
            console.log('in second for loop');
            console.log(props.users[j]._id);
            if (props.trip.userIds[i] == props.users[j]._id) {
                // now we want to push this user's username to people state array
                setPeople([
                    ...people,
                    props.users[j].username
                ])
                console.log(people);
            }
        }
    }
    return (
        <div>
            <h4>People: </h4>
            <ul>
                {props.trip.userIds.map((user)=>{
                    <li>{user}</li>
                })}
            </ul>
        </div>
    )
};
export default PeopleComponent;