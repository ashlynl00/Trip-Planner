import { useState } from "react";
import apiUrl from "../../../apiConfig";
import { useNavigate } from "react-router-dom";

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
    const handleInputChange = (e) => {
        setEditEvent({
            ...editEvent,
            [e.target.name]: e.target.value
        });
        console.log(editEvent);
    };
    const sendEventEdit = async (event, tripToEdit, formattedCurrentDay, eventToEdit) => {
        const apiResponse = await fetch(`${apiUrl}/trips/${tripToEdit}`, {
            method: "PUT",
            body: JSON.stringify({event: event, currentDay: formattedCurrentDay, eventToEdit: eventToEdit}),
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
        }
    }
    const submitEditEvent = (eventToEdit) => {
        // also send to fetch the current day to set daytime of this itinerary item
        sendEventEdit(editEvent, props.trip._id, props.formattedCurrentDay, eventToEdit)
        toggleShowing();
        setEditEvent({
            eventName: '',
            eventTime: '',
            eventPrice: ''
        });
        toggleShowing();
    }
    const deleteEvent = async (formattedCurrentDay, eventToDelete, tripToEdit) => {
        const apiResponse = await fetch(`${apiUrl}/trips/${tripToEdit}`, {
            method: "PUT",
            body: JSON.stringify({currentDay: formattedCurrentDay, eventToDelete: eventToDelete}),
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
        }
    }
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
                        <button type='submit'>Submit</button>
                    </form>
                    <button onClick={toggleShowing}>Cancel</button>
                </>
                :
                <button onClick={toggleShowing}>Edit Event</button>
            }
            <button onClick={()=>{deleteEvent(props.formattedCurrentDay, props.event._id, props.trip._id)}}>Delete Event</button>
        </div>
    )
}

export default EventComponent;