# Trip-Planner
Plan all your trips with Trip Planner! Be able to create a packing list, to do list in each city, and invite people that are also taking the trip with you! No more worries, every detail regarding your trip will be handled with Trip Planner!

## Access the Deployed Site
Front-End:
https://triplann.herokuapp.com/
Back-End:
https://triplann-backend.herokuapp.com/trips

## Tech Stack
MERN

## MVP:
- A working full-stack app with functional frontend and backend
- Two models: User and Trips
- Be deployed to heroku

## User Stories
When the user first accesses the site, they are directed to the home page where it invites them to create an account. If the user clicks on new trips, they are directed to create a new account if they are not logged in. Once they create an account, they can log in. If at any point they enter the wrong credentials, there is an alert that tells them they have entered in the wrong credentials. Once the user is logged in, they can see all the trips they have created, or have been added to. If the user has not created any trips, then it will show that they have not created any. Now when the user clicks on "new trip" in the navigation, they are able to create a new trip. Once they fill out the desired input fields, they should see that new trip on their trips page. They can continue to edit this trip's details by hovering over and clicking on the trip. On this new page, the user can navigate back or continue to make edits and see the details of their trip. They are able to upload a photo to the trip, add items to their itinerary and packing list, add other people who have an account to the trip, and transportation info. They can always edit any data that they have put into the trip details. The user can also contact the development team about any isssues they encounter by clicking on the contact form and sending a message.

## Stretch Goals
- Style the site
- Give a responsive design
- Allow the user to be able to add people who don't have an account onto their trip

### Trip Model
tripName: {type: String, required: true},
dateStart: {type: Date, required: true},
dateEnd: {type: Date, required:true},
userIds: [{type: String}],
destinations: [{type:String, required: true}],
mainTransportation: {
    mode: {type: String},
    destination: {type: String},
    when: {
        departure: {
           departureDate: {type: Date},
           departureTime: {type: String}
        },
        returning: {
            returningDate: {type: Date},
            returningTime: {type: String}
        }
    },
    cost: {type: Number},
    booked: {type: Boolean}
},
packingList: [
    {
        itemName: {type: String},
        itemQuantity: {type: Number}
    }
],
itinerary: [
    {
        dateTime: {type: Date},
        day: {type: Number},
        description: {type: String},
        events: [
            {
                eventName: {type: String},
                eventTime: {type: String},
                eventPrice: {type: Number}
            }
        ]
    },
],
img: {type: String, require: false}
  
  ## User Model
  username: String,
  password: String
