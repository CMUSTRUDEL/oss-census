var obj = data["Contributor"]["All"]
var one_contributor = new Highcharts.chart('all_cont', {
  chart: {
      type: 'column',
      height: obj["height_ratio"] + '%'
  
  },
  title: {
      text: 'A. ' + obj["title"],
      style: {
        fontSize: 14
      }
  },
  xAxis: {
      title: {
          text: obj["label_x"]
      },
      categories: obj["x_categories"]
  },
  yAxis: {
      title: {
          text: obj["label_y"]
      }
  },
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
  series: obj["data"]
});