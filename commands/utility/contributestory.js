const { SlashCommandBuilder } = require('discord.js');
const { Story } = require('../../db/models');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('contributestory')
        .setDescription('Contribute to an existing collaborative story.')
        .addStringOption(option =>
            option.setName('title')
            .setDescription('The title of the story to contribute to.')
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('text')
            .setDescription('The text to contribute to the story.')
            .setRequired(true)
        ),
    async execute(interaction) {

        const title = interaction.options.getString('title');
        const text = interaction.options.getString('text');
        const options = { title: { $regex: new RegExp(title, 'i') } }; // Case-insensitive regular expression
        const story = await Story.findOne(options);
        if (story) {
            story.text.push(text);
            await story.save();
            await interaction.reply(`Your contribution has been added to "${title}"!`);
        } else {
            await interaction.reply(`Story "${title}" not found.`);
        }
    },
};