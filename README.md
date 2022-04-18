# Trip-Planner
Plan all your trips with Trip Planner! Be able to create a packing list, to do list in each city, and invite people that are also taking the trip with you! No more worries, every detail regarding your trip will be handled with Trip Planner!

## Tech Stack
MERN

## MVP:
- A working full-stack app with functional frontend and backend
- Two models: User and Trips
- Be deployed to heroku

### Trip Model
tripName: String,
dates: Date,
people: [String],
mainTransportation: {
  type: String,
  when: Date,
  cost: Integer,
  booked: Boolean
},
packingList: [String],
itinerary: [
  {
  day: Date,
  events: [
    {
    eventname: String,
    eventTime: Date,
    eventPrice: Integer
    }
  ]
  
  ## User Model
  username: String,
  password: String,
  trips: []
