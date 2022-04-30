// impor tools
import {Link, useNavigate} from 'react-router-dom';

// import pictures
import copyright from './copyright-logo.png';



const FooterComponent = () => {
    return (
        <div id="footer">
            <div id="footer-links">
                <h5>Trip Planner</h5>
                <ul>
                    <Link to='/about'>
                            <li>About</li>
                        </Link>
                    <Link to='/contact'>
                            <li>Contact</li>
                    </Link>
                </ul>
            </div>
            <div id="copyrights">
                <p>Copyright 2022 <img src={copyright}></img> Trip Planner</p>
            </div>
        </div>
    )
}

export default FooterComponent;