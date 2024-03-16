const { SlashCommandBuilder } = require('@discordjs/builders');
const { Story } = require('../../db/models/index');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('liststories')
        .setDescription('List all the stories.'),
    async execute(interaction) {
        const stories = await Story.find();
        if (stories.length > 0) {
            const storyList = stories.map(story => `**${story.title}** (Genre: ${story.genre?.join(', ') || 'None'})`);
            await interaction.reply(`List of stories (${stories.length}):\n${storyList.join('\n')}`);
        } else {
            await interaction.reply('No stories found.');
        }
    },
};