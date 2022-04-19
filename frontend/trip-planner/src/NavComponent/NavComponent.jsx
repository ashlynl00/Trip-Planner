import {Link, useNavigate} from 'react-router-dom';

const NavComponent = () => {
    return (
        <nav>
            <h2>Logo here</h2>
            <ul>
                <Link to='/'>
                    <li>Home</li>
                </Link>
                <Link to='/new-trip'>
                    <li>New Trip</li>
                </Link>
                <Link to='/about'>
                    <li>About</li>
                </Link>
                <Link to='/login'>
                    <li>Login</li>
                </Link>
                <Link to='/sign-up'>
                    <li>Sign Up</li>
                </Link>
                <Link to='/contact'>
                    <li>Contact</li>
                </Link>
            </ul>
        </nav>
    )
}

export default NavComponent;