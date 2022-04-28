const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema ({
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