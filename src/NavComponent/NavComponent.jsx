// import tools
import {Link, useNavigate} from 'react-router-dom';

// import apiconfig for api url
import apiUrl from '../apiConfig';

// import img
import logo from '../NavComponent/tp-logo.png';



const NavComponent = (props) => {
    const navigate = useNavigate();

    // logout function to remove current user from localstorage
    const logout = () => {
        localStorage.removeItem('currentUser');
        console.log(localStorage.getItem('currentUser'));
        navigate('/login');
    };
    // const getTrips = async () => {
    //     console.log('inside gettrips')
    //     const apiResponse = await  fetch(`${apiUrl}/trips`);
    //     const parsedResponse = await apiResponse.json();
    //     if (parsedResponse.status == 200) {
    //     props.setTrips(parsedResponse.data)
    //     console.log(props.trips);
    //     } else {
    //     console.log('status was 500, did not get trips')
    //     }
    //     navigate('/trips')
    // }

    return (
        <nav>
            <img src={logo}></img>
            <ul>
                <Link to='/'>
                    <li>Home</li>
                </Link>
                {localStorage.getItem('currentUser')==null ?
                    <>
                        <Link to='/login'>
                            <li>Login</li>
                        </Link>
                        <Link to='/sign-up'>
                            <li>Sign Up</li>
                        </Link>
                        <Link to='/sign-up'>
                            <li>New Trip</li>
                        </Link>
                    </>
                    :
                    <>
                    <Link to='/new-trip'>
                        <li>New Trip</li>
                    </Link>
                    <Link to='user-account'>
                        <li>Account</li>
                    </Link>
                    <a><li onClick={logout} id='logout-nav'>Logout</li></a>
                    {/* <Link to='/trips'>
                        <li onClick={(e)=>{
                            e.preventDefault();
                            getTrips();
                            navigate('/trips');
                        }}>Trips</li>
                    </Link> */}
                    <Link to='/trips'>
                        <li>Trips</li>
                    </Link>
                    </>
                }
            </ul>
        </nav>
    )
}

export default NavComponent;