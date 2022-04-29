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
