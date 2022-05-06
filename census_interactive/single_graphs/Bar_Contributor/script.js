function graphBar() {
    new Highcharts.chart('bar-cont', {
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
    yAxis: [
        {
            title: {
                text: obj.label_y
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
        }
    ],
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
    series: obj.data
    });
}