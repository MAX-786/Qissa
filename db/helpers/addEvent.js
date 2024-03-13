const { Story, Event, User } = require('../models/index.js');

async function addEvent(story, text, id,timeline, newTimeline) {
    // const story = await Story.findById(storyId);

    // if (!story) {
    //     throw new Error('Story not found');
    // }
    const user = await User.findOne({ id: id });
    if (!user?.username) {
        // user = new User({ username: username });
        console.log(user);
        throw new Error('User not found');
    }
    if (newTimeline){
        if ( timeline < 0 || timeline >= story.timelines.length) {
            throw new Error(`timeline ${timeline} doesn\'t exist in the story.`);
        }
        const newEvent = new Event({ text, user: user._id, parent: story.timelines[timeline], children: [], timeline: story.timelines.length });
        const parentEvent = await Event.findOne({_id: story.timelines[timeline]});
        parentEvent.children.push(newEvent._id);
        story.timelines.push(newEvent._id);
        await newEvent.save();
        user.prevTask = { _type: 'contribution', eventId: newEvent._id, storyId: story._id, timeline: story.timelines.length - 1 };
    }
    else if (user.prevTask.timeline === timeline) {
        const newEvent = new Event({ text, user: user._id, parent: user.prevTask.eventId, children: [], timeline: user.prevTask.timeline});
        const parentEvent = await Event.findOne({_id: user.prevTask.eventId});
        parentEvent.children.push(newEvent._id);
        await newEvent.save();
        await parentEvent.save();
        user.prevTask = { _type: 'contribution', eventId: newEvent._id, storyId: story._id };
    } else {
        // Find the head of the timeline and add the new event to the end of the timeline.
        if ( timeline < 0 || timeline >= story.timelines.length) {
            throw new Error(`timeline ${timeline} doesn\'t exist in the story.`);
        }
        const headId = story.timelines[timeline];
        const head = await Event.findById(headId);
        if (!head) {
            throw new Error('Head event not found');
        }
        const newEvent = new Event({ text, user: user._id, parent: head._id, children: [], timeline: timeline });
        head.children.push(newEvent._id);
        await head.save();
        story.timelines[timeline] = newEvent._id;
        await newEvent.save();
        user.prevTask = { _type: 'contribution', eventId: newEvent._id, storyId: story._id };
    }

    await story.save();
    await user.save();

}

module.exports = { addEvent };