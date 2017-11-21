const spotifyReq = require("./spotifyEndpoints");
const db = require("./dbconfig");
let token = '';
//TODO: Fetch token from DB, store it in local variable.
db.get('token', function (err, value) {
    if (err) return console.log('Ooops!', err); // likely the key was not found

    // Ta da!
    console.log('token: ' + value);
    token = value;
})


module.exports = [{
    method: 'GET',
    path: '/api/playlist',
    config: {
        auth: {
            strategy: 'session',
            mode: 'required'
        }
    },

    handler: function (request, reply) {
        spotifyReq.SpotifyRequest('/v1/me/playlists', token);

        // Call .once to avoid reply interface called twice error
        spotifyReq.body.once('update', function () {
            let items = spotifyReq.body.data.items;
            let uris = items.map((item) => { return item.uri });

            return reply(uris);
        });
    },

},

{
    method: 'GET',
    path: '/api/album',
    config: {
        auth: {
            strategy: 'session',
            mode: 'required'
        }
    },

    handler: function (request, reply) {
        spotifyReq.SpotifyRequest('/v1/me/albums', token);

        // Call .once to avoid reply interface called twice error
        spotifyReq.body.once('update', function () {
            var items = spotifyReq.body.data.items;
            var uris = items.map((item) => { return item.album.uri });

            return reply(uris);
        });
    },


},

]