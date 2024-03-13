const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    user: { // Author
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    }],
    timeline: { type: Number }
});

const Event = mongoose.model('Event', EventSchema);

module.exports = { Event };