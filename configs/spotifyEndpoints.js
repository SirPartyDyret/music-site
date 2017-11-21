var unirest = require('unirest');
var EventEmitter = require("events").EventEmitter;
var body = new EventEmitter();

const SpotifyRequest = (uri, token) => {
    unirest.get('https://api.spotify.com' + uri)
        .headers({
            'Authorization': 'Bearer ' + token
        })
        .end(function (response) {
            body.data = response.body;
            body.emit('update');
        });
};

module.exports = {
    SpotifyRequest,
    body
};
/*
SpotifyRequest(
'/v1/me/playlists',
'BQAUTNPMMPf3HUlj942v9x39SIJ0P5PXtdW8qPKOVQLwkDuyZQyXb7A5ohMNoZA1GzfXPZ7GUlLh6ZeA76akhbpzw0oJ6CAHqy1jghv8HB0YVffiodyTpCYYReBRdI2cUfzTO6xWm7TxbU7xNwWSDAsPTOO4Bjqo8t47A2iXE_NAtQ');

// Call .once to avoid reply interface called twice error
    //var uris = items.map((item) => {
body.once('update', function () {
    const items = body.data.items;
    //    return item
    //});

    console.log(items);
});*/