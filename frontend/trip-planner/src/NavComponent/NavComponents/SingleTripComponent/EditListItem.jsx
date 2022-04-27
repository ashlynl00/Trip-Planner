import { useState } from "react";

const EditListItem = (props) => {
    const [showEditForm, setShowEditForm] = useState(false);
    const toggleShowEditForm = () => {
        setShowEditForm(!showEditForm);
    };
    const [listItem, setListItem] = useState({
        itemName: '',
        itemQuantity: ''
    });
    const handleInputChange = (e) => {
        setListItem({
            ...listItem,
            [e.target.name]: e.target.value
        })
    };
    const submitEdittedItem = (e) => {
        e.preventDefault();
        props.sendListItem(listItem, props.trip._id, props.listItem._id);
        setListItem({
            itemName: '',
            itemQuantity: ''
        });
        toggleShowEditForm();
    };
    const deleteItem = (e) => {
        e.preventDefault();
        let listItemArg = null;
        let deleteItem = true;
        props.sendListItem(listItemArg, props.trip._id, props.listItem._id, deleteItem);
    }
    return (
        <>
            {showEditForm ?
                <form onSubmit={submitEdittedItem}>
                    Item Name : <input type='text' name='itemName' value={listItem.itemName} onChange={handleInputChange}></input>
                    Quantity: <input type='number' name='itemQuantity' value={listItem.itemQuantity} onChange={handleInputChange}></input>
                    <button type="submit">Submit</button>
                </form>
                :
                <button onClick={toggleShowEditForm}>Edit</button> 
            }
            <button onClick={deleteItem}>Delete</button>
        </>
    )
}

export default EditListItem;