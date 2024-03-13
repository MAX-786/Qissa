const { Event, Story, User } = require('../models/index');

async function createStory(title, genre, username, id) {
    const user = await User.findOne({ id: id });
    // console.log(user.username);
    const newUser = user?.username ? user : new User({ username,id }); 
    const event0 = new Event({ user: newUser._id, text: "Event Zero" });
    const newStory = new Story({ user: newUser._id, title: title.toLowerCase(), genre, head: event0._id, timelines: [event0._id] });
    await newStory.save();
    await event0.save();
    newUser.prevTask = { _type: 'creation', eventId: event0._id, storyId: newStory._id, timeline: 0 };
    await newUser.save();

}

module.exports = { createStory };