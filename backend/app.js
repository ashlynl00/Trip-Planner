// import all of the dependencies
require('dotenv').config();
const {urlencoded} = require('express');
const express = require('express');
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const User = require('./models/user');
const app = express();
const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: "mySessions",
});
const tripController = require('./controllers/tripController');
const userController = require('./controllers/userController');



const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}


// Configuration
const db = mongoose.connection;



// Connect to Mongo
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
console.log(process.env.MONGO_URI);



// Connection Error/Success
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", process.env.MONGO_URI));
db.on("disconnected", () => console.log("mongo disconnected"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('short'));
app.use(cors(corsOptions));


// preroute
app.use('/trips', tripController);
app.use('/users', userController);



const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log('app is running');
});