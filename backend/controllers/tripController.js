const express = require('express');
const router = express();
const Trip = require('../models/trip');

//// Don't need to create routes that will be forms

// Index route
router.get('/', async (req,res)=>{
    try{
        // the data we will send will come from the Schema database
        const trips = await Trip.find();
        // if we are able to access this route, send a good status and show the data
        res.send ({
            status: 200,
            data: trips
        })
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
        // find the item that was clicked on
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
        // const neighborhood = await Neighborhood.findByIdAndUpdate(req.params.id, req.body, {new: true});
        const trip = await Trip.findById(req.params.id);
        if (req.body.events) {
            console.log('inside if');
            console.log(req.body.events);
            trip.events.push(req.body.events);
            console.log(trip.events);
            trip.save();
            res.send({
                status: 200,
                data: trip
            });
        } else {
            const entireTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, {new: true});
            entireTrip.save();
            res.send({
                status: 200,
                data: entireTrip
            });
        }
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