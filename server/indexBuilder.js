var restRequest = require('restler');
var redis = require("redis");
var country_data = require("./countries");
var country_to_currency = require("./currency_list");
var client = redis.createClient();
var hour = 1000 * 60 * 60;
var check_list = {};

function parse_list(currency_list, cache_list) {
    for(var i = 0; i < currency_list.length; i += 1) {
        if (currency_list[i].currency !== '') {
            var first_abbrev = currency_list[i].currency.split(",")[0];
            for(var j = 0; j < currency_list.length; j += 1) {
                if (currency_list[j].currency !== '') {
                    var second_abbrev = currency_list[j].currency.split(",")[0];
                    if (!(first_abbrev + second_abbrev in cache_list) || (Date.now() - cache_list[first_abbrev + second_abbrev]) < hour) {
                        var currency_URI = 'http://rate-exchange.appspot.com/currency?from=' + first_abbrev + '&to=' + second_abbrev;
                        restRequest.get(currency_URI).on('complete', function (data) {
                            if (data.err === undefined && data.to !== undefined && data.from !== undefined) {
                                cache_list[first_abbrev + second_abbrev] = Date.now();
                                currency_object = {
                                    "rate": data.rate,
                                    "from": data.from,
                                    "to": data.to,
                                };
                                client.set(data.from + data.to, JSON.stringify(currency_object));
                            }
                        });
                    }
                }
            }
        }
    }
}

setInterval(parse_list(country_data.currency_list, check_list), hour/2);
