const { SlashCommandBuilder } = require('discord.js');
const { Story } = require('../../db/models');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('viewstory')
        .setDescription('View an existing collaborative story.')
        .addStringOption(option =>
            option.setName('title')
            .setDescription('The title of the story to view.')
            .setRequired(true)
        ),
    async execute(interaction) {

        const title = interaction.options.getString('title');
        const options = { title: { $regex: new RegExp(title, 'i') } }; // Case-insensitive regular expression
        const story = await Story.findOne(options);
        if (story) {
            const fullStory = story?.text.join('\n');
            await interaction.reply(`**${story.title}** (Genre: ${story.genre || 'None'}):\n${fullStory}`);
        } else {
            await interaction.reply(`Story "${title}" not found.`);
        }
    },
};