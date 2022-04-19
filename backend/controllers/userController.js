const express = require('express');
const router = express();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

//// Don't need to create routes that will be forms

// Index route
router.get('/', async (req,res)=>{
    try{
        // the data we will send will come from the Schema database
        const users = await User.find();
        // if we are able to access this route, send a good status and show the data
        res.send ({
            status: 200,
            data: users
        })
    } catch (err) {
        // if we are unable to access this route, show a 500 error and data equal to the error that occurs
        res.send ({
            status: 500,
            data: err.message
        });
    };
});

// login route
router.post("/login", async (req, res)=>{
    try{
        // Grab the user from the database with the username from the form
        // res.send ({
        //     status: 500,
        //     data: 'before possible user'
        // });
        const possibleUser = await User.findOne({username: req.body.username})
        if(possibleUser){
            // There is a user with this username!
            // Compare the password from the form with the database password
            if(bcrypt.compareSync(req.body.password, possibleUser.password)){
                console.log('inside if statement that passwords did match');
                // It's a match! Successful login!
                //respond to front end here
                res.send ({
                    status: 200,
                    data: possibleUser
                });
            }else{
                console.log('in else that passwords did not match');
                res.send ({
                    status: 200,
                    data: 'did not match'
                });
            }
        }else{
            res.send ({
                status: 200,
                data: 'not a possible user'
            });
        };
    }catch(err){
        res.send ({
            status: 500,
            data: err
        });
    }
})

// Create route
router.post('/', async (req, res)=>{
    try {
        console.log(req.body.username)
        const findSameUser = await User.findOne({username: req.body.username});
        const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        console.log(hashedPassword);
        req.body.password = hashedPassword;
        // get request from body and use create method to add it to db
        const newUser = await User.create(req.body);
        console.log('below is the results of finding same user')
        console.log(findSameUser);
        if (findSameUser == null) {
            console.log('did not find same username')
            console.log(newUser);
            // send back JSON response
            res.send({
                status: 200,
                data: newUser
            });
        } else {
            console.log('oops, found same username')
            // send back JSON response
            res.send({
                status: 200,
                data: 'this username already exists'
            });
        }
    } catch (err) {
        console.log('in catch')
        res.send({
            status: 500,
            data: 'duplicate usernames'
        });
    };
});

// Show route
router.get('/:id', async (req, res)=>{
    try {
        console.log('in get route');
        // find the item that was clicked on
        const user = await User.findById(req.params.id);
        // Check if the item exists in the first place
        if (!user) {
            throw new Error('No item by that id here');
        };
        res.send({
            status: 200,
            data: user
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
        console.log(req.body);
         const user = await User.findById(req.params.id);
         if (req.body.neighborhood) {
             user.neighborhood.push(req.body.neighborhood);
             console.log('inside join neighborhood')
         } else if (req.body.neighborhoodIdToRemove) {
             let index = user.neighborhood.indexOf(req.body.neighborhoodIdToRemove);
             user.neighborhood.splice(index, 1);
             console.log('inside unjoin')
         }
         user.save();
        console.log(user);
        res.send({
            status: 200,
            data: user
        });
    } catch (err) {
        console.log(err);
        res.send({
            status: 500,
            data: err.message
        });
    };
    // try {
    //     // find the item that was clicked on
    //     console.log('in put route')
    //     const user = await User.findById(req.params.id);
    //     console.log(user);
    //     //user.neighborhood.push(req.body);
    //     // saves user after modification
    //     user.save();
    //     res.send({
    //         status: 200,
    //         data: user
    //     });
    // } catch (err) {
    //     console.log(err);
    //     res.send({
    //         status: 500,
    //         data: err.message
    //     });
    // };
});

// Delete route
router.delete('/:id', async (req, res)=>{
    try {
        // find the item that was clicked on
        const user = await User.findByIdAndDelete(req.params.id);
        res.send({
            status: 200,
            data: user
        });
    } catch (err) {
        res.send({
            status: 500,
            data: err
        });
    };
});

module.exports = router;