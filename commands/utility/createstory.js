const { SlashCommandBuilder } = require('discord.js');
const { Story } = require('../../db/models');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createstory')
        .setDescription('Starts a collaborative story with title and genre options.')
        .addStringOption(option =>
            option.setName('title')
            .setDescription('The title of the story')
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('genre')
            .setDescription('The genre of the story (optional)')
        ),
    async execute(interaction) {

        const title = interaction.options.getString('title');
        const genre = interaction.options.getString('genre');

        const newStory = new Story({ title, genre, text: [] });
        await newStory.save();

        await interaction.reply(`Creating a new story with the title "${title}" and the genre "${genre}"`);

    },
};