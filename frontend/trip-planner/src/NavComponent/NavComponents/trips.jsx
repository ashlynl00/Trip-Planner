import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../apiConfig";
import SingleTripComponent from "./SingleTripComponent/SingleTripComponent";

const Trips = (props) => {
    const navigate = useNavigate();
    // we want to display any trips that contain the user Id in the trips userIds array
    let parsedCurrentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(parsedCurrentUser);
    console.log('here are all trips')
    console.log(props.trips);
    // get trips
    // const getTrips = async () => {
    //     try{
    //         console.log('inside get trips');
    //         const apiResponse = await  fetch(`${apiUrl}/trips`);
    //         const parsedResponse = await apiResponse.json();
    //         if (parsedResponse.status == 200) {
    //         props.setTrips(parsedResponse.data)
    //         console.log(props.trips);
    //         } else {
    //         console.log('status was 500, did not get trips')
    //         }
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    let currentUserTrips = [];
    const userTrips = () => {
        console.log('inside function')
        // loop through all the trips in state
        for (let i=0; i<props.trips.length; i++) {
            console.log('inside for loop');
            console.log(props.trips[i]);
            // now loop through each trip's ids to check if it compares to current user id
            for (let j=0; j<props.trips[i].userIds.length; j++) {
                console.log('inside second for loop');
                console.log(props.trips[i]);
                console.log(props.trips[i].userIds);
                console.log(props.trips[i].userIds[j]);
                if (props.trips[i].userIds[j] == parsedCurrentUser._id) {
                    console.log('yay this user was found in a trip user id array');
                    currentUserTrips.push(props.trips[i]);
                } else {
                    console.log('this id did not match')
                    console.log(props.trips[i].userIds[j])
                    console.log(parsedCurrentUser._id);
                }
            }
        }
        return currentUserTrips;
    }
    userTrips();
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
    //useEffect(getTrips, []);
    // window.onload=()=>{
    //     document.getElementById('show-trips').click();
    // }
    return (
        <div>
            {parsedCurrentUser !== null ?
                currentUserTrips.length > 0 ?
                    <div>
                        <p>User Trips:</p>
                        <ul>
                            {currentUserTrips.map((trip)=> {
                                return (
                                    <li><SingleTripComponent trip={trip} /></li>
                                )
                            })}
                        </ul>
                        {/* <button onClick={navigate('/new-trip')}>Add a Trip</button> */}
                    </div>
                    :
                    <div>
                        <p>You have no trips currently!</p>
                        {/* <button onClick={navigate('/new-trip')}>Add a Trip</button> */}
                    </div>
                :
                navigate('login')
            }
        </div>
    )
}

export default Trips;