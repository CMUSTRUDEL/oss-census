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
        tickWidth: 1,
        title: {
            text: obj.label_x
        },
        labels: {
            rotation: 0,
            x: 10,
            overflow: 'allow',
            style: {
                fontSize: '18px',
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
            tickPositioner: function () {
                var positions = [],
                    tick = 0,
                    increment = Math.ceil((this.dataMax - 0) / 3);

                if (this.dataMax !== null && this.dataMin !== null) {
                    for (tick; tick - increment <= this.dataMax; tick += increment) {
                        positions.push(tick);
                    }
                }
                return positions;
            },
            title: {
                text: obj.label_y_secondary,
            },
            labels: {
                overflow: 'allow',
                y: 4,
                style: {
                    fontSize: '18px',
                },
                format: graph_id.includes('line') ? '{value}%' : '{value}',
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