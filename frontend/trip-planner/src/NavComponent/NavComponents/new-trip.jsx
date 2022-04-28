// import tools
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import apiconfig for api url
import apiUrl from "../../apiConfig";



const NewTrip = (props) => {
    const navigate = useNavigate();
    // parse the user from localstorage
    let parsedCurrentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(parsedCurrentUser);

    // set up state for new trip to exist in
    const [newTrip, setNewTrip] = useState({
        tripName: '',
        dateStart: '',
        dateEnd: '',
        userIds: '',
        destinations: ''
    });

    // update new trip state when form inputs are changed
    const handleInputChange = (e) => {
        setNewTrip({
            ...newTrip,
            [e.target.name]: e.target.value
        })
        console.log(newTrip);
    };

    // send new trip to backend 
    const postNewTrip = async(userId, newTrip) => {
        const apiResponse = await fetch(`${apiUrl}/trips`, {
            method: "POST",
            body: JSON.stringify({trip: newTrip, userId:userId}),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const parsedResponse = await apiResponse.json();

        if (parsedResponse.status == 200) {
            console.log('yay status 200');
            props.setTrips([parsedResponse.data, ...props.trips]);
            console.log('here is now the array of state trips: ');
            console.log(props.trips);
        };

    };

    // send new trip state to api request and reset state
    const submitNewTrip = (e) => {
        e.preventDefault();
        postNewTrip(parsedCurrentUser._id, newTrip);
        // reset form fields
        setNewTrip({
            tripName: '',
            dateStart: '',
            dateEnd: '',
            userIds: '',
            destinations: ''
        });
        navigate('/trips');
    };
    
    return (
        <div>
            <h1>Add a new trip</h1>
            <form onSubmit={submitNewTrip}>
                <h3>Basic Trip Info: </h3>
                <label for='tripName'>Trip Name: </label>
                <input type='text' name='tripName' placeholder='trip name' onChange={handleInputChange} value={newTrip.tripName} required></input>
                <label for='dateStart'>Date Start: </label>
                <input type='date' name='dateStart' placeholder='date start' onChange={handleInputChange} value={newTrip.dateStart}required></input>
                <label for='dateEnd'>Date End: </label>
                <input type='date' name='dateEnd' placeholder='date end' onChange={handleInputChange} value={newTrip.dateEnd} required></input>
                <label for='destinations'>Destinations: </label>
                <input type='text' name='destinations' placeholder='destinations' onChange={handleInputChange} value={newTrip.destinations} required></input>
                {/* <h3>Transportation: </h3>
                <label for='when'>Time of Departure: </label>
                <input type='datetime' name='when' placeholder='date to travel'></input>
                <label for='cost'>Cost of Transportation: </label>
                <input type='number' name='cost' placeholder='cost'></input>
                <label for='booked'>Booking Status: </label>
                <input type='boolean' name='booked' placeholder='booked?'></input>
                <h3>Packing List: </h3>
                <textarea type='text' name='packingList'></textarea>
                <button type="submit">Create</button> */}
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewTrip;
