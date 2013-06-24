var webServer = require("http");
var url = require('url');
var redis = require("redis");
var country_data = require("./countries");

var client = redis.createClient();
var listenPort = 8888;
var conversions = []

webServer.createServer(function (request, response) {
    var conversion_obj = []
    var request_data = url.parse(request.url, true);
    var country_abbrev = request_data.query.base;
    client.keys(country_abbrev + "*", function (error, replies) {
        replies.forEach (function (keyVal) {
            client.get(keyVal.toString(), function (err, reply) {
                 conversions.push(JSON.parse(reply)); 
            });
        });
    });
    conversion_obj = conversions;
    conversions = [];
    var headers = {
        'Content-Type': 'text/plain',
        'Content-Length': JSON.stringify(conversion_obj).length
    };
    response.writeHead(200, headers);
    response.write(JSON.stringify(conversion_obj));
    response.end();
}).listen(listenPort);
