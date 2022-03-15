var chart_project = new Highcharts.chart('proj', {
  chart: {
    type: 'column',
    height: height_ratio + '%'
  },
  title: {
      text: title
  },
  xAxis: {
      title: {
          text: label_x
      },
      categories: x_categories
  },
  yAxis: [{
      min: 0,
      title: {
          text: label_y
      },
      stackLabels: {
          enabled: false,
      }
    },
    { // Secondary yAxis
        title: {
            text: label_y_secondary,
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
  series: data
});
