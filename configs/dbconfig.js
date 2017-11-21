const levelup = require("levelup");
const leveldown = require("leveldown");
const db = levelup(leveldown('./tokendb'))
module.exports = db
