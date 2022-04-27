const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema ({
    tripName: {type: String, required: true},
    dateStart: {type: Date, required: true},
    dateEnd: {type: Date, required:true},
    userIds: [{type: String}],
    destinations: [{type:String, required: true}],
    people: [{type: String}],
    mainTransportation: {
        when: {type: Date},
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
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;