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
SpotifyRequest('/v1/me/albums', 'BQAK9lrY9Xbd8MqWUp6uRnTLYjNIKW6zxN7FI5yllIHQyd9N_TvomjJicmJgK6dgkG4IpuNJNPG8iZabP9TtKJjbX1k3PfKmS63QRaDTsEfwZnZPI8xZEdu6xTamHfHhCgwytvMvcXtPOzxvqaHlIMDALFJCC-jB8js8KmAy');

// Call .once to avoid reply interface called twice error
body.once('update', function () {
    var items = body.data.items;
    var uris = items.map((item) => {
        return item.album.uri
    });

    console.log(uris);
});*/