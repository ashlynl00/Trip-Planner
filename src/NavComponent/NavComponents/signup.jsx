// import tools
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import apiconfig for api url
import apiUrl from "../../apiConfig";



const SignUp = (props) => {
    const [isValidState, setIsValidState] = useState ({valid: true, message: ""});
    const navigate = useNavigate();
    const [newUserServerError, setNewUserServerError] = useState("");
    const [newUser, setNewUser] = useState({
        username: '',
        password: ''
    })

    // handle input change by update user state
    const handleInputChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
        console.log(newUser);
    };

    // send user state to backend db to create user
    const createNewUser = async (newUser) => {
        console.log(newUser);
        console.log('let us create this');

        // send a request to the backend
        const apiResponse = await fetch(`${apiUrl}/users`, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json"
            }
        });

        // parse the response
        const parsedResponse = await apiResponse.json();

        // if response is success: 
        if (parsedResponse.status == 200) {

            if (parsedResponse.data == 'this username already exists') {
                console.log('username already exists, in if');
                alert('This username already exists! Please create a unique username.');
                navigate('/sign-up');
            } else {
                console.log('username does not exist and in else')
                // add the new item to state
                props.setUsers([parsedResponse.data, ...props.users]);
                console.log(props.users);
                navigate('/login');
            };

        } else {
            //else:
            // show the error message in the form, don't change it back
            console.log('in catch err');

            if (parsedResponse.data == 'duplicate usernames') {
                console.log('username already exists, in if');
                alert('This username already exists! Please create a unique username.');
                //navigate('/users');
                //setShowing(true);
            } else {
                console.log(parsedResponse.data);
                setNewUserServerError(parsedResponse.data);
            };
        };

    };

    // send api request user info and reset state
    const submitNewUser = async (e) => {
        e.preventDefault();
        let validSubmission = true;

        // check if input is valid
        if (newUser.username.length < 3) {
            setIsValidState({
                valid: false,
                message: "Username needs to be longer"
            });
            validSubmission = false;
        };

        if (validSubmission) {
            // call new item function and pass in the newItem state as the parameter
            createNewUser(newUser);
            // when we hit submit, we also want to reset values of input fields and set default value to equal these
            setNewUser({
                username: "",
                password: ""
            });
            setIsValidState({
                valid: true,
                message: ""
            });
        }; 
    };
    
    return (
        <div id="signup-page-wrapper">
            <div id="signup-page">
                <h1>Sign Up</h1>
                <form onSubmit={submitNewUser}>
                    <div className="input-field">
                        <label for='username'>Username: </label>
                        <input type='text' name='username' placeholder="username" value={newUser.username} onChange={handleInputChange}></input>
                    </div>
                    <div className="input-field">
                        <label for='password'>Password: </label>
                        <input type='password' name='password' placeholder="password" value={newUser.password} onChange={handleInputChange}></input>
                    </div>
                    <button type='submit' className="submit-btn">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;