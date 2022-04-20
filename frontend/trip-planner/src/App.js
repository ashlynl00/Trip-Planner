import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from "react-router-dom";
import NavComponent from './NavComponent/NavComponent';
import Login from './NavComponent/NavComponents/login';
import SignUp from './NavComponent/NavComponents/signup';
import NewTrip from './NavComponent/NavComponents/new-trip';
import Contact from './NavComponent/NavComponents/contact';
import About from './NavComponent/NavComponents/about';

function App() {
  
  return (
    <Router>
      <div className="App">
        <NavComponent></NavComponent>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/new-trip" element={<NewTrip />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
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
