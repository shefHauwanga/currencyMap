var restRequest = require('restler');
var redis = require("redis");
var client = redis.createClient();
var country_data = require("./countries");

function parse_list(currency_list) {
    for(var i = 0; i < currency_list.length; i += 1) {
        if (currency_list[i].currency !== '') {
            var first_abbrev = currency_list[i].currency.split(",")[0];
            for(var j = 0; j < currency_list.length; j += 1) {
                if (currency_list[j].currency !== '') {
                    var second_abbrev = currency_list[j].currency.split(",")[0];
                    var currency_URI = 'http://rate-exchange.appspot.com/currency?from=' + first_abbrev + '&to=' + second_abbrev;
                    restRequest.get(currency_URI).on('complete', function (data) {
                        if (data.err === undefined && data.to !== undefined && data.from !== undefined) {
                            currency_object = {
                                //"key": data.from + data.to,
                                "rate": data.rate,
                                "base": find_country(data.from, currency_list),
                                "to": find_country(data.to, currency_list),
                            };
                            client.set(data.from + data.to, JSON.stringify(currency_object));
                            //console.log(JSON.stringify(currency_object));
                        }
                    });
                }
            }
        }
    }
}

function find_country(currency_abrev, currency_array) {
    for (var i = 0; i < currency_array.length; i += 1) {
        if (currency_array[i].currency.split(",")[0] === currency_abrev) {
            return currency_array[i].name;
        }
    }
}

parse_list(country_data.currency_list);
