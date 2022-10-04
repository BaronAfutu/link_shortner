const mongoose = require('../db');


var urlSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    created_at:{type: Date, default:Date.now()},
    updated_at:{type: Date, default:Date.now()}
});

var Url = mongoose.model("Url",urlSchema);

module.exports = Url;