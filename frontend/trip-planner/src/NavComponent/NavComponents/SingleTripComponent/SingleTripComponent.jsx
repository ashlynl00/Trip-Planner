import { useState } from "react";
import ModalComponent from "./ModalComponent";
import moment from 'moment';

const SingleTripComponent = (props) => {
    const [showing, setShowing] = useState(false);
    const toggleShowing = () => {
        setShowing(!showing);
    };
    // format dates
    let tripStart = moment.utc(props.trip.dateStart).format('MM/DD/YYYY');
    let tripEnd = moment.utc(props.trip.dateEnd).format('MM/DD/YYYY');
    console.log(tripStart);
    return (
        <div className="single-trip-item">
            {showing ?
                <ModalComponent trip={props.trip} toggleShowing={toggleShowing}></ModalComponent>
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