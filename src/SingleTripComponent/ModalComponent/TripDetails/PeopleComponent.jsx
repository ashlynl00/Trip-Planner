// import tools
import { useEffect, useState } from "react";

// import apiconfig for api url
import apiUrl from "../../../apiConfig";



const PeopleComponent = (props) => {
    // set up state for users to be stored
    const [users, setUsers] = useState([]);
    const [people, setPeople] = useState([]);
    const [showing, setShowing] = useState(false);
    let usersList;
    
    const toggleShowing = () => {
        setShowing(!showing);
    };

    // api request for all users
    const getUsers = async () => {

        try {
          const usersResponse = await fetch(`${apiUrl}/users`);
          const parsedUsers = await usersResponse.json();

          if (parsedUsers.status == 200) {
            console.log('yay it worked!');
            console.log(parsedUsers);
            console.log(parsedUsers.status);
            console.log(parsedUsers.data);
            setUsers(parsedUsers.data);
            usersList = parsedUsers.data;
            console.log(users);
            console.log(usersList);
            // setUsers(
            //     ...users,
            //     parsedUsers.data
            // );
            // console.log(users);
          } else {
              console.log('oh no it did not work');
          };
          
        } catch (err) {
            console.log(err);
        };
        findMatchingUsers();
    };


    let peopleArray = [];
    const findMatchingUsers = () => {
        // find users that match trip users
        console.log(props.trip.userIds.length);
        for (let i=0; i<props.trip.userIds.length; i++) {
            console.log('in first for loop');
            console.log(props.trip.userIds[i]);
            //console.log(users);

            // for each userId we need to get the username of that user
            // so we need to match the id with the username from user state
            for (let j=0; j<usersList.length; j++) {
                console.log('in second for loop');
                console.log(usersList[j]._id);

                if (props.trip.userIds[i] == usersList[j]._id) {
                    console.log('inside if statement');
                    console.log(usersList[j].username);
                    console.log(peopleArray);
                    console.log(peopleArray.length);
                    if (peopleArray.length == 0) {
                        console.log('adding this: ')
                        peopleArray.push(usersList[j].username);
                        console.log(peopleArray);
                    } else {
                        for (let k=0; k<peopleArray.length; k++) {
                            console.log(peopleArray[k]);
                            if (peopleArray[k] == usersList[j].username) {
                                console.log('not going to add this!');
                                console.log(usersList[j].username)
                            } else {
                                console.log('adding this: ')
                                peopleArray.push(usersList[j].username);
                                console.log(peopleArray);
                            }
                        }
                    }
                    
                    // now we want to push this user's username to people state array
                    
                    // setPeople([
                    //     ...people,
                    //     users[j].username
                    // ])
                    
                };

            };

        };
        // set people to be equal to new array
        let finalPeopleArray = [...new Set(peopleArray)];
        setPeople(finalPeopleArray);
        console.log(people);
    }

    // first check that the username entered is one that exists
    // store value in state
    const [addUsername, setAddUsername] = useState({
        username: ''
    });
    // this should be a get route
    const handleInputChange = (e) => {
        setAddUsername({
            ...addUsername,
            [e.target.name]: e.target.value
        });
        console.log(addUsername);
    };

    // edit user trip to add a user to userIds array
    const sendUserToTrip = async (tripToEdit, userIdToAdd) => {
        const apiResponse = await fetch(`${apiUrl}/trips/${tripToEdit}`, {
            method: "PUT",
            body: JSON.stringify({userIdToAdd: userIdToAdd}),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const parsedResponse = await apiResponse.json();
        
        if (parsedResponse.status == 200) {
            console.log('yay it worked!!!');
            // push this to people state
            peopleArray.push(addUsername.username);
            console.log(peopleArray);
            setPeople([peopleArray]);
            console.log(people);
        } else {
            console.log('it did not work:(');
        };

    };

    // send a request to backend to check if this is even an account
    const checkUser = async (username) => {

        const apiResponse = await fetch(`${apiUrl}/users/add`, {
            method: "POST",
            body: JSON.stringify(username),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const parsedResponse = await apiResponse.json();
        console.log(parsedResponse);

        if (parsedResponse.status == 200 && parsedResponse.data == 'not a possible user:(') {
            console.log('ohr nor wrong username!');
            alert('this username does not exist!');
        } else {
            console.log('yay it workkkkeddd');
            console.log(parsedResponse.data);
            // add it to the trip now!
            // we want to edit the trip!
            sendUserToTrip(props.trip._id, parsedResponse.data._id);
        };

    };

    // send submission to api request and reset state
    const handleSubmit = (e) => {
        e.preventDefault();
        checkUser(addUsername);
        setAddUsername({
            username: ''
        });
        toggleShowing();
    };

    useEffect(()=>{
        getUsers();
    }, []);
    return (
        <div>
            <h3>People: </h3>
            <ul>
                {people.map((user)=>{
                    return(
                        <li>{user}</li>
                    )
                })}
            </ul>
            { showing ?
                <>
                    <h3>Please add the user's username that you would like to add to this trip: </h3>
                    <form onSubmit={handleSubmit}>
                        <input name="username" type="text" onChange={handleInputChange} value={addUsername.username}></input>
                        <button type="submit">Submit</button>
                    </form>
                </>
                :
                <button onClick={toggleShowing}>Add Person to this Trip</button>
            }
        </div>
    )
};
export default PeopleComponent;