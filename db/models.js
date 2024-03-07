const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
    title: { type: String, required: false },
    genre: { type: String, required: false },
    text: [{ type: String }],
});

const Story = mongoose.model('Story', StorySchema);

const ContributionSchema = new mongoose.Schema({
    user: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const Contribution = mongoose.model('Contribution', ContributionSchema);

module.exports = { Story, Contribution };