// import tools
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import apiconfig for api url
import apiUrl from "../../apiConfig";



const Login = (props) => {
    // create state for user
    const [currentUser, setCurrentUser] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate();

    // change user state everytime input fields change
    const handleInputChange = (e) => {
        setCurrentUser({
            ...currentUser,
            [e.target.name]: e.target.value
        })
        console.log(currentUser);
    };

    // send a request to backend to run through db and make sure user exists and info is correct
    const checkAccounts = async (userLogin) => {
        const apiResponse = await fetch(`${apiUrl}/users/login`, {
            method: "POST",
            body: JSON.stringify(userLogin),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const parsedResponse = await apiResponse.json();

        if (parsedResponse.status == 200) {

            if (parsedResponse.data == 'not a possible user') {
                console.log('in if not a possible user');
                alert('Sorry, the username login info you provided is not correct. If you would like to create an account, please click the Create New Account button below.');
                navigate('/sign-up');
            } else if (parsedResponse.data == 'did not match') {
                console.log('in else if that password data from api did not match');
                alert('Sorry, but the password you provided is not correct, please retry or create a new account.');
                navigate('/users');
            } else {
                console.log('in else that is a possible user');
                setCurrentUser({
                    ...currentUser,
                    username: parsedResponse.data.username,
                    password: parsedResponse.data.password
                });
                localStorage.setItem('currentUser', JSON.stringify(parsedResponse.data));
                console.log(localStorage.getItem('currentUser'));
                console.log(currentUser);
                navigate('/');
            };

        } else {
            console.log('in else');
            console.log(parsedResponse.data);
        };

    };

    // send api request user information 
    const submitUserLogin = (e) => {
        e.preventDefault();
        checkAccounts(currentUser);
        setCurrentUser({
            username: '',
            password: ''
        });
    };
    
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={submitUserLogin}>
                <label for='username'>Username: </label>
                <input type='text' name='username' placeholder="username" value={currentUser.username} onChange={handleInputChange}></input>
                <label for='password'>Password: </label>
                <input type='text' name='password' placeholder="password" value={currentUser.password} onChange={handleInputChange}></input>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Login;