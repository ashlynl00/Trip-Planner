import { useState } from "react";
import ModalComponent from "./ModalComponent";
import moment from 'moment';

const SingleTripComponent = (props) => {
    const [showing, setShowing] = useState(false);
    const toggleShowing = () => {
        setShowing(!showing);
    };
    // format dates
    console.log(props.trip.dateStart)
    let tripStart = moment.utc(props.trip.dateStart).format('MM/DD/YYYY');
    let tripEnd = moment.utc(props.trip.dateEnd).format('MM/DD/YYYY');
    let tripStartFormatted = moment.utc(props.trip.dateStart).format("MMM Do YY");
    let tripEndFormatted = moment.utc(props.trip.dateEnd).format("MMM Do YY");
    console.log(tripStart);
    return (
        <div className="single-trip-item">
            {showing ?
                <ModalComponent trip={props.trip} toggleShowing={toggleShowing} tripStart={tripStart} tripEnd={tripEnd} tripStartFormatted={tripStartFormatted} tripEndFormatted={tripEndFormatted}></ModalComponent>
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