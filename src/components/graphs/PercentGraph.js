import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { data_percent } from '../../js/data';

export default function PercentageGraph({
    category,
}) {
    const data = data_percent[category];
    const options = {
        chart: {
            type: 'area',
            height: data["height_ratio"] + '%'
        },
        title: {
            text: data["title"],
        },
        subtitle: {
            text: data["subtitle"],
        },
        accessibility: {
            point: {
                valueDescriptionFormat: '{index}. {point.category}, {point.y:,.0f} people, {point.percentage:.1f}%.'
            }
        },
        xAxis: {
            categories: data["x_categories"],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            labels: {
                format: '{value}%'
            },
            title: {
                enabled: false
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f} people)<br/>',
            split: true
        },
        plotOptions: {
            area: {
                stacking: 'percent',
                lineColor: '#ffffff',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#ffffff'
                }
            },
            series: {
                marker: {
                    enabled: false
                }
            }
        },
        series: data["data"]
    };
    return (
        <div className={`highcharts-graph percent-graph ${category}-percent-graph`}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
}