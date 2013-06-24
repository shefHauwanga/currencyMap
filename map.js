google.load('visualization', '1', {'packages': ['geochart']});
google.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
    var currency_conversion_list = [];
    var country_data = [];
    var drawing_array = []
    var data;

    var options = {
        enableRegionInteractivity: true,
        colorAxis: {colors: ['pink', 'grey']}
    };
    
    country_currency("US");

    function country_currency(country_abbrev) {
        country_data = [];
        $.ajax({
            "url": "server/countries.json",
            "dataType": "json", 
            "type": "GET",
            "success": function (response) {
                $.each (response, function(index, obj) {
                    country_data.push(obj);
                    if (obj.cca2 === country_abbrev) {
                        currency_look_up(obj.currency.split(",")[0]);
                    }
                });
            },
            "error": function(xhr, ajaxOptions, thrownError) {
                $("#about").html("<div id=\"init_problem\">There is a problem with initalization.<br /><br />" + xhr.status + "</div>");
            }
        });
    }

    function currency_look_up (country_abbrev) {
        currency_conversion_list = [];
        $.ajax({
            "url": "helper.php?base=" + country_abbrev,
            "dataType": "json", 
            "type": "GET",
            "cache": false,
            "success": function (response) {
                $.each(response, function (index, obj) {
                    currency_conversion_list.push(obj);
                });
                create_draw_array(country_abbrev);
            },
            "error": function(xhr, ajaxOptions, thrownError) {
                $("#about").html("<div id=\"init_problem\">There is a problem with initalization.<br /><br />" + xhr.status + "</div>");
            }
        });
    }

    function create_draw_array (base_currency) {
        drawing_array = [];
        for (var i = 0; i < country_data.length; i++) {
            for (var j = 0; j < currency_conversion_list.length; j++) {
                if (country_data[i].currency.split(",")[0] === currency_conversion_list[j].to) {
                    drawing_array.push([country_data[i].name, currency_conversion_list[j].rate, 1 + ' ' + base_currency + ' is worth ' + currency_conversion_list[j].rate + ' ' + country_data[i].currency.split(",")[0]]);
                } else if (country_data[i].currency.split(",")[0] === currency_conversion_list[j].from) {
                    drawing_array.push([country_data[i].name, currency_conversion_list[j].rate, 1 + ' ' + base_currency + '(basis for comparison) is worth ' + 1 + ' ' + base_currency]); 
                }
            }
        }
        draw_map(base_currency);
    }

    function draw_map(base_currency) {
        data = new google.visualization.DataTable();
        data.addColumn('string', 'Country');
        data.addColumn('number', 'Currency to ' + base_currency);
        data.addColumn({type: 'string', role:'tooltip'});
        data.addRows(drawing_array);
        chart = new google.visualization.GeoChart($("#chart_div")[0]);
        google.visualization.events.addListener(chart, 'regionClick', function(eventData) {
            country_currency(eventData.region);
        });
        chart.draw(data, options);
    }
}
