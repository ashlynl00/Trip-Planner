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
    const postNewTrip = async(userId, newTrip, totalDays) => {
        const apiResponse = await fetch(`${apiUrl}/trips`, {
            method: "POST",
            body: JSON.stringify({trip: newTrip, userId:userId, totalDays: totalDays}),
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

    const getDifferenceInDays = (date1, date2) => {
        const diffInMs = Math.abs(date2 - date1);
        return diffInMs / (1000 * 60 * 60 * 24);
    };

    let date1 = new Date(newTrip.dateStart);
    let date2 = new Date(newTrip.dateEnd);
    console.log('this is date1')
    console.log(date1);
    console.log(date2);
    let totalDays = getDifferenceInDays(date1, date2);
    console.log(totalDays)

    // send new trip state to api request and reset state
    const submitNewTrip = (e) => {
        e.preventDefault();
        postNewTrip(parsedCurrentUser._id, newTrip, totalDays);
        // reset form fields
        setNewTrip({
            tripName: '',
            dateStart: '',
            dateEnd: '',
            userIds: '',
            destinations: ''
        });
        navigate('/trips');
        window.location.reload();
    };

    return (
        <div id="new-trip-wrapper">
            <div id="new-trip">
                <form onSubmit={submitNewTrip}>
                    <h3>Trip Info: </h3>
                    <div className="input-field">
                        <label for='tripName'>Trip Name: </label>
                        <input type='text' name='tripName' placeholder='trip name' onChange={handleInputChange} value={newTrip.tripName} required></input>
                    </div>
                    <div className="input-field">
                        <label for='dateStart'>Date Start: </label>
                        <input type='date' name='dateStart' placeholder='date start' onChange={handleInputChange} value={newTrip.dateStart}required></input>
                    </div>
                    <div className="input-field">
                        <label for='dateEnd'>Date End: </label>
                        <input type='date' name='dateEnd' placeholder='date end' onChange={handleInputChange} value={newTrip.dateEnd} required></input>
                    </div>
                    <div className="input-field">
                        <label for='destinations'>Destinations: </label>
                        <input type='text' name='destinations' placeholder='destinations' onChange={handleInputChange} value={newTrip.destinations} required></input>
                    </div>
                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default NewTrip;
