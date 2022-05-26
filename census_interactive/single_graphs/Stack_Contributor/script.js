function graphStack() {
    new Highcharts.chart('stack-cont', {
        chart: {
            type: 'area',   
            height: obj.height_ratio + '%' 
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
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
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