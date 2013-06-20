google.load('visualization', '1', {'packages': ['geochart']});
google.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
    var data = new google.visualization.DataTable();
        data.addColumn('string', 'Country');
        data.addColumn('number', 'Currency to dollar');
        data.addColumn({type: 'string', role:'tooltip'});
        data.addRows([
        ['Germany', 1.32, "Euros to dollar: " + 1.32],
        ['Italy', 1.32, "Euros to dollar: " + 1.32],
        ['Greece', 1.32, "Euros to dollar: " + 1.32],
        ['Spain', 1.32, "Euros to dollar: " + 1.32],
        ['Portugal', 1.32, "Euros to dollar: " + 1.32],
        ['Ireland', 1.32, "Euros to dollar: " + 1.32],
        ['Portugal', 1.32, "Euros to dollar: " + 1.32],
        ['Finland', 1.32, "Euros to dollar: " + 1.32],
        ['France', 1.32, "Euros to dollar: " + 1.32],
        ['New Zealand', 0.77, "New Zealand dollar to U.S. dollar: " + 0.77],
        ['Indonesia', 0.00010, "Rupiah to dollar: " + 0.00010],
        ['Norway', 0.17, "Norwegian krone to dollar: " + 0.17],
        ['Denmark', 0.18, "Danish krone to dollar: " + 0.18],
        ['Switzerland', 1.07, "Swiss franc to dollar: " + 1.07],
        ['Singapore', 0.78, "Singapore dollar to U.S. dollar: " + 0.78],
        ['Sweden', 0.15, "Swedish krona to dollar: " + 0.15],
        ['Egypt', 0.14, "Egyptian pound to dollar: " + 0.14],
        ['Saudi Arabia', 0.27, "Riyal to dollar: " + 0.27],
        ['Botswana', 0.11, "Pula to dollar: " + 0.27],
        ['United States', 1, "U.S. dollar to U.S. dollar (Base for comparison): " + 1],
        ['Brazil', .44, "Real to dollar: " + 0.44],
        ['Canada', .97, "Canadian dollar to U.S. dollar: " + 0.97],
        ['RU', .03, "Ruble to dollar: " + 0.03],
        ['Mexico', .075, "Mexican peso to dollar: " + 0.075],
        ['Chile', .0019, "Chilean peso to dollar: " + 0.019],
        ['Argentina', .19, "Argentine peso to dollar: " + 0.19],
        ['Australia', 0.92, "Australian dollar to U.S. dollar: " + 0.92],
        ['Japan', 0.010, "Yen to dollar: " + 0.010],
        ['China', 0.16, "Yuan to dollar: " + 0.16],
        ['South Korea', 0.00087, "Won to dollar: " + 0.00087],
        ['United Kingdom', 1.55, "U.K. pound to dollar: " + 1.55],
        ['India', .017, "Rupee to dollar: " + 0.017],
        ['Namibia', .097, "Namibian dollar to U.S. dollar: " + 0.097],
        ['Vietnam', .000048, "Vietnamese dong to dollar: " + 0.000048],
        ['Nigeria', .0062, "Nigerian naira to dollar: " + 0.0062],
        ['South Africa', 0.098, 'Rand to dollar: ' + 0.098],
    ]);

    var options = {
        colorAxis: {colors: ['red', 'black']}
    };

    var chart = new google.visualization.GeoChart($("#chart_div")[0]);
    chart.draw(data, options);
};
