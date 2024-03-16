const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    id: { type: String, required: true },
    prevTask: {
        _type: { type: String },
        storyId: { type: mongoose.Schema.Types.ObjectId },
        eventId: { type: mongoose.Schema.Types.ObjectId },
        timeline: { type: Number },
    },

});

const User = mongoose.model('User', UserSchema);

module.exports = { User };