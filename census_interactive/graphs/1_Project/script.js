var chart_project = new Highcharts.chart('all_proj', {
  chart: {
    type: 'column',
    height: height_ratio + '%'
  },
  title: {
      text: title,
      style: {
        fontSize: 14
      }
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
        layout: 'vertical',
        align: 'left',
        y: 30,
        x: 70,
        verticalAlign: 'top',
        floating: true,
        backgroundColor: '#FFFFFF'
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
