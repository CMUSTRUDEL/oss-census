function graphGallery(graph_id) {
    new Highcharts.chart('cont-' + graph_id, {
    chart: {
        type: 'column',
        height: obj.height_ratio + '%',
    },
    title: {
        text: obj.title
    },
    xAxis: {
        tickInterval: 12,
        title: {
            text: obj.label_x
        },
        labels: {
            rotation: 0,
            x: 10,
            overflow: 'allow',
            style: {
                fontSize: '20px',
            }
        },
        categories: obj.x_categories
    },
    yAxis: [
        {
            min: 0,
            title: {
                text: obj.label_y
            },
            stackLabels: {
                enabled: false,
            }
        },
        { // Secondary yAxis
            tickInterval: 2,
            title: {
                text: obj.label_y_secondary,
            },
            labels: {
                overflow: 'allow',
                y: 4,
                style: {
                    fontSize: '20px',
                },
                format: graph_id%2==1 ? '{value}%' : '{value}',
            },
            opposite: true,
        }],
    navigation: {
        buttonOptions: {
            verticalAlign: 'bottom',
        }
    },
    legend: {
        enabled: false
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