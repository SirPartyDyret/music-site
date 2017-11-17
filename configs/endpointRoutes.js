const spotifyReq = require("./spotifyEndpoints");
const token = 'BQCCdH_ULV7L5JG-ijtyuiIsXA-8woxc4nSU-o0XBiChW2PKj46bxhG9mVDXjl3bdV7Wh7foj54BxOFKYZJlZO1cNbs0myFTiirO5puMTJajzBEouD4gVxweVDtSC373VP6ddA0FTgDDqU7M2y8McmYIoexU_cMU6nET45HX'

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
            var items = spotifyReq.body.data.items;
            var uris = items.map((item) => { return item.uri });

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