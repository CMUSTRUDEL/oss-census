function graphDumbbell() {
    new Highcharts.chart('dumbbell', {
        chart: {
            type: 'dumbbell',
            inverted: true
        },
        legend: {
            enabled: false
        },
        title: {
            text: obj.title
        },
        tooltip: {
            shared: true
        },

        xAxis: {
            type: 'category',
        },

        yAxis: {
            title: {
                text: obj.label_y
            }
        },

        series: [{
            name: '% Female Contributors',
            data: obj.data
        }]
    });
}