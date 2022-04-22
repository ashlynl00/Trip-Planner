const SingleTripComponent = (props) => {
    return (
        <div class="single-trip-item">
            <h3>{props.trip.tripName}</h3>
            <h4>Destinations: {props.trip.destinations} From {props.trip.dateStart} to {props.trip.dateEnd} </h4>
        </div>
    )
}

export default SingleTripComponent;