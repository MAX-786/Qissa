const { Story, Event } = require('../models');

async function createBranch(storyId, fromCommitId) {
    const story = await Story.findById(storyId);
    if (!story) {
        throw new Error('Story not found');
    }
    const fromCommit = await Event.findById(fromCommitId);
    if (!fromCommit) {
        throw new Error('Commit not found');
    }
    const newBranch = new Event({ parent: fromCommit._id, text: 'Branch point' });
    await newBranch.save();
    story.branches.push(newBranch._id);
    await story.save();
    return newBranch;
}

module.exports = { createBranch };