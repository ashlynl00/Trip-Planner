import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from "react-router-dom";
import { useState } from 'react';
import NavComponent from './NavComponent/NavComponent';
import Login from './NavComponent/NavComponents/login';
import SignUp from './NavComponent/NavComponents/signup';
import NewTrip from './NavComponent/NavComponents/new-trip';
import Contact from './FooterComponent/contact';
import About from './FooterComponent/about';
import apiUrl from './apiConfig';
import FooterComponent from './FooterComponent/FooterComponent';
import UserAccount from './NavComponent/NavComponents/userAccount';
import Trips from './NavComponent/NavComponents/trips';

function App() {
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
          <Route path='/trips' element={<Trips trips={trips} setTrips={setTrips} />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => {
  return (
    <div id='home'>
      <div id="home-content">
        <h1>Plan your next trip</h1>
        <Link to='/sign-up'>
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  )
}

export default App;
