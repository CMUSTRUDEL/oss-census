function graphContributor(graph_id) {
    new Highcharts.chart('cont-' + graph_id, {
    chart: {
        type: 'column',
        height: obj.height_ratio + '%'
    },
    title: {
        text: obj.title
    },
    xAxis: {
        title: {
            text: obj.label_x
        },
        categories: obj.x_categories
    },
    yAxis: [{
        min: 0,
        title: {
            text: obj.label_y
        },
        stackLabels: {
            enabled: false,
        }
        },
        { // Secondary yAxis
            title: {
                text: obj.label_y_secondary,
            },
            labels: {
                format: '{value}',
            },
            opposite: true
        }],
    legend: {
        align: 'right',
        x: -150,
        verticalAlign: 'top',
        y: 30,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            groupPadding: 0,
            pointPadding: 0,
            dataLabels: {
                enabled: false
            },
        }
    },
    series: obj.data
    });

}