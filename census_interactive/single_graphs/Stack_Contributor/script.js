function graphStack() {
    new Highcharts.chart('stack-cont', {
    chart: {
        type: 'area',    
    },
    title: {
        text: obj.title
    },
    xAxis: {
        categories: obj.x_categories,
        tickmarkPlacement: 'on',
        title: {
            enabled: false
        }
    },
    yAxis: {
        title: {
            text: obj.label_y
        }
    },
    tooltip: {
        split: true,
        valueSuffix: ' %'
    },
    plotOptions: {
        area: {
            stacking: 'normal',
            lineColor: '#666666',
            lineWidth: 1,
            marker: {
                lineWidth: 1,
                lineColor: '#666666'
            }
        }
    },
    series: obj.data
    });
}