import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../apiConfig";

const Trips = (props) => {
    const navigate = useNavigate();
    // we want to display any trips that contain the user Id in the trips userIds array
    let parsedCurrentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(parsedCurrentUser);
    let currentUserTrips = [];
    // loop through all the trips in state
    for (let i=0; i<props.trips; i++) {
        // now loop through each trip's ids to check if it compares to current user id
        for (let j=0; j<props.trips.userIds; j++) {
            console.log('inside for loop')
            if (props.trips.userIds[j] == parsedCurrentUser._id) {
                console.log('yay this user was found in a trip user id array');
                currentUserTrips.push(props.trips[i]);
            }
        }
    }
    // get all trips that corespond with current user
//   const getTrips = async () => {
//         const apiResponse = await  fetch(`${apiUrl}/trips`);
//         const parsedResponse = await apiResponse.json();
//         if (parsedResponse.status == 200) {
//         props.setTrips(parsedResponse.data)
//         console.log(props.trips);
//         } else {
//         console.log('status was 500, did not get trips')
//         }
//     }
    //getTrips();
    return (
        <div>
            {parsedCurrentUser !== null ?
                currentUserTrips.length > 0 ?
                    <div>
                        <p>User Trips: {currentUserTrips}</p>
                        <button onClick={navigate('/new-trip')}>Add a Trip</button>
                    </div>
                    :
                    <div>
                        <p>You have no trips currently!</p>
                        <button onClick={navigate('/new-trip')}>Add a Trip</button>
                    </div>
                :
                navigate('login')
            }
        </div>
    )
}

export default Trips;