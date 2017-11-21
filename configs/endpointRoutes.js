const spotifyReq = require("./spotifyEndpoints");
const token = 'BQAr7lO9sTCDu9ab4RBV4EMC7_h_lse3cpgyzxiPEX5jiOG3XRCLQ65n3WMjRO-UkOWDz0VKkGx8SOwtu2dLvLCif06ogpR7VBcCzxZDUSXlQSUJ2P33TET0Td3KfKj98okaSyTn1gRJ-3UUw7YpelRnVdwv-pJ8YcVxGR8a-FN8UQ';

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