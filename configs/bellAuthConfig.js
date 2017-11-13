const configs = require("./configs")

module.exports = {
    provider: 'spotify',
    password: configs.auth.bellAuth.authCookiePass,
    isSecure: configs.isSecure,
    clientSecret: configs.auth.bellAuth.clientSecret,
    clientId: configs.auth.bellAuth.clientId,
    scope: configs.auth.bellAuth.scope

}