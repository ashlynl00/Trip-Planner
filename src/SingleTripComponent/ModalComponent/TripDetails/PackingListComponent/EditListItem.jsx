// import tools
import { useState } from "react";



const EditListItem = (props) => {
    // store whether or not an element is shown on page in state
    const [showEditForm, setShowEditForm] = useState(false);
    const toggleShowEditForm = () => {
        setShowEditForm(!showEditForm);
    };

    // store current list item
    const [listItem, setListItem] = useState({
        itemName: '',
        itemQuantity: ''
    });

    // handle input change in list item state
    const handleInputChange = (e) => {
        setListItem({
            ...listItem,
            [e.target.name]: e.target.value
        })
    };

    // send list item to api request function and reset input fields and state for list item
    const submitEdittedItem = (e) => {
        e.preventDefault();
        props.sendListItem(listItem, props.trip._id, props.listItem._id);
        setListItem({
            itemName: '',
            itemQuantity: ''
        });
        toggleShowEditForm();
        window.location.reload();
    };

    // send delete argument to api request to fulfill
    const deleteItem = (e) => {
        e.preventDefault();
        let listItemArg = null;
        let deleteItem = true;
        props.sendListItem(listItemArg, props.trip._id, props.listItem._id, deleteItem);
        window.location.reload();
    };

    return (
        <>
            {showEditForm ?
                <>
                    <form onSubmit={submitEdittedItem}>
                        Item Name : <input type='text' name='itemName' value={listItem.itemName} onChange={handleInputChange}></input>
                        Quantity: <input type='number' name='itemQuantity' value={listItem.itemQuantity} onChange={handleInputChange}></input>
                        <button type="submit" className="misc-btn">Submit</button>
                    </form>
                    <button onClick={toggleShowEditForm} className="misc-btn">Cancel</button>
                </>
                :
                <button onClick={toggleShowEditForm} className="misc-btn">Edit</button> 
            }
            <button onClick={deleteItem} className="misc-btn">Delete</button>
        </>
    )
}

export default EditListItem;