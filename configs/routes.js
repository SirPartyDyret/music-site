const spotifyReq = require("./spotifyEndpoints")

module.exports = [{
        method: 'GET',
        path: '/',
        config: {
            auth: {
                mode: 'try',
                strategy: 'session',
            }
        },
        handler: function (request, reply) {
            const context = {
                session: request.auth.credentials,
            };

            reply.view('page', {
                context: context
            });
        }
    },

    {
        method: ['GET', 'POST'],
        path: '/dashboard',
        config: {
            auth: {
                strategy: 'session',
                mode: 'required'
            },
        },
        handler: function (request, reply) {
            const context = {
                session: request.auth.credentials,
            };

            console.log(request.auth.credentials.username);

            reply.view('dashboard', {
                title: 'Dashboard',
                context: context
            });
        }
    },

    {
        method: ['GET', 'POST'], // Must handle both GET and POST
        path: '/login/{param*}', // The callback endpoint registered with the provider
        config: {
            auth: {
                mode: 'try',
                strategy: 'spotify',
            },
            handler: function (request, reply) {

                if (!request.auth.isAuthenticated) {
                    return reply.redirect('/');
                }

                console.log(request.auth.credentials);

                const username = request.auth.credentials.profile.username
                request.cookieAuth.set({
                    username
                });

                return reply.redirect('/dashboard');
            }
        }
    },

    {
        method: 'GET',
        path: '/logout',
        config: {
            auth: {
                mode: 'try',
                strategy: 'session',
            }
        },
        handler: function (request, reply) {
            // Clear the cookie
            request.cookieAuth.clear();
            return reply.redirect('/');
        }
    },

    {
        method: "GET",
        path: "/semantic/{param*}",
        config: {
            handler: {
                directory: {
                    path: "./../semantic",
                    listing: true,
                    index: true
                },
            },
        },
    },

    {
        method: 'GET',
        path: '/api/playlist',
        config: {
            auth: {
                strategy: 'session',
                mode: 'required'
            }
        },

        handler: function (request, reply) {
            spotifyReq.SpotifyRequest('/v1/me/playlists', 'BQCagsrQGgPuvS17TgYQYCXbp4_TH-BN644028pHrBMHwVTzsReR8LDgtWWl00IoFvOZ2RpyUgK3s1J8sLxP-xIDJhRiV4p5SBcRNBC1gYBB7FxgxCF1el7mFKAkkmtZ6g57Dw_hZA4mNodQ2OtiU0_kbTM');

            // Call .once to avoid reply interface called twice error
            spotifyReq.body.once('update', function () {
                var items = spotifyReq.body.data.items;
                var uris = items.map((item) => { return item.uri });
                console.log(uris);

                return reply(uris);
            });
        }

    },

    {
        method: "GET",
        path: "/js/jq/{param*}",
        config: {
            handler: {
                directory: {
                    path: "./../node_modules/jquery/dist",
                    listing: false,
                    index: false,
                },
            },
        },
    },
]