const express = require('express');
const router = express();
const Trip = require('../models/trip');

// Index route
router.get('/', async (req,res)=>{
    try{
        // the data we will send will come from the Schema database
        const trips = await Trip.find();
        console.log('trips');
        console.log(trips);
        // if we are able to access this route, send a good status and show the data
        res.send ({
            status: 200,
            data: trips
        });
    } catch (err) {
        // if we are unable to access this route, show a 500 error and data equal to the error that occurs
        res.send ({
            status: 500,
            data: err.message
        });
    };
});



// Create route
router.post('/', async (req, res)=>{
    try {
        // get request from body and use create method to add it to db
        const newTrip = await Trip.create(req.body.trip);
        console.log(newTrip);
        // now add the user id to this trip user Id array
        newTrip.userIds.push(req.body.userId);
        newTrip.save();
        console.log(newTrip);
        // send back JSON response
        res.send({
            status: 200,
            data: newTrip
        });
    } catch (err) {
        res.send({
            status: 500,
            data: err.message
        });
    };
});



// Show route
router.get('/:id', async (req, res)=>{
    try {
        // find the item that was clicked on with passed in trip id argument
        const trip = await Trip.findById(req.params.id);
        // Check if the item exists in the first place
        if (!trip) {
            throw new Error('No item by that id here');
        };
        res.send({
            status: 200,
            data: trip
        });
    } catch (err) {
        res.send({
            status: 500,
            data: err.message
        });
    };
});



