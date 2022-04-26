import DayComponent from "./DayComponent";

const ModalComponent = (props) => {
    const getDifferenceInDays = (date1, date2) => {
        const diffInMs = Math.abs(date2 - date1);
        return diffInMs / (1000 * 60 * 60 * 24);
    }
    let date1 = new Date(props.tripStart);
    let date2 = new Date(props.tripEnd);
    console.log('this is date1')
    console.log(date1);
    console.log(date2);
    let totalDays = getDifferenceInDays(date1, date2);
    console.log(totalDays)
    return (
        <div className="trip-modal">
            <h2>{props.trip.tripName} to {props.trip.destinations}</h2>
            <h3>Dates: {props.tripStartFormatted} - {props.tripEndFormatted}</h3>
            <h4>Itinerary: </h4>
            {[...Array(totalDays)].map((elementInArray, index)=>{
                return (
                    <div>
                        <p className="day-component">Day {index+1}: </p>
                        <DayComponent index={index} trip={props.trip} tripStart={props.tripStart} ></DayComponent>
                    </div>
                )   
            })}
            <button onClick={props.toggleShowing}>Go back</button>
        </div>
    )
}

export default ModalComponent;