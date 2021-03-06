require('dotenv').config();
const axios = require('axios');
const { Client } = require('discord.js');
const client = new Client();

// ! Chess.com
var ChessWebAPI = require('chess-web-api');
var chessAPI = new ChessWebAPI();

// !
const PREFIX = '!';
// !

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log('Ready to Rumble!!');
});

client.on('message', (message) => {
    // ! Lichess
    function startGame(limit, clock_increment) {
        axios
            .post('https://lichess.org/api/challenge/open', {
                clock: {
                    limit: limit * 60,
                    increment: clock_increment,
                },
            })
            .then((res) => {
                message.channel.send(
                    `White: ${res.data.urlWhite}\nBlack: ${res.data.urlBlack}`
                );
                console.log(res.data.urlWhite);
                console.log(res.data.urlBlack);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function crossTable(user1, user2) {
        axios
            .get(`https://lichess.org/api/crosstable/${user1}/${user2}`)
            .then((res) => {
                var users = Object.keys(res.data.users);
                var cross = Object.values(res.data.users);
                message.channel.send(
                    `${users[0]}: ${cross[0]}\n${users[1]}: ${cross[1]}`
                );
            })
            .catch((error) => {
                console.error(error);
            });
    }
    // !

    // ! Chess.com
    function chesscomratings(user1) {
        chessAPI.getPlayerStats(user1).then(
            (res) => {
                req_res = res.body;
                message.channel.send(
                    `Chess.com ratings for ${user1}:\nBullet: ${req_res.chess_bullet.last.rating}\nBlitz: ${req_res.chess_blitz.last.rating}\nRapid: ${req_res.chess_rapid.last.rating}\n`
                );
            },
            function (err) {
                console.error(err);
            }
        );
    }

    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const [cmd_name, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);

    // ! Help
    if (cmd_name === 'help') {
        message.channel.send(
            '```Try:\n!game [time(min)] [inc(sec)]\n!crosstable [user1] [user2]\n!rating [chesscom userid]```'
        );
    }
    // !

    // ! Lichess
    if (cmd_name === 'game') {
        const initial_time = Number(args[0]) || 5;
        const increment = Number(args[1]) || 0;
        startGame(initial_time, increment);
    }

    if (cmd_name === 'crosstable') {
        const user1 = String(args[0]);
        const user2 = String(args[1]);
        crossTable(user1, user2);
    }
    // !

    // ! Chess.com
    if (cmd_name === 'rating') {
        const user1 = String(args[0]) || 'ktkpositronic';
        chesscomratings(user1);
    }
    // !
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
