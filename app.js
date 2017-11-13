const Path = require('path');
const Hapi = require('hapi');
const Plugins = require('./plugins');

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
});
server.connection({ port: 3000, host: "localhost" });

server.register(Plugins, () => {});

server.route(require("./routes"));

server.start((err) => {

    if (err) {
        throw err;
    }

    console.log('Server running at:', server.info.uri);
});