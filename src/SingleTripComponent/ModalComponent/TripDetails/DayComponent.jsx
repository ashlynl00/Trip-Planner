import { parse } from "ipaddr.js";

// import tools
import { useState } from "react";
import moment from 'moment';
import { useNavigate } from "react-router-dom";

// import apiconfig for api url
import apiUrl from "../../../apiConfig";

// import components
import EventComponent from "./ItineraryComponent/EventComponents";



const DayComponent = (props) => {
    let navigate = useNavigate();

    // create state to store whether or not an element is being displayed on page or not
    const [showing, setShowing] = useState(false);
    const toggleShowing = () => {
        setShowing(!showing);
    };
    const [showingEventForm, setShowingEventForm] = useState(false);
    const toggleShowingEventForm = () => {
        setShowingEventForm(!showingEventForm);
    };

    // store description in state
    const [addDescription, setAddDescription] = useState({
        description: ''
    });

    // store add event in state
    const [addEvent, setAddEvent] = useState({
        eventName: '',
        eventTime: '',
        eventPrice: ''
    });

    // set state everytime input for description is changed
    const handleInputChangeDescription = (e) => {
        setAddDescription({
            ...addDescription,
            [e.target.name]: e.target.value
        })
        console.log(addDescription);
    };

    // set state everytime input for event changes
    const handleInputChangeEvent = (e) => {
        setAddEvent({
            ...addEvent,
            [e.target.name]: e.target.value
        })
        console.log(addEvent);
    };

    // send api request with description info to trip controller
    const sendDescription = async (description, tripToEdit, formattedCurrentDay, day) => {

        const apiResponse = await fetch(`${apiUrl}/trips/${tripToEdit}`, {
            method: "PUT",
            body: JSON.stringify({description: description, currentDay: formattedCurrentDay, day: day}),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const parsedResponse = await apiResponse.json();

        if (parsedResponse.status == 200 && parsedResponse.data == 'did not match') {
            console.log('did not match')
        } else {
            console.log('yay it worked!');
            window.location.reload();
            navigate('/trips');
        };

    };

    // get which day it is in moment format by starting with day 0 and adding it with current index
    let currentDay = moment(props.tripStart).add(props.index, 'days');
    console.log(currentDay);
    let formattedCurrentDay = moment(currentDay).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    console.log(formattedCurrentDay);

    // handle submission for adding a description form and send description state to api request
    const submitAddDescription = (e) => {
        e.preventDefault();
        let index = props.index
        let day =index + 1
        // also send to fetch the current day to set daytime of this itinerary item
        sendDescription(addDescription, props.trip._id, formattedCurrentDay, day)
        toggleShowing();

        // reset state
        setAddDescription({
            description: ''
        });
        toggleShowing();
    };

    console.log(props.trip.itinerary[props.index])

    // send api request to change events in db
    const sendEvent = async (event, tripToEdit, formattedCurrentDay, day) => {
        const apiResponse = await fetch(`${apiUrl}/trips/${tripToEdit}`, {
            method: "PUT",
            body: JSON.stringify({event: event, currentDay: formattedCurrentDay, day: day}),
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

    // send event state to api request
    const submitAddEvent = (e) => {
        e.preventDefault();
        let index = props.index
        let day =index + 1
        // also send to fetch the current day to set daytime of this itinerary item
        sendEvent(addEvent, props.trip._id, formattedCurrentDay, day)
        toggleShowingEventForm();
        setAddEvent({
            eventName: '',
            eventTime: '',
            eventPrice: ''
        });
        toggleShowingEventForm();
        window.location.reload();
        props.toggleShowing();
    };

    return (
        <div>
            {props.trip.itinerary[props.index] == null ? 
                <>
                    <p>Description: Not added</p>
                    {showing ?
                        <>
                            <form onSubmit={submitAddDescription}>
                                <textarea type='text' name='description' value={addDescription.description} onChange={handleInputChangeDescription}></textarea>
                                <button type='submit' className="day-btns">Submit</button>
                            </form>
                            <button onClick={toggleShowing} className="day-btns">Cancel</button>
                        </>
                        :
                        <button onClick={toggleShowing} className="day-btns">Add Description</button>
                    }
                </>
                : 
                <>
                    {props.trip.itinerary[props.index].description == undefined ?
                        <>
                            <p>Description: Not added</p>
                            {showing ?
                                <>
                                    <form onSubmit={submitAddDescription}>
                                        <textarea type='text' name='description' value={addDescription.description} onChange={handleInputChangeDescription}></textarea>
                                        <button type='submit' className="day-btns">Submit</button>
                                    </form>
                                    <button onClick={toggleShowing} className="day-btns">Cancel</button>
                                </>
                                :
                                <button onClick={toggleShowing} className="day-btns">Add Description</button>
                            }
                        </>
                        :
                        <>
                            <p>Description: {props.trip.itinerary[props.index].description}</p>
                            {/* <button>Edit Description</button> */}
                            {showing ?
                                <>
                                    <form onSubmit={submitAddDescription}>
                                        <textarea type='text' name='description' value={addDescription.description} onChange={handleInputChangeDescription}></textarea>
                                        <button type='submit' className="day-btns">Submit</button>
                                    </form>
                                    <button onClick={toggleShowing} className="day-btns">Cancel</button>
                                </>
                                :
                                <button onClick={toggleShowing} className="day-btns">Edit Description</button>
                            }
                        </>
                    }
                    <ul>Events:
                        {props.trip.itinerary[props.index].events.map((event)=>{
                            return (
                                <li><EventComponent event={event} formattedCurrentDay={formattedCurrentDay} trip={props.trip} index={props.index} toggleShowing={props.toggleShowing}></EventComponent></li>
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
                            <button onClick={toggleShowingEventForm} className="day-btns">Cancel</button>
                        </>
                        :
                        <button onClick={toggleShowingEventForm} className="day-btns">Add Event</button>
                    }
                </>
            }
        </div>
    )
}

export default DayComponent;