const db = require("./dbconfig");

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

                db.put(request.auth.credentials.profile.username, request.auth.credentials.token, function (err) {
                    if (err) return console.log('Ooops!', err) // some kind of I/O error
                })

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
            // Clear token from db
            db.del(request.auth.credentials.username, function (err, value) {
                if (err) return console.log('Ooops!', err); // likely the key was not found
            })
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
                    listing: false,
                    index: false
                },
            },
        },
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