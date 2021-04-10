const axios = require('axios');

export function startGame(limit, clock_increment) {
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

export function crossTable(user1, user2) {
    axios
        .get(`https://lichess.org/api/crosstable/${user1}/${user2}`)
        .then((res) => {
            message.channel.send(res.data.users);
        })
        .catch((error) => {
            console.error(error);
        });
}
