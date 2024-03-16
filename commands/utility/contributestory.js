const { SlashCommandBuilder } = require('discord.js');
const { Story } = require('../../db/models/index');
const { addEvent } = require('../../db/helpers/addEvent');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('contributestory')
        .setDescription('Contribute to an existing collaborative story.')
        .addSubcommand(subcommand =>
            subcommand
            .setName('newtimeline')
            .setDescription('Create a new timeline for the story.')
            .addStringOption(option =>
                option.setName('title')
                .setDescription('The title of the story to contribute to.')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('text')
                .setDescription('The text to contribute to the story.')
                .setRequired(true)
            )
            .addIntegerOption(option =>
                option.setName('divergingtimeline')
                .setDescription('The timeline to diverge from: 0 for the main timeline, 1 for the first alternate timeline, etc.')
                .setRequired(true)
            ))
        .addSubcommand(subcommand =>
            subcommand
            .setName('existingtimeline')
            .setDescription('Contribute to an existing timeline for the story.')
            .addStringOption(option =>
                option.setName('title')
                .setDescription('The title of the story to contribute to.')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('text')
                .setDescription('The text to contribute to the story.')
                .setRequired(true)
            )
            .addIntegerOption(option =>
                option.setName('timeline')
                .setDescription('The timeline to contribute to the story.')
                .setRequired(true)
            )),
    async execute(interaction) {

        const timeline = interaction.options.getSubcommand() === 'newtimeline' ? interaction.options.getInteger('divergingtimeline') : interaction.options.getInteger('timeline');
        const title = interaction.options.getString('title');
        const text = interaction.options.getString('text');
        const story = await Story.findOne({ title: title.toLowerCase() });
        const newTimeline = interaction.options.getSubcommand() === 'newtimeline';

        if (story) {
            // story.text.push(text);
            // await story.save();
            await addEvent(story, text, interaction.user.id, timeline,newTimeline);
            await interaction.reply(`Your contribution has been added to "${title}"!`);
        } else {
            await interaction.reply(`Story "${title}" not found.`);
        }
    },
};