// Update/PUT route
router.put('/:id', async (req, res)=>{

    try {
        // find the item that was clicked on
        const trip = await Trip.findById(req.params.id);

        // check what req.body sent in
        if (req.body.transportationInfo) {
            console.log('yay inside transportation info');
            console.log(req.body.transportationInfo);
            // start setting information in trip model
            trip.mainTransportation.mode = req.body.transportationInfo.mode;
            trip.mainTransportation.destination = req.body.transportationInfo.destination;
            trip.mainTransportation.when.departure.departureDate = req.body.transportationInfo.departureDate;
            trip.mainTransportation.when.departure.departureTime = req.body.transportationInfo.departureTime;
            trip.mainTransportation.when.returning.returningDate = req.body.transportationInfo.returningDate;
            trip.mainTransportation.when.returning.returningTime = req.body.transportationInfo.returningTime;
            trip.mainTransportation.cost = req.body.transportationInfo.cost;
            trip.mainTransportation.booked = req.body.transportationInfo.booked;
            trip.save();
            console.log('here is main transportation now: ');
            console.log(trip.mainTransportation);
            res.send({
                status: 200,
                data: trip
            });

        } else if (req.body.img) {
            console.log('yay inside req.body.img');
            console.log(req.body.img);
            // set the image for the trip
            trip.img = req.body.img;
            trip.save();
            console.log(trip.img);
            res.send({
                status: 200,
                data: trip
            });

        }else if (req.body.description) {
            console.log(req.body.description.description);
            // create an object to push to itinerary array
            let itineraryItem = {
                dateTime: req.body.currentDay,
                description: req.body.description.description
            };
            console.log(itineraryItem);
            // push this new object to trip
            trip.itinerary.push(itineraryItem);
            trip.save();
            console.log('this is now the current trip');
            console.log(trip);
            res.send({
                status: 200,
                data: trip
            });

        } else if (req.body.event && !req.body.eventToEdit) {
            console.log('inside req.body.event');
            console.log(req.body);
            console.log(req.body.event);
            console.log(req.body.currentDay);
            // create a new date so that we can compare with what is in the trip db
            let currentDay = new Date(req.body.currentDay);
            console.log(currentDay);
            console.log(trip.itinerary[0]);

            for (let i=0; i<trip.itinerary.length; i++) {
                console.log('beginning for loop');
                console.log(trip.itinerary[i].dateTime.getTime());
                console.log(currentDay.getTime());

                if (trip.itinerary[i].dateTime.getTime() == currentDay.getTime()) {
                    console.log('inside if');
                    // now that we have matched the day with backend day, we can push the event
                    // first we need to create an event object that we can push
                    let event = {
                        eventName: req.body.event.eventName,
                        eventTime: req.body.event.eventTime,
                        eventPrice: req.body.event.eventPrice
                    };
                    // now push to events array of that itinerary item
                    trip.itinerary[i].events.push(event);
                    trip.save();
                    console.log('this is now the new trip with the added event');
                    console.log(trip);
                    console.log(trip.itinerary[i].events);
                    res.send({
                        status: 200,
                        data: trip
                    });
                };

            };

        } else if (req.body.eventToEdit) {
            console.log(req.body.eventToEdit);
            console.log(req.body.event);
            let currentDay = new Date(req.body.currentDay);
            console.log(currentDay);

            for (let i=0; i<trip.itinerary.length; i++) {
                console.log('in for loop');
                console.log(trip.itinerary[i].dateTime.getTime());
                console.log(currentDay.getTime());

                // first we want to check if it equals the right day
                if (trip.itinerary[i].dateTime.getTime() == currentDay.getTime()) {
                    console.log('in first if');

                    // now check through each event of this itinerary item with the event id from front end
                    for (let j=0; j<trip.itinerary[i].events.length; j++) {

                        if (trip.itinerary[i].events[j]._id == req.body.eventToEdit) {
                            console.log('yay we found a matching event now let us edit it');
                            console.log(trip.itinerary[i].events[j]);
                            // now update the object
                            trip.itinerary[i].events[j].eventName = req.body.event.eventName;
                            trip.itinerary[i].events[j].eventTime = req.body.event.eventTime;
                            trip.itinerary[i].events[j].eventPrice = req.body.event.eventPrice;
                            trip.save();
                            console.log('below is the editted event');
                            console.log(trip.itinerary[i].events[j]);
                            res.send({
                                status: 200,
                                data: trip
                            });
                        };

                    };

                };

            };

        } else if (req.body.eventToDelete) {
            console.log(req.body.eventToDelete);
            let currentDay = new Date(req.body.currentDay);
            console.log(currentDay);

            for (let i=0; i<trip.itinerary.length; i++) {
                console.log('in for loop');
                console.log(trip.itinerary[i].dateTime.getTime());
                console.log(currentDay.getTime());

                // first we want to check if it equals the right day
                if (trip.itinerary[i].dateTime.getTime() == currentDay.getTime()) {
                    console.log('in first if, found right itinerary');

                    // now check through each event of this itinerary item with the event id from front end
                    for (let j=0; j<trip.itinerary[i].events.length; j++) {
                        console.log(trip.itinerary[i].events[j]._id);
                        console.log(req.body.eventToDelete);

                        if (trip.itinerary[i].events[j]._id == req.body.eventToDelete) {
                            console.log('yay we found a matching event now let us delete it');
                            console.log(trip.itinerary[i].events[j]);
                            console.log(j);
                            // now delete the object
                            trip.itinerary[i].events.splice(j, 1);
                            trip.save();
                            res.send({
                                status: 200,
                                data: trip
                            });
                        };

                    };

                };

            };

        } else if (req.body.listItem && req.body.listItemToEdit == null) {
            console.log('yay we have received a req for adding list item!');
            console.log(req.body.listItem);
            let newListItem = {
                itemName: req.body.listItem.itemName,
                itemQuantity: req.body.listItem.itemQuantity
            };
            console.log(newListItem);
            // now push to itinerary array for this trip
            trip.packingList.push(newListItem);
            trip.save();
            console.log(trip.packingList);
            res.send({
                status: 200,
                data: trip
            });

        } else if (req.body.listItemToEdit !== null && req.body.deleteItem == null) {
            console.log('yay we are inside listItemToEdit if statement');

            // first we need to find the list item in the packing list array
            for (let i=0; i<trip.packingList.length; i++) {

                if (trip.packingList[i]._id == req.body.listItemToEdit) {
                    console.log('we have a match!');
                    console.log(trip.packingList[i].itemName);
                    trip.packingList[i].itemName = req.body.listItem.itemName;
                    trip.packingList[i].itemQuantity = req.body.listItem.itemQuantity;
                    trip.save();
                    console.log('this is the new editted packingList');
                    console.log(trip.packingList);
                    res.send({
                        status: 200,
                        data: trip
                    });
                };

            };

        } else if (req.body.deleteItem) {
            console.log('delete item is true and is inside if statement');

            for (let i=0; i<trip.packingList.length; i++) {

                if (trip.packingList[i]._id == req.body.listItemToEdit) {
                    console.log('yay we found a list item that matches the one we are trying to delete!');
                    console.log('deleting this one: ');
                    console.log(trip.packingList[i]);
                    trip.packingList.splice(i, 1);
                    trip.save();
                    console.log('here is the saved trip packingList now: ');
                    console.log(trip.packingList);
                    res.send({
                        status: 200,
                        data: trip
                    });
                };

            };
            
        };
    } catch (err) {
        res.send({
            status: 500,
            data: err.message
        });
    };

});



// Delete route
router.delete('/:id', async (req, res)=>{

    try {
        // find the item that was clicked on
        const trip = await Trip.findByIdAndDelete(req.params.id);
        res.send({
            status: 200,
            data: trip
        });
    } catch (err) {
        res.send({
            status: 500,
            data: err
        });
    };

});

module.exports = router;