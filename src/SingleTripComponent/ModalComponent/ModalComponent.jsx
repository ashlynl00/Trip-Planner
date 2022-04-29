// import apiconfig for api url
import apiUrl from "../../apiConfig";

//import tools
import { useState } from "react";

//import components
import DayComponent from "./TripDetails/DayComponent";
import PackingListComponent from "./TripDetails/PackingListComponent/PackingListComponent";
import PeopleComponent from "./TripDetails/PeopleComponent";
import Transportation from "./TripDetails/Transportation";
import { useNavigate } from "react-router-dom";



const ModalComponent = (props) => {
    const navigate = useNavigate();
    // set up showing state for when to show form 
    const [showing, setShowing] = useState(false);
    const toggleShowing = () => {
        setShowing(!showing);
    };
    const [image, setImage] = useState('');

    // send image info from cloudinary to db
    const sendImg = async (tripToEdit, img) => {
        const apiResponse = await fetch(`${apiUrl}/trips/${tripToEdit}`, {
            method: "PUT",
            body: JSON.stringify({img: img}),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const parsedResponse = await apiResponse.json();

        if (parsedResponse.status == 200) {
            console.log('yay it worked!');
        } else {
            console.log('sad days');
        };

    };

    const handleImgSubmit = async (e) => {
        e.preventDefault();
        // create a new form in order to send image data correctly to cloudinary
        const formData = new FormData();
        console.log("image prop", image)
        formData.append('file', image)
        formData.append('upload_preset', 'g88dstkq')

        // send image info to cloudinary api, so the linked response is saved to send to db
        const imageUpload = await fetch('https://api.cloudinary.com/v1_1/dcbh0v5ds/image/upload', {
            method: "POST",
            body: formData
        })

        const parsedImg = await imageUpload.json()
        let imgLink = await parsedImg.url

        // now we are going to send this to the backend
        sendImg(props.trip._id, imgLink);
        setImage('');
        toggleShowing();
        navigate('/trips');
        window.location.reload();
    };


    const getDifferenceInDays = (date1, date2) => {
        const diffInMs = Math.abs(date2 - date1);
        return diffInMs / (1000 * 60 * 60 * 24);
    };

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
            { props.trip.img == null ?
                    <>
                        {showing ?
                            <>
                                <form onSubmit={handleImgSubmit}>
                                    <input onChange ={ (e)=>setImage(e.target.files[0])} type="file" name="img" accept="image/png, image/jpeg" placeholder='upload image'></input>
                                    <button type="submit">Submit</button>
                                </form>
                                <button onClick={toggleShowing}>Cancel</button>
                            </>
                            :
                            <button onClick={toggleShowing}>Upload Image</button>
                        }
                    </>
                :
                    <>
                        <img src={props.trip.img}></img>
                        {showing ?
                            <>
                                <form onSubmit={handleImgSubmit}>
                                    <input onChange ={ (e)=>setImage(e.target.files[0])} type="file" name="img" accept="image/png, image/jpeg" placeholder='upload image'></input>
                                    <button type="submit">Submit</button>
                                </form>
                                <button onClick={toggleShowing}>Cancel</button>
                            </>
                            :
                            <button onClick={toggleShowing}>Edit Image</button>
                        }
                    </>
                }
            <h4>Itinerary: </h4>
            <div className="day-container">
                {[...Array(totalDays)].map((elementInArray, index)=>{
                    return (
                        <div className="day-component">
                            <p className="day-component">Day {index+1}: </p>
                            <DayComponent index={index} trip={props.trip} tripStart={props.tripStart} toggleShowing={props.toggleShowing}></DayComponent>
                        </div>
                    )   
                })}
            </div>
            <Transportation trip={props.trip} toggleShowing={props.toggleShowing}></Transportation>
            <PackingListComponent trip={props.trip} toggleShowing={props.toggleShowing}></PackingListComponent>
            <PeopleComponent trip={props.trip} users={props.users} toggleShowing={props.toggleShowing}></PeopleComponent>
            <br></br><br></br>
            <button onClick={props.toggleShowing}>Back</button>
        </div>
    )
}

export default ModalComponent;