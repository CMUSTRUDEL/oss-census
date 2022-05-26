var obj = data["Project"]["All"]
var one_project = new Highcharts.chart('all_proj', {
  chart: {
    type: 'column',
    height: obj["height_ratio"] + '%'
  },
  title: {
      text:  'C. ' + obj["title"],
      style: {
        fontSize: 14
      }
  },
  xAxis: {
      title: {
          text: obj["label_x"]
      },
      categories:  obj["x_categories"]
  },
  yAxis: [{
      min: 0,
      title: {
          text:  obj["label_y"]
      },
      stackLabels: {
          enabled: false,
      }
    },
    { // Secondary yAxis
        title: {
            text:  obj["label_y_secondary"],
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
  series:  obj["data"]
});
