import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { data_pie } from '../js/data';

export default function PolarGraph({
    category,
    year,
}) {
    const data = data_pie[category][year];
    const options = {
        chart: {
            type: 'pie'
        },
        title: {
            text: data.title
        },
        subtitle: {
            text: data.subtitle
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
            data: data.data 
        }] 
    };
    return (
        <div className={`highcharts-graph polar-graph ${category}-${year}-polar-graph`}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
}