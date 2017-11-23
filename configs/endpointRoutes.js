const spotifyReq = require("./spotifyEndpoints");
const db = require("./dbconfig");
const routes = require("./routes");
let token = '';


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
        db.get(request.auth.credentials.username, function (err, value) {
            if (err) return console.log('Ooops!', err); // likely the key was not found
        
            // Ta da!
            token = value;
        })

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
        db.get(request.auth.credentials.username, function (err, value) {
            if (err) return console.log('Ooops!', err); // likely the key was not found
        
            // Ta da!
            token = value;
        })

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