import { parse } from "ipaddr.js";
import { useState } from "react";
import apiUrl from "../../../apiConfig";
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import EventComponent from "./EventComponents";

const DayComponent = (props) => {
    let navigate = useNavigate();
    const [showing, setShowing] = useState(false);
    const toggleShowing = () => {
        setShowing(!showing);
    };
    const [showingEventForm, setShowingEventForm] = useState(false);
    const toggleShowingEventForm = () => {
        setShowingEventForm(!showingEventForm);
    };
    const [addDescription, setAddDescription] = useState({
        description: ''
    });
    const [addEvent, setAddEvent] = useState({
        eventName: '',
        eventTime: '',
        eventPrice: ''
    })
    const handleInputChangeDescription = (e) => {
        setAddDescription({
            ...addDescription,
            [e.target.name]: e.target.value
        })
        console.log(addDescription);
    }
    const handleInputChangeEvent = (e) => {
        setAddEvent({
            ...addEvent,
            [e.target.name]: e.target.value
        })
        console.log(addEvent);
    }
    const sendDescription = async (description, tripToEdit, formattedCurrentDay) => {
        const apiResponse = await fetch(`${apiUrl}/trips/${tripToEdit}`, {
            method: "PUT",
            body: JSON.stringify({description: description, currentDay: formattedCurrentDay}),
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
    // get which day it is in moment format by starting with day 0 and adding it with current index
    let currentDay = moment(props.tripStart).add(props.index, 'days');
    console.log(currentDay);
    let formattedCurrentDay = moment(currentDay).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    //let parsedDate = new Date(formattedCurrentDay).toISOString().split('.')[0]+"Z";
    console.log(formattedCurrentDay);
    //console.log(parsedDate);
    const submitAddDescription = (e) => {
        e.preventDefault();
        // also send to fetch the current day to set daytime of this itinerary item
        sendDescription(addDescription, props.trip._id, formattedCurrentDay)
        toggleShowing();
        setAddDescription({
            description: ''
        });
        toggleShowing();
    }
    console.log(props.trip.itinerary[props.index])

    // add event
    const sendEvent = async (event, tripToEdit, formattedCurrentDay) => {
        const apiResponse = await fetch(`${apiUrl}/trips/${tripToEdit}`, {
            method: "PUT",
            body: JSON.stringify({event: event, currentDay: formattedCurrentDay}),
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
    const submitAddEvent = (e) => {
        e.preventDefault();
        // also send to fetch the current day to set daytime of this itinerary item
        sendEvent(addEvent, props.trip._id, formattedCurrentDay)
        toggleShowingEventForm();
        setAddEvent({
            eventName: '',
            eventTime: '',
            eventPrice: ''
        });
        toggleShowingEventForm();
    }
    return (
        <div>
            {props.trip.itinerary[props.index] == null ? 
                <>
                    <p>Description: Not added</p>
                    {showing ?
                        <>
                            <form onSubmit={submitAddDescription}>
                                Description: <textarea type='text' name='description' value={addDescription.description} onChange={handleInputChangeDescription}></textarea>
                                <button type='submit'>Submit</button>
                            </form>
                            <button onClick={toggleShowing}>Cancel</button>
                        </>
                        :
                        <button onClick={toggleShowing}>Add Description</button>
                    }
                    {/* <p>Events: None added</p>
                    {showingEventForm ?
                        <form onSubmit={submitAddEvent}>
                            Event Name: <input type='text' name='eventName' value={addEvent.eventName} onChange={handleInputChangeEvent}></input>
                            Event Time: <input type='time' name='eventTime' value={addEvent.eventTime} onChange={handleInputChangeEvent}></input>
                            Event Price: <input type='number' name='eventPrice' value={addEvent.eventPrice} onChange={handleInputChangeEvent}></input>
                            <button type='submit'>Submit</button>
                        </form>
                        :
                        <button onClick={toggleShowingEventForm}>Add Event</button>
                    } */}
                </>
                : 
                <>
                    {props.trip.itinerary[props.index].description == undefined ?
                        <>
                            <p>Description: Not added</p>
                            {showing ?
                                <>
                                    <form onSubmit={submitAddDescription}>
                                        Description: <textarea type='text' name='description' value={addDescription.description} onChange={handleInputChangeDescription}></textarea>
                                        <button type='submit'>Submit</button>
                                    </form>
                                    <button onClick={toggleShowing}>Cancel</button>
                                </>
                                :
                                <button onClick={toggleShowing}>Add Description</button>
                            }
                        </>
                        :
                        <>
                            <p>Description: {props.trip.itinerary[props.index].description}</p>
                            <button>Edit Description</button>
                        </>
                    }
                    <ul>Events:
                        {props.trip.itinerary[props.index].events.map((event)=>{
                            return (
                                <li><EventComponent event={event} formattedCurrentDay={formattedCurrentDay} trip={props.trip}></EventComponent></li>
                            )
                        })}
                    </ul>
                    {showingEventForm ?
                        <>
                            <form onSubmit={submitAddEvent}>
                                Event Name: <input type='text' name='eventName' value={addEvent.eventName} onChange={handleInputChangeEvent}></input>
                                Event Time: <input type='time' name='eventTime' value={addEvent.eventTime} onChange={handleInputChangeEvent}></input>
                                Event Price: <input type='number' name='eventPrice' value={addEvent.eventPrice} onChange={handleInputChangeEvent}></input>
                                <button type='submit'>Submit</button>
                            </form>
                            <button onClick={toggleShowingEventForm}>Cancel</button>
                        </>
                        :
                        <button onClick={toggleShowingEventForm}>Add Event</button>
                    }
                </>
            }
        </div>
    )
}

export default DayComponent;