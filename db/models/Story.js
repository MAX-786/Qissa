const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
    user: { // Author
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    head: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    genre: [{ type: String }],
    timelines: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}], // Array of head events for each timeline
});

const Story = mongoose.model('Story', StorySchema);

module.exports = { Story };