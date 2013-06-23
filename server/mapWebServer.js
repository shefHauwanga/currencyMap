var webServer = require("http");
var url = require('url');
var redis = require("redis");
var country_data = require("./countries");

var client = redis.createClient();
var listenPort = 8888;
var countries = []

webServer.createServer(function (request, response) {
    var country_obj = []
    var request_data = url.parse(request.url, true);
    var query = request_data.query;
    var country_abrev = country_to_abbrev(query.base);
    client.keys(country_abrev + "*", function (error, replies) {
        replies.foreach (function (keyVal) {
            client.get(keyVal.toString(), function (err, reply) {
                 coutries.push(JSON.parse(reply)); 
            });
        });
    });
    country_obj = countries;
    counties = [];
    var headers = {
        'Content-Type': 'text/plain',
        'Content-Length': JSON.stringify(country_obj).length
    };
    response.writeHead(200, headers);
    response.write(JSON.stringify(country_obj));
    response.end();
}).listen(listenPort);

function country_to_abbrev (country_name, currency_list) {
    for (var i = 0; i < currency_list.length; i++) {
        if (currency_list[i].name === country_name) {
            return currency_list[i].currency.split(",")[0];
        }
    }
}
