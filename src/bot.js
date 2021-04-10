require('dotenv').config();
const axios = require('axios');
const { Client } = require('discord.js');
const client = new Client();

const lichess = require('./lichess');

// !
const PREFIX = '!';
// !

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log('Ready to Rumble!!');
});

client.on('message', (message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const [cmd_name, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);

    // Help
    if (cmd_name === 'help') {
        message.channel.send('```Try !game```');
    }

    // Lichess
    if (cmd_name === 'game') {
        const initial_time = Number(args[0]) || 5;
        const increment = Number(args[1]) || 0;
        lichess.startGame(initial_time, increment);
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
