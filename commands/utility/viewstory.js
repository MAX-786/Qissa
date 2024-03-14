const { SlashCommandBuilder } = require('discord.js');
const { Story, Event} = require('../../db/models/index');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('viewstory')
        .setDescription('View an existing collaborative story.')
        .addStringOption(option =>
            option.setName('title')
            .setDescription('The title of the story to view.')
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('timeline')
            .setDescription('The timeline to view. Default is the main Timeline 0.')
            .setRequired(false)
        ),
    async execute(interaction) {
        const title = interaction.options.getString('title');
        const timeline = interaction.options.getInteger('timeline') || 0;
        const options = { title: { $regex: new RegExp(title, 'i') } };
        const story = await Story.findOne(options);
        if (!story) {
            await interaction.reply(`Story "${title}" not found.`);
            return;
        }
        const currTimelineLastNodeId = story.timelines[timeline]; // Get the head event Id of the timeline
        const currTimelineLastNode = await Event.findOne({ _id: currTimelineLastNodeId });
        const content = [];
        content.push(currTimelineLastNode.text);
        var temp = currTimelineLastNode.parent;
        // console.log(story.head.toString());
        while (temp.toString() != story.head.toString()) {
            const tempNode = await Event.findOne({ _id: temp });
            // console.log(temp.toString());
            content.push(tempNode.text);
            temp = tempNode.parent;
        }
        content.reverse();
        await interaction.reply(`**${story.title}**\n\n${content.join('\n')}`);

    }
};