const ModalComponent = (props) => {
    return (
        <div className="trip-modal">
            <h2>{props.trip.tripName} to {props.trip.destinations}</h2>
            <h3>Dates: </h3>
            <h4>Itinerary: </h4>
            {props.trip.itinerary.map((day)=>{
                return (
                    <p>{day.day.description}</p>
                )
            })}
            <button onClick={props.toggleShowing}>Go back</button>
        </div>
    )
}

export default ModalComponent;