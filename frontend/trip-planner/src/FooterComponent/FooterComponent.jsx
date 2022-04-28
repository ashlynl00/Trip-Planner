// impor tools
import {Link, useNavigate} from 'react-router-dom';



const FooterComponent = () => {
    return (
        <ul id="footer">
            <Link to='/about'>
                    <li>About</li>
                </Link>
            <Link to='/contact'>
                    <li>Contact</li>
            </Link>
        </ul>
    )
}

export default FooterComponent;