function graphPie(year_opt) {
    new Highcharts.chart('pie-cont', {
        chart: {
            type: 'variablepie'
        },
        title: {
            text: obj.title
        },
        subtitle: {
            text: obj.subtitle
        },
        tooltip: {
            headerFormat: '',
            pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
                'Ecosystem Size (# Contributors): <b>{point.y}</b><br/>' +
                'Percent Women (%): <b>{point.z}</b><br/>'
        },
        series: [{  
            minPointSize: 10,
            innerSize: '20%',
            zMin: 0,
            name: 'Languages',
            data: obj.data 
        }] 
    });
}