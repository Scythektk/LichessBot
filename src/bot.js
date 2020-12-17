require('dotenv').config();
const axios = require('axios');
const { Client } = require('discord.js');
const client = new Client();

// * Lichess
function runLichess(limit, clock_increment) {
    axios
        .post('https://lichess.org/api/challenge/open', {
            clock: {
                limit: limit * 60,
                increment: clock_increment,
            },
        })
        .then((res) => {
            console.log(`statusCode: ${res.statusCode}`);
            console.log(res.data.urlWhite);
            console.log(res.data.urlBlack);
        })
        .catch((error) => {
            console.error(error);
        });
}

// *

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
    if (cmd_name === 'game') {
        const initial_time = Number(args[0]) || 5;
        const increment = Number(args[1]) || 0;
        runLichess(initial_time, increment);
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);