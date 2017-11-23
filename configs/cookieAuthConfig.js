const config = require("./configs");

module.exports = {
    password: config.auth.cookieAuth.authCookiePass,
    isSecure: config.isSecure,
    cookie: config.auth.cookieAuth.cookieName,
    isSameSite: config.auth.cookieAuth.isSameSite,
    redirectTo: config.auth.loginUrl,
    redirectOnTry: false,
    appendNext: 'redirect',
    ttl: 3600000
}



