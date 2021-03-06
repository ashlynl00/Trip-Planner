// import tools
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import apiconfig for api url
import apiUrl from "../../apiConfig";



const UserAccount = () => {
    const navigate = useNavigate();
    // parse local storage user so it can be used
    let parsedUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(parsedUser);
    console.log(parsedUser.username);

    // set up state to store whether or not an element is being displayed or not
    const [showing, setShowing] = useState(false);
    const toggleShowing = () => {
        setShowing(!showing);
    };

    // set up state to store use we want to edit
    const [editUser, setEditUser] = useState({
        username: ''
    });

    // update edit user state everytime input is updated
    const handleInputChange = (e) => {
        setEditUser({
            ...editUser,
            [e.target.name]: e.target.value
        })
        console.log(editUser);
    };

    // send request to backend to update user
    const getEditUser = async (userIdToEdit, userUsername) => {

        const apiResponse = await fetch(`${apiUrl}/users/${userIdToEdit}`, {
            method: "PUT",
            body: JSON.stringify(userUsername),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const parsedResponse = await apiResponse.json();

        if (parsedResponse.status == 200 && parsedResponse.data != 'this username is already taken') {
            console.log('yay status 200');
            localStorage.removeItem('currentUser');
            localStorage.setItem('currentUser', JSON.stringify(parsedResponse.data));
            console.log(localStorage.getItem('currentUser'));
            // update h1 displaying name by refreshing page
            window.location.reload();
        } else {
            console.log('ohr nor');
            alert('This username is already taken!')
        };

    };

    // send user state to api request function and reset state
    const submitEditUsername = (e) => {
        e.preventDefault();

        if (editUser.username.length > 2) {
            // pass it as a parameter to the fetch function
            getEditUser(parsedUser._id,editUser);
            // reset form
            setEditUser({
                username: ''
            });
            // don't show the edit form now
            toggleShowing();
        } else {
            alert('Your username needs to be longer.');
            navigate('/user-account');
        };

    };

    // send user account to delete to db
    const deleteAccount = async (idToDelete) => {

        const apiResponse = await fetch(`${apiUrl}/users/${idToDelete}`, {
            method: "DELETE"
        });

        const parsedResponse = await apiResponse.json();

        if (parsedResponse.status == 200) {
            console.log('yay delete was successful');
            // remove current user
            localStorage.removeItem('currentUser');
            // navigate to home
            navigate('/');
        } else {
            console.log('ohr nor twas not successful');
        };

    };
    
    return (
        <div id="account-component">
            <h1>Your Account</h1>
            <h1>Hello <span id="account-user">{parsedUser.username}</span></h1>
            { showing ?
                <form onSubmit={submitEditUsername}>
                    Edit Username: <input type='text' name='username' onChange={handleInputChange} value={editUser.username}></input>
                    <button type="submit">Submit</button>
                </form>
                :
                <button onClick={toggleShowing}>Edit Account</button>
            }
            <button onClick={ ()=>{deleteAccount(parsedUser._id)}}>Delete Account</button>
        </div>
    )
}

export default UserAccount;