// import tools
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import apiconfig for api url
import apiUrl from "../../../../apiConfig";



const EventComponent = (props) => {
    const navigate = useNavigate();
    const [showingEventForm, setShowingEventForm] = useState(false);
    const toggleShowing = () => {
        setShowingEventForm(!showingEventForm);
    };
    const [editEvent, setEditEvent] = useState({
        eventName: '',
        eventTime: '',
        eventPrice: ''
    });

    // change event state everytime form input fields change
    const handleInputChange = (e) => {
        setEditEvent({
            ...editEvent,
            [e.target.name]: e.target.value
        });
        console.log(editEvent);
    };

    // send a request to backend to update trip model
    const sendEventEdit = async (event, tripToEdit, formattedCurrentDay, eventToEdit, day) => {

        const apiResponse = await fetch(`${apiUrl}/trips/${tripToEdit}`, {
            method: "PUT",
            body: JSON.stringify({event: event, currentDay: formattedCurrentDay, eventToEdit: eventToEdit, day: day}),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const parsedResponse = await apiResponse.json();

        if (parsedResponse.status == 200 && parsedResponse.data == 'did not match') {
            console.log('did not match')
        } else {
            console.log('yay it worked!');
            navigate('/trips');
        };

    };

    // send event state to api request function and reset state
    const submitEditEvent = (eventToEdit) => {
        let index = props.index
        let day =index + 1
        // also send to fetch the current day to set daytime of this itinerary item
        sendEventEdit(editEvent, props.trip._id, props.formattedCurrentDay, eventToEdit, day)
        toggleShowing();
        setEditEvent({
            eventName: '',
            eventTime: '',
            eventPrice: ''
        });
        toggleShowing();
        window.location.reload();
        props.toggleShowing();
    };

    // send deletion info to backend to update trip
    const deleteEvent = async (formattedCurrentDay, eventToDelete, tripToEdit, day) => {

        const apiResponse = await fetch(`${apiUrl}/trips/${tripToEdit}`, {
            method: "PUT",
            body: JSON.stringify({currentDay: formattedCurrentDay, eventToDelete: eventToDelete, day: day}),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const parsedResponse = await apiResponse.json();

        if (parsedResponse.status == 200 && parsedResponse.data == 'did not match') {
            console.log('did not match')
        } else {
            console.log('yay it worked!');
            navigate('/trips');
            window.location.reload();
            props.toggleShowing();
        };

    };

    return (
        <div>
            <p>{props.event.eventName}</p>
            <p>Price: {props.event.eventPrice}</p>
            <p>Time: {props.event.eventTime}</p>
            {showingEventForm ?
                <>
                    <form onSubmit={(e)=>{
                        e.preventDefault();
                        submitEditEvent(props.event._id)}}>
                        Event Name: <input type='text' name='eventName' value={editEvent.eventName} onChange={handleInputChange}></input>
                        Event Time: <input type='time' name='eventTime' value={editEvent.eventTime} onChange={handleInputChange}></input>
                        Event Price: <input type='number' name='eventPrice' value={editEvent.eventPrice} onChange={handleInputChange}></input>
                        <button type='submit' className="day-btns">Submit</button>
                    </form>
                    <button onClick={toggleShowing} className="day-btns">Cancel</button>
                </>
                :
                <button onClick={toggleShowing} className="day-btns">Edit Event</button>
            }
            <button onClick={()=>{
                let index = props.index
                let day =index + 1
                deleteEvent(props.formattedCurrentDay, props.event._id, props.trip._id, day)
                }} className="day-btns">Delete Event</button>
        </div>
    )
}

export default EventComponent;