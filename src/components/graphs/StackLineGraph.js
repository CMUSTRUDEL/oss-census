import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { data as all_data } from '../../js/data';

export default function StackLineGraph({
    category,
    ecosystem,
}) {
    const data = all_data[category][ecosystem];
    const options = {
        chart: {
            type: 'column',
            height: data.height_ratio + '%'
        },
        title: {
            text: data.title
        },
        xAxis: {
            title: {
                text: data.label_x
            },
            categories: data.x_categories
        },
        yAxis: [{
            min: 0,
            title: {
                text: data.label_y
            },
            stackLabels: {
                enabled: false,
            }
            },
            { // Secondary yAxis
                title: {
                    text: data.label_y_secondary,
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
        series: data.data
    };
    return (
        <div className={`highcharts-graph stack-line-graph ${category}-${ecosystem}-stack-line-graph`}>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
}
