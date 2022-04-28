// import tools
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import apiconfig for api url
import apiUrl from "../../../../apiConfig";

// import components
import EditListItem from "./EditListItem";



const PackingListComponent = (props) => {
    const navigate = useNavigate();
    // set up state to store whether or not an element is being displayed or not
    const [showing, setShowing] = useState(false);
    const toggleShowing = () => {
        setShowing(!showing);
    };

    // store listItem in state
    const [listItem, setListItem] = useState({
        itemName: '',
        itemQuantity: ''
    });

    // set list item state based off of changes in input fields
    const handleInputChange = (e) => {
        setListItem({
            ...listItem,
            [e.target.name]: e.target.value
        })
    };

    // send api request with list item info
    const sendListItem = async (listItem, tripToEdit, listItemToEdit=null, deleteItem=null) => {

        const apiResponse = await fetch(`${apiUrl}/trips/${tripToEdit}`, {
            method: "PUT",
            body: JSON.stringify({listItem: listItem, listItemToEdit: listItemToEdit, deleteItem: deleteItem}),
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

    // handle list item submission
    const submitListItem = (e) => {
        e.preventDefault();
        sendListItem(listItem, props.trip._id);
        setListItem({
            itemName: '',
            itemQuantity: ''
        });
        toggleShowing();
    };
    
    return (
        <>
            <h3>Packing List: </h3>
            {props.trip.packingList.length > 0 ?
                <>
                    <ul>
                        {props.trip.packingList.map((listItem)=>{
                            return (
                                <li>{listItem.itemName} Quantity: {listItem.itemQuantity} 
                                    <EditListItem sendListItem={sendListItem} trip={props.trip} listItem={listItem}></EditListItem>
                                </li>
                            )
                        })}
                    </ul>
                    {showing ?
                        <>
                            <form onSubmit={submitListItem}>
                                Item Name : <input type='text' name='itemName' value={listItem.itemName} onChange={handleInputChange}></input>
                                Quantity: <input type='number' name='itemQuantity' value={listItem.itemQuantity} onChange={handleInputChange}></input>
                                <button type="submit">Submit</button>
                            </form>
                            <button onClick={toggleShowing}>Cancel</button>
                        </>
                        :
                        <button onClick={toggleShowing}>Add to Packing List</button>
                    }
                </>
                :
                showing ?
                    <>
                        <form onSubmit={submitListItem}>
                            Item Name : <input type='text' name='itemName' value={listItem.itemName} onChange={handleInputChange}></input>
                            Quantity: <input type='number' name='itemQuantity' value={listItem.itemQuantity} onChange={handleInputChange}></input>
                            <button type="submit">Submit</button>
                        </form>
                        <button onClick={toggleShowing}>Cancel</button>
                    </>
                    :
                    <button onClick={toggleShowing}>Add to Packing List</button>
                
            }
        </>
    )
}

export default PackingListComponent;