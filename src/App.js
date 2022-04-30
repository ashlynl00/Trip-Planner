import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from "react-router-dom";
import { useState } from 'react';
import NavComponent from './NavComponent/NavComponent';
import Login from './NavComponent/NavComponents/login';
import SignUp from './NavComponent/NavComponents/signup';
// import apiconfig
import apiUrl from './apiConfig';

//import components
import NewTrip from './NavComponent/NavComponents/new-trip';
import Contact from './FooterComponent/contact';
import About from './FooterComponent/about';
import FooterComponent from './FooterComponent/FooterComponent';
import UserAccount from './NavComponent/NavComponents/userAccount';
import Trips from './NavComponent/NavComponents/trips';



function App() {
  // set up state for both models
  const [users, setUsers] = useState([]);
  const [trips, setTrips] = useState([]);
  const getUsers = async () => {
    try {
      const users = await fetch(`${apiUrl}/users`);
      const parsedUsers = await users.json();
      setUsers(parsedUsers.data);
    } catch (err) {
        console.log(err);
    }
  } 
  return (
    <Router>
      <div className="App">
        <NavComponent trips={trips} setTrips={setTrips}></NavComponent>
        <FooterComponent></FooterComponent>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/new-trip" element={<NewTrip trips={trips} setTrips={setTrips} />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/sign-up" element={<SignUp users={users} setUsers={setUsers} />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path='/user-account' element={<UserAccount />}></Route>
          <Route path='/trips' element={<Trips trips={trips} setTrips={setTrips} users={users} />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => {
  return (
    <div id='home'>
      <div id="home-content">
        <p>WELCOME TO</p>
        <h1>Trip Planner</h1>
        <p id="home-description">Plan all your trips with Trip Planner! Be able to create a packing list, to do list in each city, and invite people that are also taking the trip with you! No more worries, every detail regarding your trip will be handled with Trip Planner!</p>
        {localStorage.getItem('currentUser')==null ?
          <Link to='/sign-up'>
            <button id="home-btn-trips">Sign Up</button>
          </Link>
          :
          <Link to='/trips'>
            <button id="home-btn-trips">Your Trips</button>
          </Link>
        }
      </div>
    </div>
  )
}

export default App;
