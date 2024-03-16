const { SlashCommandBuilder } = require('discord.js');
const { Story, Event } = require('../../db/models/index');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('listtimelines')
        .setDescription('List all the timelines of the story.')
        .addStringOption(option =>
            option.setName('title')
            .setDescription('The title of the story to list its timelines.')
            .setRequired(true)
        ),
    async execute(interaction) {

        const title = interaction.options.getString('title');
        const options = { title: { $regex: new RegExp(title, 'i') } }; // Case-insensitive regular expression
        const story = await Story.findOne(options);
        if (story) {
            const timelines = await Promise.all(story.timelines.map(async (timeline, index) => {
                const t = await Event.findOne({ _id: timeline });
                return `Timeline ${index}: ${t.text.length >= 20 ? "...":""} ${t.text.slice(-20)}`;
            }));
            await interaction.reply(`Story: **${story.title}** has the following timelines (${story.timelines.length}):\nTimelines and their respective endings\n${timelines.join('\n')}`);
        } else {
            await interaction.reply(`Story "${title}" not found.`);
        }
        
    },
};