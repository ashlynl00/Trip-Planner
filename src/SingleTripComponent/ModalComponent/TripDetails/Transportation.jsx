// import tools
import { useState } from 'react';
import moment from 'moment';

// import apiconfig for api url
import apiUrl from '../../../apiConfig';

const Transportation = (props) => {
    // create state to store transportation info
    const [transportationInfo, setTransportationInfo] = useState({
        mode: '',
        departureDate: '',
        departureTime: '',
        returningDate: '',
        returningTime: '',
        destination: '',
        cost: '',
        booked: false
    });

    // create state to store if an element is being shown or not
    const [showing, setShowing] = useState(false);
    const toggleShowing = () => {
        setShowing(!showing);
    };

    // set departure date and returning dates based on if they are already in the db or not
    console.log(props.trip);
    // change travel date to moment format
    let departureDate = null;
    let returningDate = null;
    let booked = null;
    if (props.trip.mainTransportation !== undefined) {
        departureDate = moment.utc(props.trip.mainTransportation.when.departure.departureDate).format('MM/DD/YYYY');
        returningDate = moment.utc(props.trip.mainTransportation.when.returning.returningDate).format('MM/DD/YYYY');

        if (props.trip.mainTransportation.booked == true) {
            booked = 'True';
        } else {
            booked = 'False';
        };

    };

    // keep track of any changes from the input fields
    const handleInputChange = (e) => {
        setTransportationInfo({
            ...transportationInfo,
            [e.target.name]: e.target.value
        });
        console.log(transportationInfo);
    };

    // send transportation state to 
    const sendTransportationInfo = async (tripToEdit, transportationInfo) => {

        const apiResponse = await fetch(`${apiUrl}/trips/${tripToEdit}`, {
            method: "PUT",
            body: JSON.stringify({transportationInfo: transportationInfo}),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const parsedResponse = await apiResponse.json();
        
        // handle response from api
        if (parsedResponse.status == 200) {
            console.log('yay it worked!');
        } else {
            console.log('sad days');
        };

    };

    // reset state and send state info to api request
    const handleSubmit = (e) => {
        e.preventDefault();
        // send data to fetch request
        sendTransportationInfo(props.trip._id, transportationInfo);
        // reset input field state
        setTransportationInfo({
            mode: '',
            departureDate: '',
            departureTime: '',
            returningDate: '',
            returningTime: '',
            destination: '',
            cost: '',
            booked: false
        });
        toggleShowing();
        window.location.reload();
    };

    return (
        <div className='transportation-component'>
            <h3>Transportation: </h3>
            { props.trip.mainTransportation == undefined ?
                showing ?
                    <form onSubmit={handleSubmit}>
                        Mode: <select name="mode" onChange={handleInputChange} value={transportationInfo.mode}>
                            <option value='flight'>Flight</option>
                            <option value='car'>Car</option>
                            <option value='train'>Train</option>
                            <option value='bus'>Bus</option>
                            <option value='boat'>Boat</option>
                            <option value='helicopter'>Helicopter</option>
                            <option value='walk'>Walk</option>
                            <option value='bike'>Bike</option>
                        </select>
                        Departure Date: <input name="departureDate" type='date' onChange={handleInputChange} value={transportationInfo.departureDate}></input>
                        Departure Time: <input name="departureTime" type='time' onChange={handleInputChange} value={transportationInfo.departureTime}></input>
                        Returning Date: <input name="returningDate" type='date' onChange={handleInputChange} value={transportationInfo.returningDate}></input>
                        Returning Time: <input name="returningTime" type='time' onChange={handleInputChange} value={transportationInfo.returningTime}></input>
                        Destination: <input name="destination" type='text' onChange={handleInputChange} value={transportationInfo.destination}></input>
                        Cost: <input name="cost" type='number' onChange={handleInputChange} value={transportationInfo.cost}></input>
                        Booked?: <select name="booked" onChange={handleInputChange} value={transportationInfo.booked}>
                            <option value='false'>False</option>
                            <option value='true'>True</option>
                        </select>
                        <button type='submit'>Submit</button>
                        <button onClick={toggleShowing}>Cancel</button>
                    </form>
                    :
                    <button onClick={toggleShowing}>Add Transportation Info</button>
                
                :
                    <div>
                        <h3>Details: </h3>
                        <p>{props.trip.mainTransportation.mode} to {props.trip.mainTransportation.destination}</p>
                        <p>Departing: {departureDate} at {props.trip.mainTransportation.when.departure.departureTime}</p>
                        <p>Arriving: {returningDate} at {props.trip.mainTransportation.when.returning.returningTime}</p>
                        <p>Cost per Person: ${props.trip.mainTransportation.cost}</p>
                        <p>Booked? {booked}</p>
                        { showing ?
                                <form onSubmit={handleSubmit}>
                                Mode: <select name="mode" onChange={handleInputChange} value={transportationInfo.mode}>
                                    <option value='flight'>Flight</option>
                                    <option value='car'>Car</option>
                                    <option value='train'>Train</option>
                                    <option value='bus'>Bus</option>
                                    <option value='boat'>Boat</option>
                                    <option value='helicopter'>Helicopter</option>
                                    <option value='walk'>Walk</option>
                                    <option value='bike'>Bike</option>
                                </select>
                                Departure Date: <input name="departureDate" type='date' onChange={handleInputChange} value={transportationInfo.departureDate}></input>
                                Departure Time: <input name="departureTime" type='time' onChange={handleInputChange} value={transportationInfo.departureTime}></input>
                                Returning Date: <input name="returningDate" type='date' onChange={handleInputChange} value={transportationInfo.returningDate}></input>
                                Returning Time: <input name="returningTime" type='time' onChange={handleInputChange} value={transportationInfo.returningTime}></input>
                                Destination: <input name="destination" type='text' onChange={handleInputChange} value={transportationInfo.destination}></input>
                                Cost: <input name="cost" type='number' onChange={handleInputChange} value={transportationInfo.cost}></input>
                                Booked?: <select name="booked" onChange={handleInputChange} value={transportationInfo.booked}>
                                    <option value='true'>True</option>
                                    <option value='false'>False</option>
                                </select>
                                <button type='submit'>Submit</button>
                                <button onClick={toggleShowing}>Cancel</button>
                            </form>
                        :
                            <button onClick={toggleShowing}>Edit</button>
                        }
                    </div>
            }
        </div>
    )
}

export default Transportation;
