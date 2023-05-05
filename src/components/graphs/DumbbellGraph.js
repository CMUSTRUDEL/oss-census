import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsDumbbell from "highcharts/modules/dumbbell";
import HC_more from "highcharts/highcharts-more";

import { data_dumbbell } from '../../js/data';

HC_more(Highcharts);
highchartsDumbbell(Highcharts);

export default function DumbbellGraph({
    category,
}) {
    const data = data_dumbbell[category];
    const options = {
        chart: {
            type: 'dumbbell',
            inverted: true
        },
        legend: {
            enabled: false
        },
        title: {
            text: data.title
        },
        tooltip: {
            shared: true
        },
    
        xAxis: {
            type: 'category',
        },
        yAxis: {
            title: {
                text: data.label_y
            }
        },
        series: [{
            name: '% Female Contributors',
            data: data.data
        }]
    };
    return (
        <div className={`highcharts-graph dumbbell-graph ${category}-dumbbell-graph`}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
}
