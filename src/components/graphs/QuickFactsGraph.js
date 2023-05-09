import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


export default function QuickFactsGraph({
    data2008, data2021,
}) {
    const data1 = parseInt(data2008);
    const data2 = parseInt(data2021);
    const options = {
        chart: {
            type: 'column',
        },
        title: {
            text: undefined,
        },
        xAxis: {
            min: 0,
            categories: [
                data2008 + '%', data2021 + '%'
            ]
        },
        yAxis: {
            min: 0,
            title: undefined,
            visible: false
        },
        legend: {
            enabled: false
        },

        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            },
            series: {
                borderRadius: {
                    radius: 30
                }
            }
        },
        series: [{
           data:[
            {y: data1, color: '#E9E9E9'}, 
            {y: data2, color: '#2B2B2B'}]
        }]
    };
    return (
        <div className={`highcharts-graph quick-facts-graph`}>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
}