const Path = require('path');
const Hapi = require('hapi');
const configs = require('./configs/_exported-configs');

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
});
server.connection({ port: 3000, host: configs._config.host });

server.register(configs._plugins, () => {});

server.auth.strategy('session', 'cookie', configs._cookieAuth);
server.log('info', 'Registered auth strategy: cookie auth');
server.auth.strategy('spotify', 'bell', configs._bellAuth),
server.log('info', 'Registered auth strategy: spotify auth');

server.views(configs._views);

server.route(configs._routes);
server.route(configs._endpointRoutes);

server.start((err) => {

    if (err) {
        throw err;
    }

    console.log('Server running at:', server.info.uri);
});