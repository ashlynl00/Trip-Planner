// import tools 
import { useState } from "react";
import moment from 'moment';

// import components
import ModalComponent from "./ModalComponent/ModalComponent";


const SingleTripComponent = (props) => {
    // create state to define if an element shows or not
    const [showing, setShowing] = useState(false);
    const toggleShowing = () => {
        setShowing(!showing);
    };

    // format dates from trip
    console.log(props.trip.dateStart)
    let tripStart = moment.utc(props.trip.dateStart).format('MM/DD/YYYY');
    let tripEnd = moment.utc(props.trip.dateEnd).format('MM/DD/YYYY');
    let tripStartFormatted = moment.utc(props.trip.dateStart).format("MMM Do YY");
    let tripEndFormatted = moment.utc(props.trip.dateEnd).format("MMM Do YY");
    console.log(tripStart);
    
    return (
        <div className="single-trip-item">
            {showing ?
                <ModalComponent trip={props.trip} toggleShowing={toggleShowing} tripStart={tripStart} tripEnd={tripEnd} tripStartFormatted={tripStartFormatted} tripEndFormatted={tripEndFormatted} users={props.users}></ModalComponent>
                :
                <div className="trip-preview" onClick={toggleShowing}>
                    <h3>{props.trip.tripName}</h3>
                    <h4>Destinations: {props.trip.destinations} From {tripStart} to {tripEnd} </h4>
                </div>
            }
        </div>
    )
}

export default SingleTripComponent;