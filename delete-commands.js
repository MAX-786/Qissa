const { REST, Routes } = require('discord.js');
require('dotenv').config();

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

// ...

// for guild-based commands
// rest.delete(Routes.applicationGuildCommand(clientId, guildId, 'commandId'))
// 	.then(() => console.log('Successfully deleted guild command'))
// 	.catch(console.error);

// for global commands
// rest.delete(Routes.applicationCommand(process.env.CLIENT_ID, '1215027706534559824'))
//     .then(() => console.log('Successfully deleted application command'))
//     .catch(console.error);

rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [] })
    .then(() => console.log('Successfully deleted all application commands.'))
    .catch(console.error);