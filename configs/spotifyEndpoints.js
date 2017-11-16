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

module.exports = {SpotifyRequest, body};
/*
SpotifyRequest('/v1/me/playlists', 'BQDXe3ooW2_jHfpF8bJozxXF8h7zGiOVYRSb7ZXzf3QadUUNZsgvqT8pDdMzM3EjNcaomCAjT5f4mbVfyAPGS3JG5vGIPgSmy10QGeLwVskj9SZoE-ouQmRFhTObZG1eBWlQq7MulUxFP1TyE44aPYjdZ4c');

 body.on('update', function() {
     console.log(body.data.items[0].uri);
 });*/